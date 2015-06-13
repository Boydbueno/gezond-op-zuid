var BoardMultipleChoiceQuestion = React.createClass({

    chart: undefined,
    dataTable: undefined,

    componentDidMount: function(){
        this.buildTableData();
        this.drawChart();
    },

    componentDidUpdate: function(){
        this.buildTableData();
        this.updateChart();
    },

    buildTableData: function() {
        var rows = [];

        var totalAnswers = 0;

        for (var answer in this.props.givenAnswers) {
            totalAnswers += this.props.givenAnswers[answer].length;
        }

        for (let i = 0; i < this.props.question.answers.length; i++) {
            rows.push([this.props.question.answers[i].label, this.props.givenAnswers[i].length / totalAnswers * 100 || 0]);
        }

        // Create the data table.
        this.dataTable = new google.visualization.DataTable();
        this.dataTable.addColumn('string', 'Antwoord');
        this.dataTable.addColumn('number', 'Percentage');
        this.dataTable.addRows(rows);
        // Set chart options
    },

    drawChart: function() {
        var options = {
            'height': 300,
            vAxis: {
                viewWindow: {
                    min: 0,
                    max: 100
                },
                ticks: [0, 25, 50, 75, 100],
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
        this.chart = new google.visualization.ColumnChart(document.getElementById('chart'));
        this.chart.draw(this.dataTable, options);
    },

    updateChart: function() {
        var options = {
            'height': 300,
            vAxis: {
                viewWindow: {
                    min: 0,
                    max: 100
                },
                ticks: [0, 25, 50, 75, 100],
                gridlines: {
                    color: 'transparent'
                }
            },
            legend: {
                position: 'none'
            },
            animation: {
                duration: 1000,
                easing: 'out'
            }
        };
        this.chart.draw(this.dataTable, options);
    },

    render: function() {
        return (
            <div>
                <header>
                    <h1>{ this.props.question.question }</h1>
                </header>
                <div className="results" id="chart">
                </div>
            </div>
        );
    }
});

export default BoardMultipleChoiceQuestion;