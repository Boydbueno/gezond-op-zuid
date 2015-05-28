var CategorySelection = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Category selection!</h1>
                <ol>
                    <li onClick={this.selectCategory}>Eten</li>
                    <li>Beweging</li>
                    <li>Dromen</li>
                    <li>Geluk</li>
                </ol>
            </div>
        )
    },

    selectCategory: function() {
        this.props.onStartCategory('food');
    }
});

export default CategorySelection;