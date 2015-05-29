var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var ClientFoodCategory = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Food category!</h1>
                <RouteHandler onAnswerSelected={this.props.onAnswerSelected} />
            </div>
        )
    }
});

export default ClientFoodCategory;