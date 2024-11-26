window.onload = function () {
    const dataPoints = [];
    let chart;

    // Fetch data from API
    function fetchData(startX, startY, length, callback) {
        $.getJSON(
            `https://canvasjs.com/services/data/datapoints.php?xstart=${startX}&ystart=${startY}&length=${length}&type=json`,
            function (data) {
                callback(data);
            }
        );
    }

    // Initialize Chart
    function initializeChart() {
        fetchData(1, 10, 10, function (data) {
            data.forEach((value) => {
                dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            });

            chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "light2",
                title: {
                    text: "API's is Fetching",
                    fontColor: "steelblue",
                    fontFamily: "sans-serif",
                },
                axisY: {
                    includeZero: false,
                },
                data: [
                    {
                        type: "line",
                        markerType: "circle",
                        markerColor: "green",
                        lineColor: "Red",
                        dataPoints: dataPoints,
                    },
                ],
            });

            chart.render();
            updateChart(); // Start live updates
        });
    }

    // Update Chart Periodically
    function updateChart() {
        const lastX = dataPoints.length + 1;
        const lastY = dataPoints[dataPoints.length - 1].y;

        fetchData(lastX, lastY, 1, function (data) {
            data.forEach((value) => {
                dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
            });
            chart.render();
            setTimeout(updateChart, 1000);
        });
    }

    // Insert a New Value
    function insertValue(x, y) {
        dataPoints.push({ x, y });
        chart.render();
    }

    // Pop the Oldest Value
    function popValue() {
        if (dataPoints.length > 0) {
            dataPoints.shift(); // Remove the first element
            chart.render();
        }
    }

    // Refresh Data on Button Click
    document
        .getElementById("refreshButton")
        .addEventListener("click", function () {
            const lastX = dataPoints.length + 1;
            const lastY = dataPoints[dataPoints.length - 1].y;

            fetchData(lastX, lastY, 5, function (data) {
                data.forEach((value) => {
                    dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
                });
                chart.render();
            });
        });

    // Example Buttons to Insert and Pop Values
    document
        .getElementById("insertButton")
        .addEventListener("click", function () {
            const newX = dataPoints.length + 1; // Example x value
            const newY = Math.floor(Math.random() * 100); // Random y value
            insertValue(newX, newY);
        });

    document
        .getElementById("popButton")
        .addEventListener("click", function () {
            popValue();
        });

    // Initialize the chart and fetch initial data
    initializeChart();
};
