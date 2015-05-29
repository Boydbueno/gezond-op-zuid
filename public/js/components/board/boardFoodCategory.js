var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var BoardFoodCategory = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Food category!</h1>
                <RouteHandler />
            </div>
        )
    }
});

export default BoardFoodCategory;