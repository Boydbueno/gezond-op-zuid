import Conn from './../Conn';
Conn.connect();

var ClientMultipleChoiceQuestion = React.createClass({

    getInitialState: function() {
        return {
            currentAnswer: {},
            isAnswerShown: false
        }
    },

    componentWillReceiveProps: function(props) {
        // Only if new question
        if (props.question.id !== this.props.question.id) {
            this.setState({
                currentAnswer: {},
                isAnswerShown: false
            })
        }
    },

    componentWillMount: function() {
        Conn.onMessage((e) => {
            var message = JSON.parse(e.data);
            switch (message.event) {
                case 'question:answerShownStateChanged':
                    this.setState({ isAnswerShown: message.data.isAnswerShown });

                    // Only if answer is correct
                    if (this.isAnswerCorrect() && message.data.isAnswerShown) {
                        this.props.onCorrectAnswer();
                    }
                    break;
            }
        });
    },

    isAnswerCorrect: function() {
        return this.state.currentAnswer.label === this.props.question.correctAnswer;
    },

    render: function() {
        var cx = React.addons.classSet;

        return (
            <div>
                <h1>VRAAG { this.props.question.id }</h1>
                <p>{ this.props.question.question }</p>
                    {this.props.question.answers.map((answer, i) => {
                        var classes = cx({
                            answer: true,
                            active: this.state.currentAnswer.id == i,
                            correct: this.state.isAnswerShown && answer.label == this.props.question.correctAnswer,
                            wrong: this.state.isAnswerShown && this.state.currentAnswer.id == i && answer.label != this.props.question.correctAnswer
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
        if (this.state.isAnswerShown) return;
        var id = e.target.getAttribute('id');
        var currentAnswer = { id: id, questionId: this.props.question.id, label: this.props.question.answers[id].label };

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