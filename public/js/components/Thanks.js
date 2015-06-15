var Router = ReactRouter;
var Navigation = Router.Navigation;

var Thanks = React.createClass({

    render: function() {
        return  (
            <div className="container">
                <div className="jumbotron">
                    <h1>Bedankt!</h1>
                    <p>Bedankt voor jullie aandacht en medewerking!</p>
                </div>
            </div>
        );
    }
});

export default Thanks;