import BoardMultipleChoiceQuestion from './BoardMultipleChoiceQuestion';

var BoardFirstQuestion = React.createClass({

    componentWillMount: function() {
        this.props.onQuestionChange(1);
    },

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

    render: function() {
        return (
            <div>
                <BoardMultipleChoiceQuestion {...this.props} />
            </div>
        );
    }

});

export default BoardFirstQuestion;