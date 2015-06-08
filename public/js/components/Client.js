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
            name: localStorage["name"] || ""
        }
    },

    componentWillMount: function() {
        if (this.state.name === "") {
            this.transitionTo('login');
            return;
        }

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

        Conn.send(message);
    },

    connectHandler: function(name) {
        this.setName(name);
        this.connect();
    },

    setName: function(name) {
        localStorage["name"] = name;
        this.setState({name: name});
    }
});

export default Client;
