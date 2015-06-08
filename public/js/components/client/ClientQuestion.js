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
        return (
            <div>
                <ClientMultipleChoiceQuestion question={this.state.question} onAnswerSelected={this.props.onAnswerSelected} />
            </div>
        );
    }

});

export default ClientFirstQuestion;