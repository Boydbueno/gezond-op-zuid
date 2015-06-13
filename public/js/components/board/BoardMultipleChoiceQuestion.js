var BoardMultipleChoiceQuestion = React.createClass({

    componentDidMount: function(){
        this.drawChart();
    },

    componentDidUpdate: function(){
        this.drawChart();
    },

    drawChart: function() {
        console.log("Drawing chart");

        var rows = [];

        var totalAnswers = 0;

        for (var answer in this.props.givenAnswers) {
            totalAnswers += this.props.givenAnswers[answer].length;
        }

        for (let i = 0; i < this.props.question.answers.length; i++) {
            rows.push([this.props.question.answers[i].label, this.props.givenAnswers[i].length / totalAnswers * 100 || 0]);
        }

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows(rows);
        // Set chart options
        var options = {
            'height': 300,
            vAxis: {
                viewWindow: {
                    min: 0,
                    max: 100
                },
                ticks: [0, 25, 50, 75, 100], // display labels every 25
                gridlines: {
                    color: 'transparent'
                }
            },
            legend: {
                position: 'none'
            },
            animation: {
                duration: 400,
                easing: 'out'
            }
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
        chart.draw(data, options);
    },

    render: function() {
        return (
            <div>
                <header>
                    <h1>{this.props.question.question}</h1>
                </header>
                <div className="results" id="chart">
                </div>
            </div>
        );
    }
});

export default BoardMultipleChoiceQuestion;