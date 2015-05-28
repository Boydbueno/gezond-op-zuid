var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var Board = React.createClass({
    conn: {},
    getInitialState: function() {
        return {
            players: []
        }
    },

    componentWillMount: function() {
        this.connect();
    },

    render: function() {
        return (
            <div>
                <h1>Board</h1>
                <RouteHandler/>
            </div>
        );
    },

    connect: function() {
        this.conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        this.conn.onopen = function(e) {
            console.log("Connection established!");
        };
        this.conn.onmessage = (e) => {
            var message = JSON.parse(e.data);
            console.log(message);
            switch(message.event) {
                case 'player:joined':
                    this.addPlayer({
                        id: message.connectionId,
                        name: message.data.name
                    });
                    break;
                case 'player:left':
                    this.removePlayer(message.connectionId);
                    break;
            }
        };
    },

    addPlayer: function(player) {
        this.state.players.push(player);
    },

    removePlayer: function(id) {
        this.state.players = this.state.players.filter(function(player) {
           return player.id !== id;
        });
    }
});

export default Board;