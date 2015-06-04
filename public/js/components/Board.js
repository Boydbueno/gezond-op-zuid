var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var Board = React.createClass({
    conn: {},
    mixins: [Navigation],
    getInitialState: function() {
        return {
            category: null,
            question: null,
            players: []
        }
    },

    componentWillMount: function() {
        this.connect();
    },

    render: function() {
        var name = this.context.router.getCurrentPath();
        return (
            <div>
                <RouteHandler key={name} onQuestionChange={this.startQuestion} onStartCategory={this.startCategory} connection={this.conn} />
            </div>
        );
    },

    connect: function() {
        this.conn = new WebSocket('ws://' + LaVie.websockets.domain + ':' + LaVie.websockets.port);

        this.conn.addEventListener('message', (e) => {
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

    addPlayer: function(player) {
        this.state.players.push(player);
    },

    removePlayer: function(id) {
        this.state.players = this.state.players.filter(function(player) {
            return player.id !== id;
        });
    },

    startCategory: function(category) {
        this.setState({category: category});
        this.transitionTo('boardFood');

        this.sendCurrentState();
    },

    startQuestion: function(question) {
        this.setState({question: question});
        this.sendCurrentState();
    },

    sendCurrentState: function(connectionId = null) {
        var message = {
            event: "state:changed",
            target: connectionId,
            data: {
                category: this.state.category,
                question: this.state.question,
                path: window.location.hash.replace('#/board', '')
            }
        };

        if (this.conn.readyState === this.conn.OPEN) {
            this.conn.send(JSON.stringify(message));
        } else {
            this.conn.addEventListener('open', () => {
                this.conn.send(JSON.stringify(message));
            });
        }

    }
});

export default Board;
