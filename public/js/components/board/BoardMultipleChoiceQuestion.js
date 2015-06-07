var BoardMultipleChoiceQuestion = React.createClass({
    render: function() {
        var totalAnswers = 0;

        for (var answer in this.props.givenAnswers) {
            totalAnswers += this.props.givenAnswers[answer].length;
        }

        return (
            <div>
                <header className="well">
                    <div className="row">
                        <div className="span2">
                            <h1>Vraag</h1>
                        </div>
                        <div className="span10">
                            <p className="lead">
                                {this.props.question}
                            </p>
                        </div>
                    </div>
                </header>
                <ul>
                    {this.props.answers.map((answer, i) => {
                        var percentage = this.props.givenAnswers[i].length / totalAnswers * 100 || 0;

                        return (
                            <li key={i}>{answer.label + " " + percentage}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

export default BoardMultipleChoiceQuestion;