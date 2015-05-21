var Router = ReactRouter;

var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Client = React.createClass({
    render: function() {
        return (
            <div>
                <PlayerNameForm />
                <Link to="inbox">Dashboard</Link>
                <RouteHandler/>
            </div>
        );
    }
});

var routes = (
    <Route name="client" path="/" handler={Client}>
        <Route name="inbox" handler={Client}/>
        <Route name="calendar" handler={Client}/>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});
