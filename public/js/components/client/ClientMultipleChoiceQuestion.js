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
        if (props.question) {
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
                    break;
            }
        });
    },

    render: function() {
        var cx = React.addons.classSet;

        return (
            <div>
                <h1>{ this.props.question.question }</h1>
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

        var currentAnswer = { id: e.target.getAttribute('id'), questionId: this.props.question.id };

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