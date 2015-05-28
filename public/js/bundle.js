(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _componentsApp = require('./components/App');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsLogin = require('./components/Login');

var _componentsLogin2 = _interopRequireDefault(_componentsLogin);

var _componentsClient = require('./components/Client');

var _componentsClient2 = _interopRequireDefault(_componentsClient);

var _componentsBoard = require('./components/Board');

var _componentsBoard2 = _interopRequireDefault(_componentsBoard);

var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = React.createElement(
    Route,
    { handler: _componentsApp2['default'] },
    React.createElement(
        Route,
        { name: 'student', path: '/', handler: _componentsClient2['default'] },
        React.createElement(Route, { name: 'login', handler: _componentsLogin2['default'] })
    ),
    React.createElement(Route, { name: 'board', handler: _componentsBoard2['default'] })
);

Router.run(routes, function (Handler) {
    React.render(React.createElement(Handler, null), document.getElementById('app'));
});

},{"./components/App":2,"./components/Board":3,"./components/Client":4,"./components/Login":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    displayName: "App",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(RouteHandler, null)
        );
    }
});

exports["default"] = App;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var Board = React.createClass({
    displayName: 'Board',

    getInitialState: function getInitialState() {
        return {
            players: []
        };
    },

    componentWillMount: function componentWillMount() {
        this.connect();
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Board'
            ),
            React.createElement(RouteHandler, null)
        );
    },

    connect: function connect() {
        var _this = this;

        var conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        conn.onopen = function (e) {
            console.log('Connection established!');
        };
        conn.onmessage = function (e) {
            var message = JSON.parse(e.data);
            console.log(message);
            switch (message.event) {
                case 'player:joined':

                    _this.addPlayer({
                        id: message.connectionId,
                        name: message.data.name
                    });

                    console.log(_this.state.players);
                    break;
                case 'player:left':
                    _this.removePlayer(message.connectionId);
                    break;
            }
        };
    },

    addPlayer: function addPlayer(player) {
        this.state.players.push(player);
    },

    removePlayer: function removePlayer(id) {
        this.state.players = this.state.players.filter(function (player) {
            return player.id !== id;
        });
    }
});

exports['default'] = Board;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Router = ReactRouter;

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;

var Client = React.createClass({
    displayName: "Client",

    mixins: [Navigation],
    getInitialState: function getInitialState() {
        return {
            name: localStorage["name"] || "",
            connected: false
        };
    },

    componentWillMount: function componentWillMount() {
        if (this.state.name === "") {
            this.transitionTo("login");
            return;
        }

        if (!this.state.connected) {
            this.connect();
        }
    },

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "Client"
            ),
            React.createElement(RouteHandler, { name: this.state.name, onConnect: this.connectHandler })
        );
    },

    connectHandler: function connectHandler(name) {
        this.setName(name);
        this.connect();
    },

    connect: function connect() {
        var _this = this;

        var conn = new WebSocket("ws://gezond-op-zuid.app:8080");
        conn.onopen = function () {
            console.log("Connection established!");
            var message = {
                event: "player:joined",
                data: {
                    name: _this.state.name
                }
            };

            conn.send(JSON.stringify(message));

            _this.transitionTo("/");
        };
    },

    setName: function setName(name) {
        localStorage["name"] = name;
        this.setState({ name: name });
    }
});

exports["default"] = Client;
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Router = ReactRouter;
var Navigation = Router.Navigation;

var Login = React.createClass({
    displayName: "Login",

    mixins: [Navigation],
    getInitialState: function getInitialState() {
        return {
            name: ""
        };
    },

    onChange: function onChange(e) {
        this.setState({ name: e.target.value });
    },

    connect: function connect(e) {
        e.preventDefault();

        this.props.onConnect(this.state.name);
    },

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h2",
                null,
                "Login"
            ),
            React.createElement(
                "form",
                { onSubmit: this.connect },
                React.createElement("input", { value: this.state.text, onChange: this.onChange, placeholder: "Naam" }),
                React.createElement(
                    "button",
                    null,
                    "Deelnemen!"
                )
            )
        );
    }
});

