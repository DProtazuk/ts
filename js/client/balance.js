$(".img-payment-method").click( function (){
    $(".img-payment-method").removeClass("border_blue_2");
    $(this).addClass("border_blue_2");

    $(".input_payment_method").val("1");
});

$(".but_amount").click( function (){
    $(".input-payment-amount").val($(this).attr("data-amount"));
});

$('input[type="number"]').on('input', function(){
    // Получаем значение поля
    var value = $(this).val();
    // Проверяем, является ли значение целым числом
    if(!Number.isInteger(parseFloat(value))){
        // Если значение не является целым числом, удаляем последний символ
        $(this).val(value.slice(0, -1));
    }
    // Проверяем, является ли значение меньше 1
    if(parseFloat(value) < 1){
        // Если значение меньше 1, устанавливаем значение 1
        $(this).val(1);
    }
});

$(".button-top-up").click( function () {
    let input_payment_method = $(".input_payment_method").val();

    if(input_payment_method !== ""){
        let input = $('#amount').val();

        if(input !== ''){
            $('#ButtonSend').attr('type', 'submit');
        }
        else {
            $('#amount').focus();
            alert("Введите сумму");
        }
    }
    else alert("Выберите метод оплаты");
});

$(".span_coming").click( function () {
    let finishDate = new Date();
    finishDate = finishDate.getFullYear() + '-' + ('0' + (finishDate.getMonth() + 1)).slice(-2) + '-' + ('0' + finishDate.getDate()).slice(-2);
    $('.data-finish').val(finishDate);

    let startDate = new Date();  // текущая дата
    startDate.setMonth(startDate.getMonth() - 1);  // отнять один месяц
    startDate = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);
    $('.data-start').val(startDate);


    $(".span_coming").addClass("text-white").removeClass("text-secondary fw-bolder");
    $(".span_orders").removeClass("text-white").addClass("text-secondary fw-bolder");

    $(".table_coming").removeClass("d-none");
    $(".table_orders").addClass("d-none");

    $(".type_table").val("coming");

    write_table();
});


$(".span_orders").click( function () {
    let finishDate = new Date();
    finishDate = finishDate.getFullYear() + '-' + ('0' + (finishDate.getMonth() + 1)).slice(-2) + '-' + ('0' + finishDate.getDate()).slice(-2);
    $('.data-finish').val(finishDate);

    let startDate = new Date();  // текущая дата
    startDate.setMonth(startDate.getMonth() - 1);  // отнять один месяц
    startDate = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2);
    $('.data-start').val(startDate);


    $(".span_orders").addClass("text-white").removeClass("text-secondary fw-bolder");
    $(".span_coming").removeClass("text-white").addClass("text-secondary fw-bolder");

    $(".table_coming").addClass("d-none");
    $(".table_orders").removeClass("d-none");

    $(".type_table").val("orders");

    write_table();
});

function write_table() {
    let start = $('.data-start').val();
    let finish = $('.data-finish').val();
    let type = $(".type_table").val();

    $.ajax({
        url: "/backend/client/balance/balance_history.php",
        method: 'POST',
        dataType: 'json',
        data: {
            start: start,
            finish: finish,
            type: type
        },
        success: function (data) {
            console.log(data);
            let action = $(".table_"+type);
            action.empty();

            action.append('<tr class="border-bottom border-secondary text-secondary text-12 fw-bolder">\n' +
                '                            <td class="col-2 lh-lg">Дата</td>\n' +
                '                            <td class="col-6">Платежные данные</td>\n' +
                '                            <td class="col-2">Сумма</td>\n' +
                '                            <td class="col-2">Исполнение</td>\n' +
                '                        </tr>');

            data.forEach(function (array) {
                if (array['name'] === "Completed"){
                    action.append('<tr class="text-white Regular" style="font-weight: 400; font-size: 14px; line-height: 20px;">\n' +
                        '                            <td class="col-2 lh-lg">'+array['data']+'</td>\n' +
                        '                            <td class="col-6">'+array['payment_details']+'</td>\n' +
                        '                            <td class="col-2">'+array['amount']+'</td>\n' +
                        '                            <td class="col-2">\n' +
                        '                                <div class="col-12 mx-auto d-flex justify-content-start align-items-center py-3">\n' +
                        '                                    <div class="rounded-circle" style="width: 6px; height: 6px; background: #A1E3CB;">\n' +
                        '\n' +
                        '                                    </div>\n' +
                        '\n' +
                        '                                    <span class="text-12 mx-2" style="color: #A1E3CB;">Completed</span>\n' +
                        '                                </div>\n' +
                        '                            </td>\n' +
                        '\n' +
                        '                        </tr>');
                }
                if(array['name'] === "In Progress") {
                    action.append('<tr class="text-white Regular" style="font-weight: 400; font-size: 14px; line-height: 20px;">\n' +
                        '                            <td class="col-2 lh-lg">'+array['data']+'</td>\n' +
                        '                            <td class="col-6">'+array['payment_details']+'</td>\n' +
                        '                            <td class="col-2">'+array['amount']+'</td>\n' +
                        '                            <td class="col-2">\n' +
                        '                                <div class="col-12 mx-auto d-flex justify-content-start align-items-center py-3">\n' +
                        '                                    <div class="rounded-circle" style="width: 6px; height: 6px; background: #95A4FC;">\n' +
                        '\n' +
                        '                                    </div>\n' +
                        '\n' +
                        '                                    <span class="text-12 mx-2" style="color: #95A4FC;">In Progress</span>\n' +
                        '                                </div>\n' +
                        '                            </td>\n' +
                        '\n' +
                        '                        </tr>');
                }
                action.append("");
            });
        }
    });
}

$(document).ready(function () {
    write_table();
});

$(".input-data").change( function () {
    write_table();
});