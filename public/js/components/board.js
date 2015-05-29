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
        return (
            <div>
                <h1>Board</h1>
                <RouteHandler onQuestionChange={this.startQuestion} onStartCategory={this.startCategory}/>
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
                case 'state:request':
                    this.sendCurrentState(message.connectionId);
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
    },

    startCategory: function(category) {
        this.setState({category: category});
        this.transitionTo('boardFirstQuestion');

        this.sendCurrentState();
    },

    startQuestion: function(question) {
        console.log("Start question");
        this.setState({question: question});
        this.sendCurrentState();
    },

    sendCurrentState: function(connectionId = null) {
        var message = {
            event: "state:changed",
            target: connectionId,
            data: {
                category: this.state.category,
                question: this.state.question
            }
        };

        this.conn.send(JSON.stringify(message));
    }
});

export default Board;