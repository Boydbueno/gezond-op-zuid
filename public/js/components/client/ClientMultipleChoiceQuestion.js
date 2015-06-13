import Conn from './../Conn';
Conn.connect();

var ClientMultipleChoiceQuestion = React.createClass({

    getInitialState: function() {
        return {
            currentAnswer: {}
        }
    },

    render: function() {
        var cx = React.addons.classSet;

        return (
            <div>
                <h1>{ this.props.question.question }</h1>
                    {this.props.question.answers.map((answer, i) => {
                        var classes = cx({
                            active: this.state.currentAnswer.id == i && this.state.currentAnswer.questionId == this.props.question.id,
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
        var currentAnswer = { id: e.target.getAttribute('id'), questionId: this.props.question.id };

        if (currentAnswer.id == this.state.currentAnswer.id && this.state.currentAnswer.questionId == this.props.question.id) return;

        this.setState({ currentAnswer }, () => {
            var message = {
                event: "question:answered",
                data: {
                    answer: this.state.currentAnswer.id
                }
            };

            Conn.send(message);
        });
    }

});

export default ClientMultipleChoiceQuestion;