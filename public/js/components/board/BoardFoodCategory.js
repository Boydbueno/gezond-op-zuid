var Router = ReactRouter;
var { Route, RouteHandler, Link } = Router;

var BoardFoodCategory = React.createClass({
    render: function() {
        return (
            <div>
                <header className="board-top-bar">
                    <h1>Maandag 1 juni </h1>
                </header>
                <section>
                    <image className="board-category-image" src="./img/icon_food.jpg" />
                    <section className="board-subcategories">
                        <h1>Subcategorieën</h1>
                        <ul>
                            <li><Link to="/board/food/1">Vitamines</Link></li>
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
    }
});

export default BoardFoodCategory;
