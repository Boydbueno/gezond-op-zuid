var BoardVersusQuestion = React.createClass({
    render: function() {

        return (
            <div>
                <header className="well">
                    <div className="row">
                        <div className="span10">
                            <p className="lead">
                                {this.props.question.components[0].label} - {this.props.question.components[1].label}
                            </p>
                        </div>
                    </div>
                </header>
                <img src={this.props.question.components[0].image} />
                <img src={this.props.question.components[1].image} />
            </div>
        );
    }
});

export default BoardVersusQuestion;