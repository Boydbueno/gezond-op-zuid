var Router = ReactRouter;

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var Client = React.createClass({
    conn: undefined,
    mixins: [Navigation],
    getInitialState: function() {
        return {
            name: localStorage["name"] || ""
        }
    },

    componentWillMount: function() {
        if (this.state.name === "") {
            this.transitionTo('login');
            return;
        }

        console.log(this.conn);

        if (!this.conn) {
            this.connect();
        }

        var message = {
            event: "state:request",
            data: {
                name: this.state.name
            }
        };

        // Todo: If you login too late, you won't get synced until you refresh again. It's rather weird.
        if (this.conn.readyState === this.conn.OPEN) {
            this.conn.send(JSON.stringify(message));
        } else {
            this.conn.addEventListener('open', () => {
                this.conn.send(JSON.stringify(message));
            });
        }
    },

    render: function() {
        return (
            <div>
                <h1>Client</h1>
                <RouteHandler name={this.state.name} onConnect={this.connectHandler} onAnswerSelected={this.answerSelected} />
            </div>
        );
    },

    answerSelected: function(answer) {
        var message = {
            event: "question:answered",
            data: {
                answer
            }
        };

        this.conn.send(JSON.stringify(message));
    },

    connectHandler: function(name) {
        this.setName(name);
        this.connect();
    },

    connect: function() {
        this.conn = new WebSocket('ws://gezond-op-zuid.app:8080');

        this.conn.addEventListener('open', () => {
            var message = {
                event: "player:joined",
                data: {
                    name: this.state.name
                }
            };

            this.conn.send(JSON.stringify(message));

            this.transitionTo('/');
        });

        this.conn.addEventListener('message', (e) => {
            var message = JSON.parse(e.data);
            switch(message.event) {
                case 'state:changed':
                    console.log(message);
                    if (message.data.path) {
                        this.transitionTo(message.data.path);
                    }

                    break;
            }
        });

    },

    setName: function(name) {
        localStorage["name"] = name;
        this.setState({name: name});
    }
});

export default Client;
