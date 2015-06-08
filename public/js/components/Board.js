var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

import Conn from './../components/Conn';
Conn.connect();

var Board = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {
            players: []
        }
    },

    componentWillMount: function() {
        Conn.onMessage((e) => {
            var message = JSON.parse(e.data);
            switch (message.event) {
                case 'player:joined':
                    this.addPlayer({
                        id: message.connectionId,
                        name: message.data.name
                    });
                    break;
                case 'player:left':
                    this.removePlayer(message.connectionId);
                    break;
                case 'state:request':
                    this.sendCurrentState(message.connectionId);
                    break;
            }
        });
    },

    render: function() {
        var name = this.context.router.getCurrentPath();
        return (
            <div>
                <RouteHandler key={name} />
            </div>
        );
    },

    addPlayer: function(player) {
        this.state.players.push(player);
    },

    removePlayer: function(id) {
        this.state.players = this.state.players.filter(function(player) {
            return player.id !== id;
        });
    },

    sendCurrentState: function(connectionId = null) {
        var message = {
            event: "state:changed",
            target: connectionId,
            data: {
                path: window.location.hash.replace('#/board', '')
            }
        };

        Conn.send(message);
    }
});

export default Board;
