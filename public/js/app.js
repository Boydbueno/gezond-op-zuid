import App from './components/App';

import Client from './components/Client';
import Login from './components/client/Login';
import ClientFoodCategory from './components/client/ClientFoodCategory';

import ClientQuestion from './components/client/ClientQuestion';

import Board from './components/Board';
import CategorySelection from './components/board/CategorySelection';
import BoardFoodCategory from './components/board/BoardFoodCategory';

import BoardQuestion from './components/board/BoardQuestion';

var Router = ReactRouter;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
    <Route handler={App}>
        <Route name="student" path="/" handler={Client}>
            <Route name="login" handler={Login} />
            <Route name="clientFood" path="food" handler={ClientFoodCategory}>
                <Route path=":id" handler={ClientQuestion} />
            </Route>
        </Route>
        <Route handler={Board}>
            <Route name="board" path="board" handler={CategorySelection} />
            <Route name="boardFood" path="board/food" handler={BoardFoodCategory} />
            <Route path="board/food/:id" handler={BoardQuestion} />
        </Route>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});