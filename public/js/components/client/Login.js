var Router = ReactRouter;
var Navigation = Router.Navigation;

var Login = React.createClass({
    mixins: [Navigation],
    getInitialState: function() {
        return {
            name: ""
        }
    },

    onChange: function(e) {
        this.setState({ name: e.target.value });
    },

    connect: function(e) {
        e.preventDefault();

        this.props.onConnect(this.state.name);
    },

    render: function() {
        return  (
            <div className="login-form">
                <form onSubmit={this.connect}>
                    <input className="input-element input-field" value={this.state.text} onChange={this.onChange} placeholder="Gebruikersnaam" />
                    <button className="input-element submit-button">LOGIN</button>
                </form>
            </div>
        );
    }
});

export default Login;