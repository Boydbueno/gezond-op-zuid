var BoardMultipleChoiceQuestion = React.createClass({
    render: function() {
        var totalAnswers = 0;

        for (var answer in this.props.givenAnswers) {
            totalAnswers += this.props.givenAnswers[answer].length;
        }

        return (
            <div>
                <header>
                    <h1>{this.props.question.question}</h1>
                </header>
                <div className="results">
                    {this.props.question.answers.map((answer, i) => {
                        var percentage = this.props.givenAnswers[i].length / totalAnswers * 100 || 0;

                        percentage += "%";

                        return (
                            <div className="result" key={i}>
                                <div className="percentage-bar-outer">
                                    <div className="percentage-bar-inner" style={{height: percentage}}></div>
                                </div>
                                <span>{answer.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
});

export default BoardMultipleChoiceQuestion;