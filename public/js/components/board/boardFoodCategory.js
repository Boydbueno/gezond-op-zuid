var Router = ReactRouter;
var RouteHandler = Router.RouteHandler;

var BoardFoodCategory = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Food category!</h1>
                <RouteHandler onQuestionChange={this.props.onQuestionChange}/>
            </div>
        )
    }
});

export default BoardFoodCategory;