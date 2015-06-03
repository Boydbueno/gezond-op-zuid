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
            <div>
                <h2>Login</h2>
                <form onSubmit={this.connect}>
                    <input value={this.state.text} onChange={this.onChange} placeholder="Naam" />
                    <button>Deelnemen!</button>
                </form>
            </div>
        );
    }
});

export default Login;