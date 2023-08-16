
//Генерация цветов
function rand_color() {
    const array = ['#95A4FC', '#BAEDBD', '#C6C7F8', '#B1E3FF'];
    const random = Math.floor(Math.random() * array.length);
    return array[random];
}

function create_color(num) {
    let array = [];
    for (let i = 0; i < num; i++) {
        let color = rand_color();
        if (i === 0) {
            array.push(color);
        } else {
            if (color === array[i - 1]) {
                i = --i;
            } else {
                array.push(color);
            }
        }
    }
    return array;
}


//генерация чисел
function getRandomInt(min, max, num) {
    function rand(min, max) {
        return Math.floor(Math.random() * (min - max)) + max;
    }

    let arrayRand_num = [];

    for (let i = 0; i < num; i++) {
        arrayRand_num.push(rand(min, max, num));
    }
    return arrayRand_num;
}


//Разделение числа на разряды
var thousandSeparator = function(str) {
    var parts = (str + '').split('.'),
        main = parts[0],
        len = main.length,
        output = '',
        i = len - 1;

    while(i >= 0) {
        output = main.charAt(i) + output;
        if ((len - i) % 3 === 0 && i > 0) {
            output = ',' + output;
        }
        --i;
    }

    // if (parts.length > 1) {
    //     output += '.' + parts[1];
    // }
    return output;
};



////////////////////////////////////////////////////////////
//Построение LineChart
//За неделю
function LineChart_week() {
    let labels_LineChart_week = [null, "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", null];
    let id_LineChart_week = "LineChart_week";

    let label1_LineChart_week = "Текущая";
    let label1_color_LineChart_week = "#47A38E";
    let label1_data_LineChart_week = getRandomInt(300, 500, 9);

    let label2_LineChart_week = "Предыдущая";
    let label2_color_LineChart_week = "#7E5195";
    let label2_data_LineChart_week = getRandomInt(400, 800, 9);

    LineChart(labels_LineChart_week, id_LineChart_week, label1_LineChart_week, label1_color_LineChart_week, label1_data_LineChart_week, label2_LineChart_week, label2_color_LineChart_week, label2_data_LineChart_week);
}

//За месяц
function LineChart_month() {
    let labels_LineChart_month = [null, 1,3,6,9,12,15,18,21,24,27,31, null];
    let id_LineChart_month = "LineChart_month";

    let label1_LineChart_month = "Текущая";
    let label1_color_LineChart_month = "#47A38E";
    let label1_data_LineChart_month = getRandomInt(300, 1200, 13);

    let label2_LineChart_month = "Предыдущая";
    let label2_color_LineChart_month = "#7E5195";
    let label2_data_LineChart_month = getRandomInt(300, 1000, 13);

    LineChart(labels_LineChart_month, id_LineChart_month, label1_LineChart_month, label1_color_LineChart_month, label1_data_LineChart_month, label2_LineChart_month, label2_color_LineChart_month, label2_data_LineChart_month);
}

//За год
function LineChart_year() {
    let labels_LineChart_year = [null, 'Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct', 'Nov', 'Dec', null];
    let id_LineChart_year = "LineChart_year";

    let label1_LineChart_year = "Текущая";
    let label1_color_LineChart_year = "#47A38E";
    let label1_data_LineChart_year = getRandomInt(300, 1200, 14);

    let label2_LineChart_year = "Предыдущая";
    let label2_color_LineChart_year = "#7E5195";
    let label2_data_LineChart_year = getRandomInt(300, 1000, 14);

    LineChart(labels_LineChart_year, id_LineChart_year, label1_LineChart_year, label1_color_LineChart_year, label1_data_LineChart_year, label2_LineChart_year, label2_color_LineChart_year, label2_data_LineChart_year);
}


function LineChart(labels_LineChart, id_LineChart, label1_LineChart, label1_color_LineChart, label1_data_LineChart, label2_LineChart, label2_color_LineChart, label2_data_LineChart){
    const multipleLineChart = document.getElementById(id_LineChart).getContext('2d');
    const myMultipleLineChart = new Chart(multipleLineChart, {
        type: 'line',
        data: {
            labels: labels_LineChart,
            datasets: [{
                label: label1_LineChart,
                showLabelBackdrop: true,
                borderColor: label1_color_LineChart,
                pointBackgroundColor: label1_color_LineChart,
                pointBorderWidth: 1,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 5,
                pointRadius: 3,
                backgroundColor: 'transparent',
                fill: true,
                borderWidth: 2,
                data: label1_data_LineChart
            }, {
                label: label2_LineChart,
                showLabelBackdrop: true,
                borderColor: label2_color_LineChart,
                pointBackgroundColor: label2_color_LineChart,
                pointBorderWidth: 1,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 5,
                pointRadius: 3,
                backgroundColor: 'transparent',
                fill: true,
                borderWidth: 2,
                data: label2_data_LineChart
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            },
            layout: {
                padding: 15
            }
        }
    });
}



////////////////////////////////////////////////////////////
//Построение barChart
//Кол-во продаж по категориям

function barChart_Number_of_sales_by_category() {
    let labels_barChart_Number_of_sales_by_category = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let id_barChart_Number_of_sales_by_category = "barChart_Number_of_sales_by_category";

    let data_barChart_Number_of_sales_by_category = [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4];
    let colors = this.create_color('12');
    barChart(id_barChart_Number_of_sales_by_category, labels_barChart_Number_of_sales_by_category, colors, data_barChart_Number_of_sales_by_category);
}


    function barChart(id, labels, colors, data) {
        const ctx = document.getElementById(id).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderRadius: 10,
                    categoryPercentage: 0.7,
                }]
            },
            options: {
                layout: {
                    autoPadding: false,
                    padding:10
                },
                labels: {
                    padding: 2,
                    categoryPercentage: 0.5,
                    barPercentage:1,
                },
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    xAxes: [{
                        ticks: {
                            display: false //this will remove only the label
                        }
                    }]
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }