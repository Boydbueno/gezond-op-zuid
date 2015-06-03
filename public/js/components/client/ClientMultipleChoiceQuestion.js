var ClientMultipleChoiceQuestion = React.createClass({

    getInitialState: function() {
        return {
            currentAnswer: null
        }
    },

    render: function() {
        return (
            <div>
                { this.props.question }
                    {this.props.answers.map((answer, i) => {
                        return (
                            <div key={i}>
                                <input type="radio" id={i} name="answer" checked={this.state.currentAnswer == i} onChange={this.onAnswerSelected} />
                                <label htmlFor={i}>{answer.label}</label>
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