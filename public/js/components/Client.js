var Router = ReactRouter;

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

import Conn from './../components/Conn';

Conn.connect();

var Client = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {
            name: localStorage["name"] || "",
            hideOverlay: false
        }
    },

    componentWillMount: function() {
        if (this.state.name === "") {
            this.transitionTo('login');
            return;
        }

        this.join();
    },

    componentDidMount: function() {
        window.setTimeout(() => {
            this.setState({hideOverlay: true});
        }, 2500);
    },

    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            "overlay": true,
            "fadeout": this.state.hideOverlay
        });

        return (
            <div>
                <div className={classes}></div>
                <RouteHandler name={this.state.name} onConnect={this.connectHandler} />
            </div>
        );
    },

    join: function() {
        Conn.send({
            event: "state:request",
            data: {
                name: this.state.name
            }
        });

        Conn.onMessage((e) => {
            var message = JSON.parse(e.data);
            switch (message.event) {
                case 'state:changed':

                    if (message.data.path) {
                        this.transitionTo(message.data.path);
                    }

                    break;
            }
        });
    },

    connectHandler: function(name) {
        this.setName(name);
        this.transitionTo("/");
        this.join();
    },

    setName: function(name) {
        localStorage["name"] = name;
        this.setState({name: name});
    }
});

export default Client;
