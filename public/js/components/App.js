var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <div>
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

export default App;
