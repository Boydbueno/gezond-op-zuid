import BoardMultipleChoiceQuestion from './BoardMultipleChoiceQuestion';
import BoardVersusQuestion from './BoardVersusQuestion';
import Questions from './../Questions';

var Router = ReactRouter;
var Navigation = Router.Navigation;

import Conn from './../Conn';
Conn.connect();

var BoardQuestion = React.createClass({
    mixins: [Navigation],

    getInitialState: function() {
        return {
            question: null,
            givenAnswers: {},
            totalAnswer: 0
        }
    },

    componentWillMount: function() {
        var id = this.props.params.id;
        var question = Questions[id];
        this.setState({question});

        // Todo: This needs to be streamlined, but does for now.
        if (question.type == "MultipleChoice") {
            var givenAnswers = this.state.givenAnswers;

            var len = Questions[id].answers.length;

            for (var i = 0; i < len; i++) {
                givenAnswers[i] = [];
            }

            this.setState({givenAnswers});

            Conn.onMessage((e) => {
                var message = JSON.parse(e.data);

                switch (message.event) {
                    case 'question:answered':
                        this.addAnswer(message.data.answer, message.connectionId);
                        break;
                }
            });
        }
    },

    addAnswer: function(answerId, connectionId) {
        var answers = this.state.givenAnswers;

        // Todo: If player leaves.. we need to remove them from this list.

        // First remove connectionId from all answers
        answers = this.removeConnectionIdFromAnswers(answers, connectionId);

        // Key does not exists yet
        if (!(answerId in answers)) {
            answers[answerId] = [];
        }

        answers[answerId].push(connectionId);

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
        var header;
        var questionComponent;

        switch (this.state.question.type) {
            case "MultipleChoice":
                header = this.state.question.question;
                questionComponent = <BoardMultipleChoiceQuestion {...this.props} question={this.state.question} givenAnswers={this.state.givenAnswers} totalAnswers={this.state.totalAnswers} />;
                break;
            case "Versus":
                questionComponent = <BoardVersusQuestion question={this.state.question} />;
                break;
        }

        return (
            <div onClick={this.nextQuestion}>
                <header className="board-top-bar">
                    <h1>{ header }</h1>
                </header>
                <div className="container">
                    <section className="board-question">
                        <div className="board-question-inner">
                        { questionComponent }
                        </div>
                    </section>
                </div>
            </div>
        );
    },

    nextQuestion: function() {
        // Todo: Add some validation
        var id = this.state.question.id;

        this.transitionTo('/board/food/' + ++id);
    }

});

export default BoardQuestion;
