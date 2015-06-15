import ClientMultipleChoiceQuestion from './ClientMultipleChoiceQuestion';
import Questions from './../Questions';

var ClientFirstQuestion = React.createClass({

    getInitialState: function() {
        return {
            question: null,
            score: 0
        }
    },

    componentWillMount: function() {
        var id = this.props.params.id;
        this.setState({question: Questions[id]});
    },

    componentWillReceiveProps: function(nextProps) {
        var id = nextProps.params.id;
        this.setState({question: Questions[id]});
    },

    render: function() {
        var questionComponent;

        switch (this.state.question.type) {
            case "MultipleChoice":
                var cx = React.addons.classSet;

                var typeIcon = cx({
                    "question-type-icon": true,
                    "question-type-icon-vitamine-quiz": true
                });
                questionComponent = <ClientMultipleChoiceQuestion onCorrectAnswer={this.increaseScore} question={this.state.question} />;
                break;
        }

        return (
            <div className="client-question-wrapper">
                <header className="top-bar">
                    <span className="score">Score: {this.state.score}</span>
                    <i className={typeIcon}></i>
                </header>
                <div className="container client-container">
                    <section className="client-question">
                        <div className="client-question-inner">
                        { questionComponent }
                        </div>
                    </section>
                </div>
            </div>
        );
    },

    increaseScore: function() {
        this.setState({ score: this.state.score += 100 });
    }

});

export default ClientFirstQuestion;
