import BoardMultipleChoiceQuestion from './BoardMultipleChoiceQuestion';

var BoardFirstQuestion = React.createClass({

    getDefaultProps: function() {

        return {
            question: 'Tomatenketchup bevat veel gezonde tomaten maar ook veel suiker. Hoeveel suikerklontjes zitten er in een fles van 875ml?',
            answers: [
                {
                    label: '8'
                },
                {
                    label: '24'
                },
                {
                    label: '58',
                    correct: true
                },
                {
                    label: '82'
                }
            ]
        }

    },

    getInitialState: function() {
        return {
            answers: {}
        }
    },

    componentWillMount: function() {
        this.props.onQuestionChange(1);

        this.props.connection.onmessage = (e) => {
            var message = JSON.parse(e.data);
            console.log(message);
            switch(message.event) {
                case 'question:answered':
                    this.addAnswer(message.data.answer, message.connectionId);
                    break;
            }
        }
    },

    addAnswer: function(answerId, connectionId) {
        var answers = this.state.answers;

        // Todo: If player leaves.. we need to remove them from this list.

        // First remove connectionId from all answers
        answers = this.removeConnectionIdFromAnswers(answers, connectionId);

        // Key does not exists yet
        if (!(answerId in answers)) {
            answers[answerId] = [];
        }

        answers[answerId].push(connectionId);

        console.log(answers);
        this.setState({answers});
    },

    removeConnectionIdFromAnswers(answers, connectionId) {
        for (var key in answers) {
            var index = answers[key].indexOf(connectionId);
            if (index > -1) {
                answers[key].splice(index, 1);
            }
        }
        return answers;
    },

    render: function() {
        return (
            <div>
                <BoardMultipleChoiceQuestion {...this.props} givenAnswers={this.state.answers}  />
            </div>
        );
    }

});

export default BoardFirstQuestion;