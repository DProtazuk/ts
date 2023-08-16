$('#summernote').summernote({
    tabsize: 2,
    height: 200,
    toolbar: [
        ['style', ['style']],
        ['font', ['bold', 'underline', 'clear']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']]
    ]
});


//Селект с Глобальными категориями
jQuery(($) => {
    $('.selectGlCat').on('click', '.select__headGlCat', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__headGlCat').removeClass('open');
            $('.select__listGlCat').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.selectGlCat').on('click', '.select__itemGlCat', function () {
        $('.select__headGlCat').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).attr('id'));

        let id_global_categories = $(this).attr('id');

        $(".select__item_standardCat").empty();
        $(".left_parameters_category").empty();
        $(".right_parameters_category").empty();

        $(".select__head_Cat").text("Выбрать категорию");
        $(".select__input_Cat").val("");

        //Отрисовка в подкатегорию
        $.ajax({
            url: '/backend/seller/create_product.php',
            method: 'post',
            dataType: 'json',
            async: false,
            data: {action: 'select_category_end_parameters', 'id_GlCat': id_global_categories},
            success: function (data) {
                //Отрисовка подкатегорий в селект
                console.log(data[1]);
                data[0].forEach(function (entry) {
                    $(".select__list_Cat").append('<li id="' + entry['id'] + '" class="select__item select__item_Cat p-1">' + entry['name'] + '</li>');
                });

                //Отрисовка параметров категори
                for (let i = 0; i < data[1].length; i++) {
                    let div_position;
                    if (i < 10) {
                        div_position = ".left_parameters_category";
                    } else {
                        div_position = ".right_parameters_category";
                    }

                    let name_parameter = translit(data[1][i]['name']);

                    if (data[1][i]['type'] === "select") {

                        //Преобразование поля с строчным массивом в массив с элементами
                        let array_select_parameter = data[1][i]['mass'].slice(1, -1).split(',');

                        $(div_position).append('<div class="col-11 d-flex align-items-center text-14">' +
                            '<div class="col-5 text-white fw-bolder">' + data[1][i]['name'] + '</div>' +

                            '<div class="col-4">' +
                            '<div class="select_standard2 input-price-seller col-12">' +
                            '<input class="select__input_standard2" type="hidden" name="parameter_' + data[1][i]['id'] + '" id="category">' +
                            '<div class=" select__head_standard2 p-1 text-white px-2">Выбрать</div>' +
                            '<ul class="select__list_standard2 select__list_standard' + name_parameter + ' p-1 bg-opacity-50" style="display: none;">' +
                            '</ul>' +
                            '</div>' +
                            '</div>' +
                            '</div>');

                        array_select_parameter.forEach(function (array) {
                            array = array.slice(1, -1);
                            $('.select__list_standard' + name_parameter).append('<li id="' + array + '" data-input="select__input_standard2" class="select__item_standard2 p-1">' + array + '</li>');
                        });

                        select_active();
                    }

                    if (data[1][i]['type'] === "input") {
                        $(div_position).append('<div class="col-11 d-flex align-items-center mt-4 text-14">' +
                            '<div class="col-5 text-white fw-bolder">' + data[1][i]['name'] + '</div>' +

                            '<div class="col-4 d-flex align-items-center text-14">' +
                            '<input type="number" name="parameter_' + data[1][i]['id'] + '" id="" class="border-0 text-center px-1 input-price-seller text-white col-5">' +
                            '<h6 class="text-secondary m-auto mx-2 text-14">' + data[1][i]['mass'] + '</h6>' +
                            '</div>' +
                            '</div>');
                    }
                    if (data[1][i]['type'] === "checkbox") {
                        $(div_position).append('<div class="col-11 d-flex align-items-center mt-4 text-14">' +
                            '<div class="col-5 text-white fw-bolder">' + data[1][i]['name'] + '</div>' +

                            '<div class="col-4 d-flex align-items-center">' +
                            '<div data-img="img_' + data[1][i]['id'] + '" data-status="0" data-check="check_' + data[1][i]['id'] + '" class="input-price-seller cursor my-auto d-flex p-1" onclick="div_chek.call(this)">' +
                            '<img id="img_' + data[1][i]['id'] + '" class="col-10 m-auto opacity-0" src="/res/img/check.png">' +
                            '</div>' +
                            '<input name="parameter_' + data[1][i]['id'] + '" id="check_' + data[1][i]['id'] + '" type="checkbox" class="input-price-seller d-none">' +
                            '</div>' +
                            '</div>');
                    }
                    if (data[1][i]['type'] === "two_inputs") {

                        $(div_position).append('<div class="col-11">' +
                            '<div class="col-12 d-flex align-items-center mt-4 text-14">' +
                            '<div class="col-5 text-white fw-bolder">БМ</div>' +

                            '<div class="col-4 d-flex align-items-center">' +
                            '<input type="number" name="parameter_' + data[1][i]['id'] + '" id="" class="border-0 px-1 input-price-seller text-white col-4 text-center">' +
                            '<h6 data-active="0" data-block="two_inputs' + name_parameter + '" onclick="hover_two_inputs.call(this)" class="text-secondary m-auto mx-3 fs-4 cursor fw-bolder">+</h6>' +
                            '</div>' +
                            '</div>' +

                            '<div class="two_inputs' + name_parameter + ' d-none col-12 d-flex align-items-center mt-4 text-14">' +
                            '<div class="col-5 text-white fw-bolder">БМ</div>' +

                            '<div class="col-4 d-flex align-items-center">' +
                            '<input type="number" name="parameter_' + data[1][i]['id'] + '_1" id="" class="border-0 px-1 input-price-seller text-white col-4 text-center">' +
                            '</div>' +
                            '</div>' +
                            '</div>');
                    }
                }

            }
        });


    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.selectGlCat').length) {
            $('.select__headGlCat').removeClass('open');
            $('.select__listGlCat').fadeOut();
        }
    });
});


