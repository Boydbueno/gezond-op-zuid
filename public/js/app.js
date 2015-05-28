import App from './components/App';

import Client from './components/Client';
import Login from './components/client/Login';
import Board from './components/Board';

var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
    <Route handler={App}>
        <Route name="student" path="/" handler={Client}>
            <Route name="login" handler={Login}/>
        </Route>
        <Route name="board" handler={Board}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});