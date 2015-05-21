<?php namespace App\Console\Commands;

use App\Messenger;
use Illuminate\Console\Command;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Symfony\Component\Console\Input\InputOption;

class WebsocketServer extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'websocketserver:start';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Starts the push server';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new Messenger()
                )
            ),
            8080
        );

        $server->run();
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [];
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return [
			['example', null, InputOption::VALUE_OPTIONAL, 'An example option.', null],
		];
	}

}