exports["default"] = Login;
module.exports = exports["default"];

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS92YWdyYW50L0NvZGUvZ2V6b25kLW9wLXp1aWQvcHVibGljL2pzL2FwcC5qcyIsIi9ob21lL3ZhZ3JhbnQvQ29kZS9nZXpvbmQtb3AtenVpZC9wdWJsaWMvanMvY29tcG9uZW50cy9BcHAuanMiLCIvaG9tZS92YWdyYW50L0NvZGUvZ2V6b25kLW9wLXp1aWQvcHVibGljL2pzL2NvbXBvbmVudHMvQm9hcmQuanMiLCIvaG9tZS92YWdyYW50L0NvZGUvZ2V6b25kLW9wLXp1aWQvcHVibGljL2pzL2NvbXBvbmVudHMvQ2xpZW50LmpzIiwiL2hvbWUvdmFncmFudC9Db2RlL2dlem9uZC1vcC16dWlkL3B1YmxpYy9qcy9jb21wb25lbnRzL0xvZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs2QkNBZ0Isa0JBQWtCOzs7OytCQUNoQixvQkFBb0I7Ozs7Z0NBQ25CLHFCQUFxQjs7OzsrQkFDdEIsb0JBQW9COzs7O0FBRXRDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQztBQUN6QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3pCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRXZDLElBQUksTUFBTSxHQUNOO0FBQUMsU0FBSztNQUFDLE9BQU8sNEJBQU07SUFDaEI7QUFBQyxhQUFLO1VBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sK0JBQVM7UUFDM0Msb0JBQUMsS0FBSyxJQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyw4QkFBUSxHQUFFO0tBQ2pDO0lBQ1Isb0JBQUMsS0FBSyxJQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsT0FBTyw4QkFBUSxHQUFFO0NBQ2pDLEFBQ1gsQ0FBQzs7QUFFRixNQUFNLENBQUMsR0FBRyxDQUFD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QUFFLGtCQUFXO0FBQ2YsZUFDSTs7O1lBQ0k7Ozs7YUFBYztZQUNkOztrQkFBTSxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQUFBQztnQkFDekIsK0JBQU8sS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxBQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEFBQUMsRUFBQyxXQUFXLEVBQUMsTUFBTSxHQUFHO2dCQUM3RTs7OztpQkFBMkI7YUFDeEI7U0FDTCxDQUNSO0tBQ0w7Q0FDSixDQUFDLENBQUM7O3FCQUVZLEtBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEFwcCBmcm9tICcuL2NvbXBvbmVudHMvQXBwJztcclxuaW1wb3J0IExvZ2luIGZyb20gJy4vY29tcG9uZW50cy9Mb2dpbic7XHJcbmltcG9ydCBDbGllbnQgZnJvbSAnLi9jb21wb25lbnRzL0NsaWVudCc7XHJcbmltcG9ydCBCb2FyZCBmcm9tICcuL2NvbXBvbmVudHMvQm9hcmQnO1xyXG5cclxudmFyIFJvdXRlciA9IFJlYWN0Um91dGVyO1xyXG52YXIgUm91dGUgPSBSb3V0ZXIuUm91dGU7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG5cclxudmFyIHJvdXRlcyA9IChcclxuICAgIDxSb3V0ZSBoYW5kbGVyPXtBcHB9PlxyXG4gICAgICAgIDxSb3V0ZSBuYW1lPVwic3R1ZGVudFwiIHBhdGg9XCIvXCIgaGFuZGxlcj17Q2xpZW50fT5cclxuICAgICAgICAgICAgPFJvdXRlIG5hbWU9XCJsb2dpblwiIGhhbmRsZXI9e0xvZ2lufS8+XHJcbiAgICAgICAgPC9Sb3V0ZT5cclxuICAgICAgICA8Um91dGUgbmFtZT1cImJvYXJkXCIgaGFuZGxlcj17Qm9hcmR9Lz5cclxuICAgIDwvUm91dGU+XHJcbik7XHJcblxyXG5Sb3V0ZXIucnVuKHJvdXRlcywgZnVuY3Rpb24gKEhhbmRsZXIpIHtcclxuICAgIFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xyXG59KTsiLCJ2YXIgUm91dGVyID0gUmVhY3RSb3V0ZXI7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG5cclxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZUhhbmRsZXIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDsiLCJ2YXIgUm91dGVyID0gUmVhY3RSb3V0ZXI7XHJcbnZhciBSb3V0ZUhhbmRsZXIgPSBSb3V0ZXIuUm91dGVIYW5kbGVyO1xyXG5cclxudmFyIEJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwbGF5ZXJzOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGgxPkJvYXJkPC9oMT5cclxuICAgICAgICAgICAgICAgIDxSb3V0ZUhhbmRsZXIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfSxcclxuXHJcbiAgICBjb25uZWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY29ubiA9IG5ldyBXZWJTb2NrZXQoJ3dzOi8vZ2V6b25kLW9wLXp1aWQuYXBwOjgwODAnKTtcclxuICAgICAgICBjb25uLm9ub3BlbiA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW9uIGVzdGFibGlzaGVkIVwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbm4ub25tZXNzYWdlID0gKGUpID0+IHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBKU09OLnBhcnNlKGUuZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBzd2l0Y2gobWVzc2FnZS5ldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncGxheWVyOmpvaW5lZCc6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGxheWVyKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuY29ubmVjdGlvbklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZXNzYWdlLmRhdGEubmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLnBsYXllcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncGxheWVyOmxlZnQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUGxheWVyKG1lc3NhZ2UuY29ubmVjdGlvbklkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZFBsYXllcjogZnVuY3Rpb24ocGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5wbGF5ZXJzLnB1c2gocGxheWVyKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVtb3ZlUGxheWVyOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUucGxheWVycyA9IHRoaXMuc3RhdGUucGxheWVycy5maWx0ZXIoZnVuY3Rpb24ocGxheWVyKSB7XHJcbiAgICAgICAgICAgcmV0dXJuIHBsYXllci5pZCAhPT0gaWQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQm9hcmQ7IiwidmFyIFJvdXRlciA9IFJlYWN0Um91dGVyO1xuXG52YXIgTGluayA9IFJvdXRlci5MaW5rO1xudmFyIFJvdXRlID0gUm91dGVyLlJvdXRlO1xudmFyIFJvdXRlSGFuZGxlciA9IFJvdXRlci5Sb3V0ZUhhbmRsZXI7XG52YXIgTmF2aWdhdGlvbiA9IFJvdXRlci5OYXZpZ2F0aW9uO1xuXG52YXIgQ2xpZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG1peGluczogW05hdmlnYXRpb25dLFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBsb2NhbFN0b3JhZ2VbXCJuYW1lXCJdIHx8IFwiXCIsXG4gICAgICAgICAgICBjb25uZWN0ZWQ6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubmFtZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJ2xvZ2luJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDE+Q2xpZW50PC9oMT5cbiAgICAgICAgICAgICAgICA8Um91dGVIYW5kbGVyIG5hbWU9e3RoaXMuc3RhdGUubmFtZX0gb25Db25uZWN0PXt0aGlzLmNvbm5lY3RIYW5kbGVyfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfSxcblxuICAgIGNvbm5lY3RIYW5kbGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuc2V0TmFtZShuYW1lKTtcbiAgICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgfSxcblxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29ubiA9IG5ldyBXZWJTb2NrZXQoJ3dzOi8vZ2V6b25kLW9wLXp1aWQuYXBwOjgwODAnKTtcbiAgICAgICAgY29ubi5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gZXN0YWJsaXNoZWQhXCIpO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IFwicGxheWVyOmpvaW5lZFwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5zdGF0ZS5uYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgY29ubi5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcblxuICAgICAgICAgICAgdGhpcy50cmFuc2l0aW9uVG8oJy8nKTtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgc2V0TmFtZTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2VbXCJuYW1lXCJdID0gbmFtZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bmFtZTogbmFtZX0pO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDbGllbnQ7XG4iLCJ2YXIgUm91dGVyID0gUmVhY3RSb3V0ZXI7XG52YXIgTmF2aWdhdGlvbiA9IFJvdXRlci5OYXZpZ2F0aW9uO1xuXG52YXIgTG9naW4gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbWl4aW5zOiBbTmF2aWdhdGlvbl0sXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWU6IFwiXCJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkNoYW5nZTogZnVuY3Rpb24oZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgbmFtZTogZS50YXJnZXQudmFsdWUgfSk7XG4gICAgfSxcblxuICAgIGNvbm5lY3Q6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMucHJvcHMub25Db25uZWN0KHRoaXMuc3RhdGUubmFtZSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAgKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDI+TG9naW48L2gyPlxuICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmNvbm5lY3R9PlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdmFsdWU9e3RoaXMuc3RhdGUudGV4dH0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHBsYWNlaG9sZGVyPVwiTmFhbVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24+RGVlbG5lbWVuITwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBMb2dpbjsiXX0=
