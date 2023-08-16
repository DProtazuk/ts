function write() {
    let id = $("#idShop").val();
    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'select_product', 'id': id},
        success: function (data) {
            console.log(data);
            $('.table_product').empty();

            data.forEach(function (array) {
                $(".table_product").append('<tr class="border-bottom border-secondary text-white text-opacity-75 tr_product_' + array['id'] + '">\n' +
                    '                                <td class="col-1 lh-lg py-4">' + array['id'] + '</td>\n' +
                    '                                <td class="col-3 lh-sm text-14">' + array['product'] + '</td>\n' +
                    '                                <td class="col-2 px-4">' + array['global_category'] + ' | ' + array['subcategories'] + '</td>\n' +
                    '                                <td class="col-1">' + array['quantity'] + ' шт.</td>\n' +
                    '                                <td class="col-1 text-center">' + array['price'] + 'р.</td>\n' +
                    '                                <td class="col-1 text-center">' +
                    parseFloat(array['price']) * parseFloat(array['quantity'])
                    + 'р.</td>\n' +
                    '                                <td class="col-1 text-center">0</td>\n' +
                    '                                <td class="col-2">\n' +
                    '                                    <div class="col-12 m-auto status_In_Progress d-flex justify-content-center align-items-center  my-2">\n' +
                    '                                        <button onclick="writeModal_lodaing.call(this)" data-bs-toggle="modal" data-bs-target="#loading_product"  data-id="' + array['id'] + '" class="col-2  border-none p-3 btn_down"></button>' +
                    '                                        <button data-count="" data-id="' + array['id'] + '" onclick="writeModal_down.call(this)" data-bs-toggle="modal" data-bs-target="#down_account"  class="col-2  border-none p-3 btn_upload"></button>\n' +
                    '\n' +
                    '                                        <a href="/page/seller/product/update_product.php?id=' + array['id'] + '">\n' +
                    '                                            <button class="col-2  border-none p-3 btn_update"></button>\n' +
                    '                                        </a>\n' +
                    '\n' +
                    '                                        <button onclick="writeModal_copy.call(this)"  data-bs-toggle="modal" data-bs-target="#copy_product" data-id="' + array['id'] + '" class="col-2  border-none p-3 btn_copy"></button>\n' +
                    '                                        <button onclick="writeModal_delete.call(this)" data-id="' + array['id'] + '" data-bs-toggle="modal" data-bs-target="#delete_product" class="col-2  border-none p-3 btn_del"></button>\n' +
                    '                                    </div>\n' +
                    '                                </td>\n' +
                    '                            </tr>');
            });
        }
    });
}


jQuery(($) => {
    $('.select_Gl_Cat').on('click', '.select__head_Gl_Cat', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head_Gl_Cat').removeClass('open');
            $('.select__list_Gl_Cat').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.select_Gl_Cat').on('click', '.select__item_Gl_Cat', function () {
        $('.select__head_Gl_Cat').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).attr('id'));
        let id = $(this).attr('id');

        write(id);
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select_Gl_Cat').length) {
            $('.select__head_Gl_Cat').removeClass('open');
            $('.select__list_Gl_Cat').fadeOut();
        }
    });
});

function writeModal_delete() {
    let idProduct = $(this).attr("data-id");

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'select_one_product', 'id': idProduct},
        success: function (data) {
            $(".del_product_id").text("ID " + data['id']);
            $(".del_product_name").text(data['name']);
            $(".del_product_quantity").text(data['quantity']);
            $(".del_product_price").text(data['price']);
            $(".button_modal_delete_product").attr('data-id', data['id']);
        }
    });
}

function delete_product() {
    let id = $(this).attr('data-id');

    $('.tr_product_' + id).remove();

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'delete_product', 'id': id},
    });
    statistics();
}

function writeModal_copy() {
    let idProduct = $(this).attr("data-id");

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'select_one_product', 'id': idProduct},
        success: function (data) {
            $(".copy_product_id").text("ID " + data['id']);
            $(".copy_product_name").text(data['name']);
            $(".copy_product_quantity").text(data['quantity']);
            $(".copy_product_price").text(data['price']);
            $(".button_copy_product").attr('data-id', data['id']);
        }
    });
}

