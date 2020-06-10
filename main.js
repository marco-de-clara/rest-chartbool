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
            // display monthly sales in a line chart
            printLineChart(monthly_sales);
            // printPieChart(monthlySales);
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

// function that displays monthly sales in a line chart
function printLineChart(object) {
    // get keys from object 
    var keys = Object.keys(object);
    // get values from object
    var values = Object.values(object);
    // print chart
    var ctx = $('#chart')[0].getContext('2d');
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