//Функция для перевода на транслит
function translit(word) {
    var answer = '';
    var converter = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',

        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
        'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
        'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '', 'Ы': 'Y', 'Ъ': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    for (var i = 0; i < word.length; ++i) {
        if (converter[word[i]] == undefined) {
            answer += word[i];
        } else {
            answer += converter[word[i]];
        }
    }

    return answer;
}


//Функция скрывать три меня на странице
function parameter_product() {
    $(".span_cr_red_product").removeClass("opacity-25").addClass(" opacity-25");
    $(this).removeClass("opacity-25");
    $(".update-product").removeClass("d-none").addClass("d-none");
    $("." + $(this).attr('data-block')).removeClass("d-none");
}

//Кнопка создания товара
function but_create_product() {
    let name = $('#name').val().trim();
    let imgCover = $('#imgCover');
    let global_category = $('#global_category').val().trim();
    let category = $('#category').val().trim();
    let price = $('#price').val().trim();
    let discount = $('#discount').val().trim();

    let description = $("#summernote").summernote("code");
    $("#txt_description_product").val(description);

    if (name !== '') {
        show_error_create_shop('#name', true);

        if (imgCover.val() !== '') {
            show_error_create_shop('.div-imgCover', true);

            if (global_category !== '') {
                show_error_create_shop('.div_GlobalCat', true);

                if (category !== '') {
                    show_error_create_shop('.div_Cat', true);

                    if (price !== '') {
                        if (price !== "0") {
                            show_error_create_shop('.div_price', true);
                            $(this).attr("type", "submit");
                        } else show_error_create_shop('.div_price', false);
                    } else show_error_create_shop('.div_price', false);
                } else show_error_create_shop('.div_Cat', false);

            } else show_error_create_shop('.div_GlobalCat', false);
        } else show_error_create_shop('.div-imgCover', false);
    } else show_error_create_shop('#name', false);
}

//вывод ошибок или скрытие их при валидации
function show_error_create_shop(object, type) {
    if (type === true) {
        $(object).addClass("border-0").removeClass("border border-colors border-2");
    } else $(object).addClass("border border-colors border-2").removeClass("border-0").focus();
}


