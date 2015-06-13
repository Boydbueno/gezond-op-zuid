var BoardMultipleChoiceQuestion = React.createClass({

    chart: undefined,
    dataTable: undefined,
    chartOptions: {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'none'
        },
        vAxis: {
            textPosition: 'none',
            viewWindow: {
                min: 0,
                max: 100
            },
            ticks: [0, 25, 50, 75, 100],
            gridlines: {
                color: 'transparent'
            },
            baselineColor: 'transparent'
        },
        legend: {
            position: 'none'
        },
        animation: {
            duration: 1000,
            easing: 'out'
        }
    },

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
    },

    drawChart: function() {
        // Instantiate and draw our chart, passing in some options.
        this.chart = new google.visualization.ColumnChart(document.getElementById('chart'));
        this.chart.draw(this.dataTable, this.chartOptions);
    },

    updateChart: function() {
        this.chart.draw(this.dataTable, this.chartOptions);
    },

    render: function() {
        return (
            <div>
                <div className="results" id="chart">
                </div>
            </div>
        );
    }
});

export default BoardMultipleChoiceQuestion;