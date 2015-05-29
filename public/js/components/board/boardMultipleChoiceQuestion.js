var BoardMultipleChoiceQuestion = React.createClass({
    render: function() {
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
                        return (
                            <li key={i}>{answer.label + " " + this.props.givenAnswers[i].length}</li>
                        );
                    })}
                </ul>
            </div>
        );
    }
});

export default BoardMultipleChoiceQuestion;