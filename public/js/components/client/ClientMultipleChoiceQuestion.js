import Conn from './../Conn';
Conn.connect();

var ClientMultipleChoiceQuestion = React.createClass({

    getInitialState: function() {
        return {
            currentAnswer: null
        }
    },

    render: function() {
        var cx = React.addons.classSet;

        return (
            <div>
                <h1>{ this.props.question.question }</h1>
                    {this.props.question.answers.map((answer, i) => {
                        var classes = cx({
                            active: this.state.currentAnswer == i,
                            answer: true
                        });
                        return (
                            <div key={i}>
                                <div id={i} className={classes} onClick={this.onAnswerSelected}>
                                    {answer.label}
                                </div>
                            </div>
                        );
                    })}
            </div>
        );
    },

    onAnswerSelected: function(e) {
        var currentAnswer = e.target.getAttribute('id');

        if (currentAnswer == this.state.currentAnswer) return;

        this.setState({ currentAnswer }, () => {
            var message = {
                event: "question:answered",
                data: {
                    answer: this.state.currentAnswer
                }
            };

            Conn.send(message);
        });
    }

});

export default ClientMultipleChoiceQuestion;