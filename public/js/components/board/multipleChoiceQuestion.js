var MultipleChoiceQuestion = React.createClass({

    render: function() {
        return (
            <div>
                { this.props.question }
                <ul>
                    {this.props.answers.map(function(answer, i){
                        return <li key={i}>{answer.label}</li>;
                    })}
                </ul>
            </div>
        );
    }

});

export default MultipleChoiceQuestion;