function copy_product() {
    let id = $(this).attr('data-id');

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'copy_product', 'id': id},
        success: function (data){
            write();
        }
    });
}


function writeModal_lodaing() {
    let idProduct = $(this).attr("data-id");

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'select_one_product', 'id': idProduct},
        success: function (data) {
            $(".copy_product_id").text("ID " + data['id']);
            $(".copy_product_name").text(data['name']);
            $(".copy_product_quantity").text(data['quantity']);
            $(".copy_product_price").text(data['price']);
            $(".button_loading_modal").attr('data-id', data['id']);
        }
    });
}


function loading_product() {
    let idProduct = $(this).attr("data-id");
    let txt_loading = $("#txt_loading").val();

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'loading_product', 'id': idProduct, txt: txt_loading},
        success: function (data) {
            $('.quantity_h3').text(data[0]);
            $('.price_h3').text(data[1]);

            $("#txt_loading").val("");
            write();
        }
    });
}


function writeModal_down() {
    let idProduct = $(this).attr("data-id");

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'select_one_product', 'id': idProduct},
        success: function (data) {
            $(".down_product_id").text("ID " + data['id']);
            $(".down_product_name").text(data['name']);
            $(".down_product_quantity").text("В наличии "+data['quantity']+"шт.");
            $(".down_product_price").text("Цена  "+data['price']+"р.");
            $(".button_modal_down_product").attr('data-id', data['id']).attr('data-count', data['id']);
            $(".input_count_account").attr('data-count', data['quantity']);
        }
    });
}


function down_product() {
    let idProduct = $(this).attr("data-id");
    let num = $(".input_count_account").val();

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: "down_product",id: idProduct, num: num},
        success: function (data) {
            write();
            statistics();
            window.location.href = '/backend/seller/DownAccount.php?file='+data;
        }
    });
}

$(".input_count_account").on('input', function(e) {
    let count = parseFloat($(this).attr('data-count'));
    let value = parseFloat($(".input_count_account").val());
    console.log(value);

    if(value === 0){
        $(".button_modal_down_product").prop('disabled', true);
        $(".h6_error_down_account").text("Введите число:");
    }
    else {
        if(value > count){
            $(".button_modal_down_product").prop('disabled', true);
            $(".h6_error_down_account").text("Максимальной колличество: "+count);
        }
        else {
            if(!value){
                $(".button_modal_down_product").prop('disabled', true);
                $(".h6_error_down_account").text("Введите число: ");
            }
            else {
                $(".h6_error_down_account").text("");
                $(".button_modal_down_product").prop('disabled', false);
            }
        }
    }
});

function statistics(){
    $.ajax({
        url: '/backend/seller/product',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'StatisticsProduct'},
        success: function (data) {
            if(data["ProductQuantity"]){
                $('.quantity_h3').text(data["ProductQuantity"]);
            }
            else $('.quantity_h3').text("0");

            if(data["ProductAmount"]){
                $('.price_h3').text(data["ProductAmount"]);
            }
            else $('.price_h3').text("0");
        }
    });
}

write();


