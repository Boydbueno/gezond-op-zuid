import ClientMultipleChoiceQuestion from './ClientMultipleChoiceQuestion';
import Questions from './../Questions';

var ClientFirstQuestion = React.createClass({

    getInitialState: function() {
        return {
            question: null
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
                questionComponent = <ClientMultipleChoiceQuestion question={this.state.question} onAnswerSelected={this.props.onAnswerSelected} />;
                break;
        }

        return (
            <div className="client-question-wrapper">
                <header className="top-bar">
                    <i className="question-type-icon"></i>
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
    }

});

export default ClientFirstQuestion;
