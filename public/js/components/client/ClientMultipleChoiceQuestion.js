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
                { this.props.question.question }
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

        this.setState({ currentAnswer }, () => { this.props.onAnswerSelected(this.state.currentAnswer); });
    }

});

export default ClientMultipleChoiceQuestion;