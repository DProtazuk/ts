$(document).ready(function () {
    write();
});

function write() {
    let start_data = $("#start_data").val();
    let finish_data = $("#finish_data").val();
    let input_search_orders = $(".input_search_orders").val();

    $.ajax({
        url: "/backend/client/order/select_order.php",
        method: 'POST',
        dataType: 'json',
        data: {
            start_data: start_data,
            finish_data: finish_data,
            search: input_search_orders
        },
        success: function (data) {
            $(".table_orders").empty();
            $(".table_orders").append('<tr class="border-bottom border-secondary text-secondary text-12 fw-bolder">\n' +
                '                            <td class="col-1 lh-lg">Ордер</td>\n' +
                '                            <td class="col-1 lh-lg">Дата</td>\n' +
                '                            <td class="col-6">Наименование</td>\n' +
                '                            <td class="col-5">\n' +
                '                                <div class="col-12 d-flex justify-content-between">\n' +
                '                                    <div class="col-4">Категория</div>\n' +
                '                                    <div class="col-3">Кол-во</div>\n' +
                '                                    <div class="col-2">Сумма</div>\n' +
                '                                    <div class="col-3"></div>\n' +
                '                                </div>\n' +
                '                            </td>\n' +
                '                        </tr>');


            data.forEach(function (array) {
                var dateParts = array['data'].split("-");
                var reversedDate = dateParts.reverse();
                var newDate = reversedDate.join(".");

                $(".table_orders").append('<tr class="text-white border border-0 border-bottom border-secondary text-14 Regular" style="">\n' +
                    '                            <td class="col-1">\n' +
                    '                                <div class="col-12">'+array['id']+'\n' +
                    '                                    <span class="opacity-0">fdgdfg</span>\n' +
                    '                                </div>\n' +
                    '                            </td>\n' +
                    '                            <td class="col-1">\n' +
                    '                                <div class="col-12">\n' +
                    '                                    '+newDate+'\n' +
                    '                                </div>\n' +
                    '                            </td>\n' +
                    '\n' +
                    '                            <td class="col-6">\n' +
                    '                                <div class="col-11">'+array['name']+'</div>\n' +
                    '                            </td>\n' +
                    '\n' +
                    '                            <td class="col-5">\n' +
                    '                                <div class="col-12 d-flex justify-content-between">\n' +
                    '                                    <div class="col-4 my-auto">\n' +
                    '                                        '+array['global_categories']+' <br> '+array['subcategories']+'\n' +
                    '                                    </div>\n' +
                    '                                    <div class="col-3 my-auto">\n' +
                    '                                        '+array['quantity']+' шт.\n' +
                    '                                        <span class="opacity-0">fdgdfg</span>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="col-2 my-auto">\n' +
                    '                                        '+array['amount']+' ₽\n' +
                    '                                        <span class="opacity-0">fdgdfg</span>\n' +
                    '                                    </div>\n' +
                    '\n' +
                    '                                    <div class="col-3 py-4">\n' +
                    '\n' +
                    '                                        <svg class="border-1 my-auto rounded-1 border_blue mx-2"  width="23" height="23" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '                                            <path d="M17.7781 7.39956V3.83706C17.7781 3.50914 17.511 3.24331 17.1816 3.24331C16.8522 3.24331 16.5852 3.50914 16.5852 3.83706V6.80581H13.6028C13.2734 6.80581 13.0064 7.07164 13.0064 7.39956C13.0064 7.72748 13.2734 7.99331 13.6028 7.99331H17.1816C17.511 7.99331 17.7781 7.72748 17.7781 7.39956Z" fill="white"/>\n' +
                    '                                            <path d="M16.7604 7.82011C16.8723 7.93108 17.0237 7.99331 17.1816 7.99331L17.1825 7.9934C17.3407 7.99317 17.4923 7.93039 17.604 7.81887C17.7154 7.70758 17.7781 7.55673 17.7781 7.39956L17.778 7.39877C17.7778 7.2413 17.7147 7.09037 17.6027 6.97919L15.0678 4.46317C14.0628 3.46131 12.7478 2.91852 12.7478 2.91852C11.4327 2.37573 10.0091 2.37573 10.0091 2.37573C8.58555 2.37573 7.27051 2.91852 7.27051 2.91852C5.95549 3.46131 4.94959 4.46409 4.94959 4.46409C4.83792 4.57542 4.77519 4.72631 4.77519 4.88363C4.77531 5.04111 4.83826 5.19252 4.9502 5.30378C5.06203 5.41495 5.21361 5.47738 5.37166 5.47738C5.52985 5.47727 5.68195 5.4146 5.79372 5.30317C6.6318 4.46769 7.72743 4.01546 7.72743 4.01546C8.82306 3.56323 10.0091 3.56323 10.0091 3.56323C11.1952 3.56323 12.2909 4.01546 12.2909 4.01546C13.3865 4.46769 14.2255 5.3041 14.2255 5.3041L16.7604 7.82011Z" fill="white"/>\n' +
                    '                                            <path d="M2.24023 11.6005V15.163C2.24023 15.4909 2.50728 15.7567 2.8367 15.7567C3.16611 15.7567 3.43316 15.4909 3.43316 15.163V12.1942H6.41546C6.74488 12.1942 7.01192 11.9284 7.01192 11.6005C7.01192 11.2725 6.74488 11.0067 6.41546 11.0067H2.8367C2.50728 11.0067 2.24023 11.2725 2.24023 11.6005Z" fill="white"/>\n' +
                    '                                            <path d="M5.7928 13.696L3.25784 11.18C3.14603 11.069 2.99458 11.0067 2.8367 11.0067L2.83582 11.0067C2.67763 11.0069 2.52601 11.0697 2.41431 11.1812C2.30283 11.2925 2.24023 11.4433 2.24023 11.6005L2.24024 11.6013C2.24047 11.7588 2.30353 11.9097 2.41556 12.0209L4.95052 14.5369C5.95549 15.5388 7.27052 16.0816 7.27052 16.0816C8.58555 16.6244 10.0091 16.6244 10.0091 16.6244C11.4327 16.6244 12.7478 16.0816 12.7478 16.0816C14.0628 15.5388 15.0687 14.536 15.0687 14.536C15.1804 14.4247 15.2431 14.2738 15.2431 14.1165C15.243 13.959 15.18 13.8076 15.0681 13.6963C14.9562 13.5852 14.8047 13.5227 14.6466 13.5227C14.4884 13.5228 14.3363 13.5855 14.2246 13.6969C13.3865 14.5324 12.2909 14.9846 12.2909 14.9846C11.1952 15.4369 10.0091 15.4369 10.0091 15.4369C8.82306 15.4369 7.72743 14.9846 7.72743 14.9846C6.6318 14.5324 5.7928 13.696 5.7928 13.696Z" fill="white"/>\n' +
                    '                                        </svg>\n' +
                    '\n' +
                    '                                        <svg class="border-1 my-auto rounded-1 border_blue" width="23" height="23" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                    '                                            <path d="M9.87145 2.96875V16.0312C9.87145 16.3592 10.1381 16.625 10.4671 16.625C10.796 16.625 11.0627 16.3592 11.0627 16.0312V2.96875C11.0627 2.64083 10.796 2.375 10.4671 2.375C10.1381 2.375 9.87145 2.64083 9.87145 2.96875Z" fill="white"/>\n' +
                    '                                            <path d="M10.8883 16.4511L16.249 11.1073C16.3607 10.996 16.4234 10.845 16.4234 10.6875C16.4234 10.53 16.3607 10.379 16.249 10.2677C16.1373 10.1563 15.9858 10.0938 15.8278 10.0938C15.6698 10.0938 15.5183 10.1563 15.4066 10.2677L10.4671 15.1916L5.52755 10.2677C5.41585 10.1563 5.26435 10.0938 5.10638 10.0938C4.9484 10.0938 4.7969 10.1563 4.6852 10.2677C4.5735 10.379 4.51074 10.53 4.51074 10.6875C4.51074 10.845 4.5735 10.996 4.6852 11.1073L10.0459 16.4511C10.2785 16.683 10.6556 16.683 10.8883 16.4511Z" fill="white"/>\n' +
                    '                                        </svg>\n' +
                    '\n' +
                    '                                        <span class="opacity-0">fdgdfg</span>\n' +
                    '\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </td>\n' +
                    '                        </tr>');
            });
            console.log(data);
        }
    });
}

$(".input-data").change( function () {
    write();
});

$(".input_search_orders").on("input", function () {
    write();
});