var Router = ReactRouter;
var Navigation = Router.Navigation;

var CategorySelection = React.createClass({
    mixins: [Navigation],
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
            <div className="icon-wrapper">
                <img onClick={this.selectCategory} src={this.state.food.active ? this.state.food.active_image : this.state.food.image} />
                <img src={this.state.movement.active ? this.state.movement.active_image : this.state.movement.image} />
                <img src={this.state.dream.active ? this.state.dream.active_image : this.state.dream.image} />
                <img src={this.state.happiness.active ? this.state.happiness.active_image : this.state.happiness.image} />
            </div>
        )
    },

    selectCategory: function() {
        var food = this.state.food;
        food.active = true;
        this.setState({food});

        this.transitionTo('boardFood');
    }
});

export default CategorySelection;
