import ClientMultipleChoiceQuestion from './ClientMultipleChoiceQuestion';

var ClientFirstQuestion = React.createClass({

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
                    label: '58'
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
                <ClientMultipleChoiceQuestion {...this.props} />
            </div>
        );
    }

});

export default ClientFirstQuestion;