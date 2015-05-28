<?php namespace App;

use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

/**
 * Class Connector
 * @package App
 */
class Messenger implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        // Store the new connection to send messages to later
        $this->clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        $numRecv = count($this->clients) - 1;
        echo sprintf('Connection %d sending message "%s" to %d other connection%s' . "\n"
            , $from->resourceId, $msg, $numRecv, $numRecv == 1 ? '' : 's');

        $message = json_decode($msg);
        $message->connectionId = $from->resourceId;
        $target = isset($message->target) ? $message->target : null;
        $message = json_encode($message);

        if ($target) {
            foreach ($this->clients as $client) {
               if ($client->resourceId === $target) {
                   $client->send($message);
                   return;
               }
            }
        }

        foreach ($this->clients as $client) {
            if ($from !== $client) {
                // The sender is not the receiver, send to each client connected
                $client->send($message);
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        // The connection is closed, remove it, as we can no longer send it messages
        $this->clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";

        foreach ($this->clients as $client) {
            $message = [
                "event" => "player:left",
                "connectionId" => $conn->resourceId
            ];
            $message = json_encode($message);
            $client->send($message);
        }
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }
}