$(".input_search_product").on('input', function(e) {
    let value = $(".input_search_product").val();

    $.ajax({
        url: '/backend/seller/product.php',
        method: 'post',
        dataType: 'json',
        async: false,
        data: {action: 'search_product', like: value},
        success: function (data) {
            $('.table_product').empty();
            if(data){

                data.forEach(function (array) {
                    $(".table_product").append('<tr class="border-bottom border-secondary text-white text-opacity-75 tr_product_' + array['id'] + '">\n' +
                        '                                <td class="col-1 lh-lg py-4">' + array['id'] + '</td>\n' +
                        '                                <td class="col-3 lh-sm text-14">' + array['product'] + '</td>\n' +
                        '                                <td class="col-2 px-4">' + array['global_category'] + ' | ' + array['subcategories'] + '</td>\n' +
                        '                                <td class="col-1">' + array['quantity'] + ' шт.</td>\n' +
                        '                                <td class="col-1 text-center">' + array['price'] + 'р.</td>\n' +
                        '                                <td class="col-1 text-center">' +
                        parseFloat(array['price']) * parseFloat(array['quantity'])
                        + 'р.</td>\n' +
                        '                                <td class="col-1 text-center">0</td>\n' +
                        '                                <td class="col-2">\n' +
                        '                                    <div class="col-12 m-auto status_In_Progress d-flex justify-content-center align-items-center  my-2">\n' +
                        '                                        <button onclick="writeModal_lodaing.call(this)" data-bs-toggle="modal" data-bs-target="#loading_product"  data-id="' + array['id'] + '" class="col-2  border-none p-3 btn_down"></button>' +
                        '                                        <button data-count="" data-id="' + array['id'] + '" onclick="writeModal_down.call(this)" data-bs-toggle="modal" data-bs-target="#down_account"  class="col-2  border-none p-3 btn_upload"></button>\n' +
                        '\n' +
                        '                                        <a href="/view/seller/update-product.php?id=' + array['id'] + '">\n' +
                        '                                            <button class="col-2  border-none p-3 btn_update"></button>\n' +
                        '                                        </a>\n' +
                        '\n' +
                        '                                        <button onclick="writeModal_copy.call(this)"  data-bs-toggle="modal" data-bs-target="#copy_product" data-id="' + array['id'] + '" class="col-2  border-none p-3 btn_copy"></button>\n' +
                        '                                        <button onclick="writeModal_delete.call(this)" data-id="' + array['id'] + '" data-bs-toggle="modal" data-bs-target="#delete_product" class="col-2  border-none p-3 btn_del"></button>\n' +
                        '                                    </div>\n' +
                        '                                </td>\n' +
                        '                            </tr>');
                });
            }
        }
    });
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





        let id = $("#idShop").val();
        $.ajax({
            url: '/backend/seller/product.php',
            method: 'post',
            dataType: 'json',
            async: false,
            data: {action: 'select_product_category', 'id': id, 'category' : $(this).attr('id')},
            success: function (data) {

                $('.table_product').empty();

                data.forEach(function (array) {
                    $(".table_product").append('<tr class="border-bottom border-secondary text-white text-opacity-75 tr_product_' + array['id'] + '">\n' +
                        '                                <td class="col-1 lh-lg py-4">' + array['id'] + '</td>\n' +
                        '                                <td class="col-3 lh-sm text-14">' + array['product'] + '</td>\n' +
                        '                                <td class="col-2 px-4">' + array['global_category'] + ' | ' + array['subcategories'] + '</td>\n' +
                        '                                <td class="col-1">' + array['quantity'] + ' шт.</td>\n' +
                        '                                <td class="col-1 text-center">' + array['price'] + 'р.</td>\n' +
                        '                                <td class="col-1 text-center">' +
                        parseFloat(array['price']) * parseFloat(array['quantity'])
                        + 'р.</td>\n' +
                        '                                <td class="col-1 text-center">0</td>\n' +
                        '                                <td class="col-2">\n' +
                        '                                    <div class="col-12 m-auto status_In_Progress d-flex justify-content-center align-items-center  my-2">\n' +
                        '                                        <button onclick="writeModal_lodaing.call(this)" data-bs-toggle="modal" data-bs-target="#loading_product"  data-id="' + array['id'] + '" class="col-2  border-none p-3 btn_down"></button>' +
                        '                                        <button data-count="" data-id="' + array['id'] + '" onclick="writeModal_down.call(this)" data-bs-toggle="modal" data-bs-target="#down_account"  class="col-2  border-none p-3 btn_upload"></button>\n' +
                        '\n' +
                        '                                        <a href="/page/seller/product/update_product.php?id=' + array['id'] + '">\n' +
                        '                                            <button class="col-2  border-none p-3 btn_update"></button>\n' +
                        '                                        </a>\n' +
                        '\n' +
                        '                                        <button onclick="writeModal_copy.call(this)"  data-bs-toggle="modal" data-bs-target="#copy_product" data-id="' + array['id'] + '" class="col-2  border-none p-3 btn_copy"></button>\n' +
                        '                                        <button onclick="writeModal_delete.call(this)" data-id="' + array['id'] + '" data-bs-toggle="modal" data-bs-target="#delete_product" class="col-2  border-none p-3 btn_del"></button>\n' +
                        '                                    </div>\n' +
                        '                                </td>\n' +
                        '                            </tr>');
                });
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
