$(document).ready(function(){
    $('.copy-referral-link').click(function(){

        var clipboard = new ClipboardJS('.copy-referral-link');
        $('.copy-referral-link path').attr('fill-opacity', 1);

    });
});

function btn_save() {
    let value = $(".input_payment").val();

    if(!value) {
        alert("Введите данные!");
    }
    else {
        $.ajax({
            url: '/backend/client/referral_program/add_value.php',
            method: 'POST',
            dataType: 'html',
            data: {
                value:value,
            },
            success: function (data) {
                if(data === "save") {
                    location.reload();
                }
            }
        });
    }
}

function update_value() {
    let value = $(".h6_value").html();
    $(".div_value").empty();

    $(".div_value").append('<input value="'+value+'" type="text" class="input-price-seller mx-3 col-9 border-0 px-2 text-white input_payment">' +
        '<button class="btn bg-transparent border_blue btn_buy my-4 px-4 text-14 lh-1 text-white position-absolute bottom-0 btn_save" onclick="btn_save_update();">Сохранить</button>');
}

function btn_save_update() {
    let value = $(".input_payment").val();

    if(!value) {
        alert("Введите данные!");
    }
    else {
        $.ajax({
            url: '/backend/client/referral_program/update_value.php',
            method: 'POST',
            dataType: 'html',
            data: {
                value:value,
            },
            success: function (data) {
                console.log(data);
                if(data === "save") {
                    location.reload();
                }
            }
        });
    }

}