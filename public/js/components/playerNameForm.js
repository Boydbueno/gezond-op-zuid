var PlayerNameForm = React.createClass({
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

        var conn = new WebSocket('ws://gezond-op-zuid.app:8080');
        conn.onopen = function(e) {
            console.log("Connection established!");
            var message = {
                event: "player:joined",
                data: {
                    name: this.state.name
                }
            };

            conn.send(JSON.stringify(message));
        }.bind(this);

        
    },

    render: function() {
        return  (
            <div>
                <form onSubmit={this.connect}>
                    <input value={this.state.text} onChange={this.onChange} placeholder="Naam" />
                    <button>Deelnemen!</button>
                </form>
            </div>
        );
    }
});
