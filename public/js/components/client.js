var Router = ReactRouter;

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var Client = React.createClass({
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
        }
    },

    render: function() {
        return (
            <div>
                <h1>Client</h1>
                <RouteHandler name={this.state.name} onConnect={this.connectHandler} />
            </div>
        );
    },

    connectHandler: function(name) {
        this.setName(name);
        this.connect();
    },

    connect: function() {
        var conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        conn.onopen = () => {
            console.log("Connection established!");
            var message = {
                event: "player:joined",
                data: {
                    name: this.state.name
                }
            };

            conn.send(JSON.stringify(message));

            this.transitionTo('/');
        };
    },

    setName: function(name) {
        localStorage["name"] = name;
        this.setState({name: name});
    }
});

export default Client;