//Отрисовка картинки
$('input[name=imgCover]').change(function (event) {
    let object = $('input[name=imgCover]');
    let file = object[0].files[0];
    let name = file.name;
    let type = file.name.split('.').pop();

    let spanIfo = $("#fileInfo_imgCover");

    if (type === "png" || type === "jpg" || type === "jpeg") {
        spanIfo.removeClass("text-danger").addClass("text-secondary").text(name);
        let tmppath = URL.createObjectURL(event.target.files[0]);
        $(".img_div_imgLogo").css("background-image", "url(" + tmppath + ")").addClass("rounded-2");
    } else {
        spanIfo.removeClass("text-secondary").addClass("text-danger");
        spanIfo.text("Неверно расширение файла!");
        $(".img_div_imgLogo")
            .css("background", "url(\"/res/img/testImgProduct.svg\") no-repeat center center").removeClass("rounded-2");
        object.val("");
    }
    console.log(object.val());
});


//чехбокс параметра с типов чекбокс
function div_chek() {
    if ($(this).attr("data-status") === "0") {
        $("#" + $(this).attr("data-img")).removeClass("opacity-0");
        $(this).attr("data-status", 1);
        $("#" + $(this).attr("data-check")).prop('checked', true);
    } else {
        $("#" + $(this).attr("data-img")).addClass("opacity-0");
        $(this).attr("data-status", 0);
        $("#" + $(this).attr("data-check")).prop('checked', false);
    }
}

//функция открытия параметра два инпута
function hover_two_inputs() {
    if ($(this).attr('data-active') === "0") {
        $(this).text("-");
        $(this).attr('data-active', 1);
        $('.' + $(this).attr('data-block')).removeClass("d-none");
    } else {
        $(this).text("+");
        $(this).attr('data-active', 0);
        $('.' + $(this).attr('data-block')).addClass("d-none");
    }

}


//На категорию
jQuery(($) => {
    $('.select_Cat').on('click', '.select__head_Cat', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head_Cat').removeClass('open');
            $('.select__list_Cat').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.select_Cat').on('click', '.select__item_Cat', function () {
        $('.select__head_Cat').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).attr('id'));

    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select_Cat').length) {
            $('.select__head_Cat').removeClass('open');
            $('.select__list_Cat').fadeOut();
        }
    });
});


function select_active() {
    $('.select_standard2').on('click', '.select__head_standard2', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head_standard2').removeClass('open');
            $('.select__list_standard2').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.select_standard2').on('click', '.select__item_standard2', function () {
        $('.select__head_standard2').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $("." + $(this).attr("data-input")).val($(this).attr('id'))
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select_standard2').length) {
            $('.select__head_standard2').removeClass('open');
            $('.select__list_standard2').fadeOut();
        }
    });
}

$(document).on('input', '.price_input', function () {
    let value = parseInt($(".price_input").val(), 10);
    $(".price_input").val(value);

    if (value !== 0) {
        $(".div_discount").removeClass("d-none");

        let cost = parseInt($(".price_input").val(), 10);
        let discount = parseInt($("#discount").val(), 10);
        $("#discount").val(discount);

        let discountAmount = cost * (discount / 100); // расчет скидки в процентах
        let totalCost = parseInt(cost - discountAmount);

        if (totalCost) {
            $(".discount_span").text(totalCost);
        } else {
            $(".discount_span").text("");
        }
    }
    if (!$(".price_input").val()) {
        $(".div_discount").addClass("d-none");
    }
});

$(document).on('input', '#discount', function () {
    let cost = parseInt($(".price_input").val(), 10);
    let discount = parseInt($("#discount").val(), 10);
    $("#discount").val(discount);

    let discountAmount = cost * (discount / 100); // расчет скидки в процентах
    let totalCost = parseInt(cost - discountAmount);

    if (totalCost) {
        $(".discount_span").text(totalCost);
    } else {
        $(".discount_span").text("");
    }
});
