$(document).ready(function() {
    // ajax call to get data
    $.ajax ({
        'url' : 'http://157.230.17.132:4007/sales',
        'method' : 'GET',
        'success' : function(data) {
            // get sales from api
            var sales = data;
            // get monthly sales
            var monthly_sales = getMonthlySales(sales);
            // get sales per dealer
            var salesman_sales = getDealerSales(sales);
            // display monthly sales in a line chart
            printLineChart(monthly_sales);
            // display seller sales in a pie chart
            printPieChart(salesman_sales);
        },
        'error' : function() {
            console.log('Si è verificato un errore');
        }
    });
});

// function that gets monthly sales
function getMonthlySales(array) {
    // initialize object
    var monthlySales = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0
    };

    // for each object in the array get the sale amount and its month
    for(var i = 0; i < array.length; i++) {
        // get single selling
        var selling = array[i];
        // get amount of current selling
        var current_selling = selling.amount;
        // get month string from the date of the selling
        var month = moment(selling.date, "DD-MM-YYYY").format('MMMM');
        // add ammount to its month
        monthlySales[month] += current_selling;
    }
    return monthlySales;
}

// function that gets monthly sales
function getDealerSales(array) {
    // initialize object
    var dealerSales = {};

    // for each object in the array get the sale amount and its dealer
    for(var i = 0; i < array.length; i++) {
        // get single selling
        var selling = array[i];
        // get amount of current selling
        var current_selling = selling.amount;
        // get selling's dealer
        var dealer = selling.salesman;
        // check if the object has the dealer's key
        if(!dealerSales.hasOwnProperty(dealer)) {
            // add a new dealer and add ammount to its dealer
            dealerSales[dealer] = current_selling;
        } else {
            //add the amount to its dealer
            dealerSales[dealer] += current_selling;
        }
    }
    return dealerSales;
}

// function that displays monthly sales in a line chart
function printLineChart(object) {
    // get keys from object 
    var keys = Object.keys(object);
    // get values from object
    var values = Object.values(object);
    // print chart
    var ctx = $('#line-chart')[0].getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: keys,
            datasets: [{
                label: 'Monthly sales',
                data: values,
                backgroundColor: [
                    'rgba(37, 76, 140, 0.1)',
                ],
                borderColor: [
                    'rgba(37, 76, 140, 1)',
                ],
                borderWidth: 2,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Monthly sales'
            }
        }
    });
}

// function that displays each dealer's sales in a pie chart
function printPieChart(object) {
    // get keys from object 
    var keys = Object.keys(object);
    // get values from object
    var values = Object.values(object);
    // print chart
    var ctx = $('#pie-chart')[0].getContext('2d');
    var myLineChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: keys,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(66, 133, 244, 0.5)',
                    'rgba(219, 68, 55, 0.5)',
                    'rgba(244, 180, 0, 0.5)',
                    'rgba(15, 157, 88, 0.5)',
                ],
                borderColor: [
                    'rgba(66, 133, 244, 1)',
                    'rgba(219, 68, 55, 1)',
                    'rgba(244, 180, 0, 1)',
                    'rgba(15, 157, 88, 1)',
                ],
                borderWidth: 2,
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Dealers sales'
            }
        }
    });
}