var Router = ReactRouter;

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var Client = React.createClass({
    conn: {},
    mixins: [Navigation],
    getInitialState: function() {
        return {
            name: localStorage["name"] || "",
            connected: false
        }
    },

    componentWillMount: function() {
        if (this.state.name === "") {
            this.transitionTo('login');
            return;
        }

        if (!this.state.connected) {
            this.connect();

            var message = {
                event: "state:request",
                data: {
                    name: this.state.name
                }
            };

            // Todo: If you login too late, you won't get synced until you refresh again. It's rather weird.
            this.conn.onopen = () => {
                this.conn.send(JSON.stringify(message));
            }
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
        console.log(answer);
    },

    connectHandler: function(name) {
        this.setName(name);
        this.connect();
    },

    connect: function() {
        this.conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        this.conn.onopen = () => {
            this.setState({ connected: true });
            console.log("Connection established!");
            var message = {
                event: "player:joined",
                data: {
                    name: this.state.name
                }
            };

            this.conn.send(JSON.stringify(message));

            this.transitionTo('/');
        };

        this.conn.onmessage = (e) => {
            var message = JSON.parse(e.data);
            switch(message.event) {
                case 'state:changed':
                    console.log(message);
                    if (message.data.category) {
                        this.transitionTo("/" + message.data.category + "/" + message.data.question);
                    }

                    break;
            }
        };
    },

    setName: function(name) {
        localStorage["name"] = name;
        this.setState({name: name});
    }
});

export default Client;
