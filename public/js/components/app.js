var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <div className="container">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

export default App;