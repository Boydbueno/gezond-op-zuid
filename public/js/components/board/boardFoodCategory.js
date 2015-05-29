var Router = ReactRouter;
var { Route, RouteHandler, Link } = Router;

var BoardFoodCategory = React.createClass({

    getInitialState: function() {
        return {
            hours: 0,
            minutes: 0
        }
    },

    componentDidMount: function() {
        this.updateTime();
        this.startTime();
    },

    componentWillUnmount: function() {
        console.log("component unmounting");
    },

    render: function() {
        return (
            <div>
                <header className="well">
                    <h1>Maandag 1 juni
                        <span className="pull-right">{this.state.hours}:{this.state.minutes}</span>
                    </h1>
                </header>
                <section className="row">
                    <image className="span7" src="./img/icon_food.jpg" />
                    <section className="span5 subcategories">
                        <h1>Subcategorieën</h1>
                        <ul>
                            <li><Link to="boardFirstQuestion">Vitamines</Link></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </section>
            </div>
        )
    },

    startTime: function() {
        this.interval = setInterval( () => {
            this.updateTime();
        }, 60000);
    },

    updateTime: function() {
        var d = new Date();
        this.setState({hours: (d.getHours()<10?'0':'') + d.getHours(), minutes: (d.getMinutes()<10?'0':'') + d.getMinutes()});
    }
});

export default BoardFoodCategory;