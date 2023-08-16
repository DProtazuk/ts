$(".add-to-favorites").click(function () {
    let id_product = $(this).attr("data-id");

    $(".add-to-favorites").addClass("d-none");
    $(".delete-to-favorites").removeClass("d-none");

    $.ajax({
        url: "/backend/client/favorite.php",
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'add',
            id_product: id_product
        }
    });
});

$(".delete-to-favorites").click(function () {
    let id_product = $(this).attr("data-id");

    $(".delete-to-favorites").addClass("d-none");
    $(".add-to-favorites").removeClass("d-none");

    $.ajax({
        url: "/backend/client/favorite.php",
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'delete',
            id_product: id_product
        }
    });
});


function ChekInputAmount() {
    var value = $("#quantity").val();
    value = value.replace(/[^0-9]/g, '');

// Проверяем, является ли значение целым числом
    if (!Number.isInteger(parseFloat(value))) {
        // Если значение не является целым числом, удаляем последний символ
        value = value.slice(0, -1);

    }
    // Проверяем, является ли значение меньше 1
    if (parseFloat(value) < 1) {
        // Если значение меньше 1, устанавливаем значение 1
        value = 1;
    }
    СheckMax(value);


}

function СheckMax(value) {
    // Ограничиваем вводимое значение до 10
    let max = parseInt($("#max-quantity").val());
    if (value > max) {
        value = max;
    }
    // Обновляем значение поля ввода
    $("#quantity").val(value);

    let discount = $("#discount").val();

    let price = parseFloat($("#price").val());

    let amount = (price * value) - ((price * value) / 100) * discount;
    $(".span-amount").html(amount + " ₽");
}


function Purchase() {
    let quantity = $("#quantity").val();

    if ($.isEmptyObject(quantity)) {
        $(".h6-error").html("Введите колличество");
    } else {
        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        let id = searchParams.get('id');

        $.ajax({
            url: "/backend/client/order/add-order.php",
            method: 'POST',
            dataType: 'json',
            data: {
                quantity: quantity,
                id: id
            },
            success: function (data) {
                $(".h6-error").html("");

                    $("#quantity_modal_good").html(data['quantity'] + " шт.");
                    $("#amount_modal_good").html(data['amount'] + " ₽");
                    $("#id_order_good").html(data['id']);

                    $("#order").val(data['id']);

                    $('#ModalGoodOrder').modal('show');
                    $('#purchaseModal').modal('hide');

            },
            error: function (data) {
                console.log("asdad");
            }
        });
    }
}

$('body').on('click', '#ModalReviewButton', function () {
    $('#ModalReview').modal('show');
    $('#ModalGoodOrder').modal('hide');
});

$(document).ready(function () {
    $('.rate1').raty({
        click: function (score, evt) {
            if (score === 1) {
                $("#info_rating").html("Очень плохой товар");
            }
            if (score === 2) {
                $("#info_rating").html("Плохой товар");
            }
            if (score === 3) {
                $("#info_rating").html("Нормальный товар");
            }
            if (score === 4) {
                $("#info_rating").html("Хороший товар");
            }
            if (score === 5) {
                $("#info_rating").html("Очень хороший товар");
            }
        }
    });
});

$('body').on('click', '.svgAddImg', function () {
    $('#downImg').trigger('click');
});

$(document).ready(function () {
    $('#downImg').on('change', function (event) {
        let myArray = JSON.parse($('#arrayImg').val() || '[]');

        if (!$.isArray(myArray) || myArray.length > 9) {
            $(".text-error-down-image-count").removeClass("d-none");
        } else {

            $(".text-error-down-image-count").addClass("d-none");

            var selectedFile = event.target.files[0];
            var fileName = selectedFile.name;
            var fileExtension = fileName.split('.').pop().toLowerCase();

            var allowedExtensions = ['png', 'jpeg', 'jpg'];
            if ($.inArray(fileExtension, allowedExtensions) === -1) {
                $('#downImg').val('');
                $(".text-error-down-image").removeClass("d-none");
            } else {
                var formData = new FormData();
                formData.append('file', $('#downImg')[0].files[0]);

                $.ajax({
                    url: '/backend/client/reviews/down_img.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        $(".write-img").append('<div data-img="' + data + '" class="image-block col-2 my-3">\n' +
                            '                            <img src="/temp/' + data + '" class="rounded-2">\n' +
                            '                            <button data-img="' + data + '" class="close-button">&#10005;</button>\n' +
                            '                        </div>');

                        let myArray = JSON.parse($('#arrayImg').val() || '[]');

                        myArray.push(data);
                        $('#arrayImg').val(JSON.stringify(myArray));
                    },
                    error: function () {
                        console.log('Произошла ошибка при загрузке изображения');
                    }
                });

            }
        }

    });
});

$('body').on('click', '.image-block', function () {
    let img = $(this).attr("data-img");

    var path = "/temp/" + img; // Путь, который нужно добавить

    var url = window.location.origin + path;
    window.open(url, "_blank");
});
$('body').on('click', '.close-button', function (event) {
    event.stopPropagation();
    let img = $(this).attr("data-img");

    $.ajax({
        url: '/backend/client/reviews/delete_img.php',
        method: 'POST',
        dataType: 'html',
        data: {
            img: img,
        },
        success: function (data) {
            if (data === "Изображение успешно удалено.") {
                $('.image-block[data-img="' + img + '"]').remove();

                var myArray = JSON.parse($('#myArrayInput').val() || '[]');

                myArray = myArray.filter(function (element) {
                    return element !== searchTerm;
                });

                $('#arrayImg').val(JSON.stringify(myArray));

            }
        }
    });
});


function SendReviews(){
    let rating = $("input[name=score]").val();
    if(rating){

        let dignities = $('#dignities').val();
        let disadvantages = $('#disadvantages').val();
        let comment = $('#comment').val();
        let arrayImg = $('#arrayImg').val();

        let url = new URL(window.location.href);
        let searchParams = new URLSearchParams(url.search);
        let product_id = searchParams.get('id');

        let order = $("#order").val();


        $.ajax({
            url: '/backend/client/reviews/create_reviews.php',
            method: 'POST',
            dataType: 'json',
            data: {
                rating: rating,
                dignities: dignities,
                disadvantages: disadvantages,
                comment: comment,
                product_id: product_id,
                order: order,
                arrayImg: arrayImg
            },
            success: function (data) {
                if(data === "save") {
                    alert("Спасибо за отзыв!");
                    location.reload();
                }
            }
        });
    }
    else {
        alert("Поставьте оценку");
    }
}