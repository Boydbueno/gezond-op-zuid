var CategorySelection = React.createClass({
    getInitialState: function() {
        return {
            food: {
                active: false,
                image: "./img/icon_food.jpg",
                active_image: "./img/icon_food_active.jpg"
            },
            movement: {
                active: false,
                image: "./img/icon_movement.jpg",
                active_image: "./img/icon_movement_active.jpg"
            },
            dream: {
                active: false,
                image: "./img/icon_dream.jpg",
                active_image: "./img/icon_dream_active.jpg"
            },
            happiness: {
                active: false,
                image: "./img/icon_happiness.jpg",
                active_image: "./img/icon_happiness_active.jpg"
            }
        }
    },

    render: function() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <img className="col-md-12" onClick={this.selectCategory} src={this.state.food.active ? this.state.food.active_image : this.state.food.image} />
                    </div>
                    <div className="col-md-6">
                        <img className="col-md-12" src={this.state.movement.active ? this.state.movement.active_image : this.state.movement.image} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <img className="col-md-12" src={this.state.dream.active ? this.state.dream.active_image : this.state.dream.image} />
                    </div>
                    <div className="col-md-6">
                        <img className="col-md-12" src={this.state.happiness.active ? this.state.happiness.active_image : this.state.happiness.image} />
                    </div>
                </div>
            </div>
        )
    },

    selectCategory: function() {
        var food = this.state.food;
        food.active = true;
        this.setState({food});

        this.props.onStartCategory('food');
    }
});

export default CategorySelection;
