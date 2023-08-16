//Подключение summernote на страницу
$('#summernote-description-shop').summernote({
    tabsize: 2,
    height: 200,
    placeholder: "Введите описание товара:",
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

$('#summernote-lower_description').summernote({
    tabsize: 2,
    height: 200,
    placeholder: "Введите нижнее описание товара:",
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

//Переключение между окнами создания описания Шопа
function switch_description_shop() {
    $(".span-summernote-description").removeClass('text-white').addClass('text-secondary');
    $(this).addClass('text-white');
    $('.summernote-description').addClass('d-none');
    $("."+$(this).attr('data-div')).removeClass('d-none');
}


//Функция сохранения данных Шопа
function save_date_shop() {

    let name = $('#name').val().trim();
    let heading = $('#heading').val().trim();
    let imgCover = $('#imgCover');
    let imgLogo = $('#imgLogo');
    let description_shop = $("#summernote-description-shop").summernote("code");
    let lower_description = $("#summernote-lower_description").summernote("code");

    $("#txt_description_shop").val($('#summernote-description-shop').summernote('code'));
    $("#txt_lower_description_shop").val($('#summernote-lower_description').summernote('code'));

    if(name !== ''){
        show_error_create_shop('#name', true);
        if(heading !== ''){
            show_error_create_shop('#heading', true);
            if(imgCover.val() != ''){
                show_error_create_shop('.div-imgCover', true);
                if(imgLogo.val() !== ''){
                    show_error_create_shop('.div-imgLogo', true);
                    $(this).attr("type", "submit");
                }
                else show_error_create_shop('.div-imgLogo', false);
            }
            else show_error_create_shop('.div-imgCover', false);
        }
        else show_error_create_shop('#heading', false);
    }
    else show_error_create_shop('#name', false);
}

//вывод ошибок или скрытие их при валидации
function show_error_create_shop(object, type) {
    if(type === true){
        $(object).addClass("border-0").removeClass("border border-colors border-2");
    }
    else $(object).addClass("border border-colors border-2").removeClass("border-0").focus();
}

function update_date_shop() {

    let name = $('#name').val().trim();
    let heading = $('#heading').val().trim();
    let imgCover = $('#imgCover');
    let imgLogo = $('#imgLogo');
    let description_shop = $("#summernote-description-shop").summernote("code");
    let lower_description = $("#summernote-lower_description").summernote("code");

    $("#txt_description_shop").val($('#summernote-description-shop').summernote('code'));
    $("#txt_lower_description_shop").val($('#summernote-lower_description').summernote('code'));

    if(name !== ''){
        show_error_create_shop('#name', true);
        if(heading !== ''){
            show_error_create_shop('#heading', true);
            $(this).attr("type", "submit");

        }
        else show_error_create_shop('#heading', false);
    }
    else show_error_create_shop('#name', false);
}

$('input[name=imgCover]').change(function(event) {
    let object = $('input[name=imgCover]');
    let file = object[0].files[0];
    let name = file.name;
    let type = file.name.split('.').pop();

    let spanIfo = $("#fileInfo_imgCover");

    if(type === "png" || type === "jpg" || type === "jpeg"){
        spanIfo.removeClass("text-danger").addClass("text-secondary").text(name);
        let tmppath = URL.createObjectURL(event.target.files[0]);
        $(".div_imgCover").css("background-image", "url("+tmppath+")");
    }
    else {
        spanIfo.removeClass("text-secondary").addClass("text-danger");
        spanIfo.text("Неверно расширение файла!");
        $(".div_imgCover")
            .css("background", "linear-gradient(270deg, #7E5195 1.21%, #47A38E 100%)");
        object.val("");
    }
    console.log(object.val());
});

$('input[name=imgLogo]').change(function(event) {
    let object = $('input[name=imgLogo]');
    let file = object[0].files[0];
    let name = file.name;
    let type = file.name.split('.').pop();

    let spanIfo = $("#fileInfo_imgLogo");

    if(type === "png" || type === "jpg" || type === "jpeg"){
        spanIfo.removeClass("text-danger").addClass("text-secondary").text(name);
        let tmppathlogo = URL.createObjectURL(event.target.files[0]);
        $(".img_div_imgLogo").css("background", "url("+tmppathlogo+") no-repeat center center").css('background-size', "cover");
    }
    else {
        spanIfo.removeClass("text-secondary").addClass("text-danger");
        spanIfo.text("Неверно расширение файла!");
        $(".img_div_imgLogo")
            .css("background", "url(\"/res/img/testImgLogo.svg\") no-repeat center center")
            .css('background-size', "cover");
        object.val("");
    }
});