import App from './components/App';

import Client from './components/Client';
import Login from './components/client/Login';
import ClientFoodCategory from './components/client/ClientFoodCategory';

import ClientFirstQuestion from './components/client/ClientFirstQuestion';

import Board from './components/Board';
import CategorySelection from './components/board/CategorySelection';
import BoardFoodCategory from './components/board/BoardFoodCategory';

import BoardFirstQuestion from './components/board/BoardFirstQuestion';

var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
    <Route handler={App}>
        <Route name="student" path="/" handler={Client}>
            <Route name="login" handler={Login} />
            <Route name="clientFood" path="food" handler={ClientFoodCategory}>
                <Route name="clientFirstQuestion" path="1" handler={ClientFirstQuestion} />
            </Route>
        </Route>
        <Route handler={Board}>
            <Route name="board" path="board" handler={CategorySelection} />
            <Route name="boardFood" path="board/food" handler={BoardFoodCategory}>
                <Route name="boardFirstQuestion" path="1" handler={BoardFirstQuestion} />
            </Route>
        </Route>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});