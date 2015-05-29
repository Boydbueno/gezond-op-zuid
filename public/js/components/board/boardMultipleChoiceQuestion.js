var BoardMultipleChoiceQuestion = React.createClass({

    render: function() {
        return (
            <div>
                { this.props.question }
                <ul>
                    {this.props.answers.map((answer, i) => {
                        return <li key={i}>{answer.label + " " + (this.props.givenAnswers[i] == undefined ? "" : this.props.givenAnswers[i].length)}</li>;
                    })}
                </ul>
            </div>
        );
    }

});

export default BoardMultipleChoiceQuestion;