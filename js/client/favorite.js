jQuery(($) => {
    $('.select_Filter_favorite').on('click', '.select__head_Filter_favorite', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head_Filter_favorite').removeClass('open');
            $('.select__list_Filter_favorite').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.select_Filter_favorite').on('click', '.select__item_Filter_favorite', function () {
        $('.select__head_Filter_favorite').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).attr('id'));

        WriteProductEndPagination();
        $(".ShowMore").removeClass("d-none");
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select_Filter_favorite').length) {
            $('.select__head_Filter_favorite').removeClass('open');
            $('.select__list_Filter_favorite').fadeOut();
        }
    });
});


$('body').on('mouseover', '.div-product', function () {
    $(this).css("min-height", "329px");
    $(this).css("max-height", "329px");

    $(this).find(".div-product-description").css("margin-top", "97px");

    $(this).find(".div_none").css("height", "73px");
    $(this).find(".div-product-h6").css("max-height", "50px");
    $(this).find(".div-product-h6").css("overflow", "hidden");

    $(this).find(".div-product-img .div-product-img-img").css("transform", "scale(1.3)");
    $(this).find(".div-product-description").css("background", "#343434");
})
    .on('mouseout', '.div-product', function () {
        $(this).css("min-height", "314px");
        $(this).css("max-height", "314px");

        $(this).find(".div_none").css("height", "88px");

        $(this).find(".div-product-description").css("margin-top", "82px");
        $(this).find(".div-product-h6").css("max-height", "35px");
        $(this).find(".div-product-h6").css("overflow", "hidden");

        $(this).find(".div-product-img img").css("transform", "scale(1)");
        $(this).find(".div-product-description").css("background", "transparent");
    });


function WriteProductEndPagination() {

    let page = $("#page").val();
    let input_search_product = $(".input_search_product").val();
    let select__input_Filter_favorite = $(".select__input_Filter_favorite").val();
    $.ajax({
        url: "/backend/client/favorite.php",
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'filter_favorite',
            page: page,
            search: input_search_product,
            filter: select__input_Filter_favorite
        },
        success: function (data) {
            PaginationRendering(data['count'], page);
            PrintProduct(data);
        }
    });
}



function ShowMoreProduct(){
    let page = parseInt($("#page").val())+1;
    let input_search_product = $(".input_search_product").val();
    let select__input_Filter_favorite = $(".select__input_Filter_favorite").val();

    $.ajax({
        url: "/backend/client/favorite.php",
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'filter_favorite',
            page: page,
            search: input_search_product,
            filter: select__input_Filter_favorite
        },
        success: function (data) {
            let type = $(".display_type").val();
            $(".ShowMore").addClass("d-none");

            if (type === "table_spisok") {
                data['data'].forEach(function (array) {
                    table_spisok(array);
                });
            } else {
                data['data'].forEach(function (array) {
                    table_table(array);
                });
            }
        }
    });
}

$(document).ready(function () {
    WriteProductEndPagination();
});


$(".svg_spisok").click(function () {
    $(".div_print_product").addClass('opacity-0');
    $(this).removeClass('opacity-50');
    $(".svg_table").addClass('opacity-50');

    $(".display_type").val("table_spisok");
    $(".div_print_product").removeClass("d-flex", "flex-wrap");
    $('.div_print_product').css('gap', '0%');

    WriteProductEndPagination();
    $(".div_print_product").removeClass('opacity-0');
});

$(".svg_table").click(function () {
    $(".div_print_product").addClass('opacity-0');

    $(this).removeClass('opacity-50');
    $(".svg_spisok").addClass('opacity-50');

    $(".display_type").val("table_table");
    $(".div_print_product").addClass("d-flex flex-wrap");
    $('.div_print_product').css('gap', '4%');

    WriteProductEndPagination();
    $(".div_print_product").removeClass('opacity-0');

});

function PrintProduct(array) {
    let type = $(".display_type").val();
    $(".div_print_product").empty();

    if (type === "table_spisok") {
        array['data'].forEach(function (array) {
            table_spisok(array);
        });
    } else {
        array['data'].forEach(function (array) {
            table_table(array);
        });
    }
}

function PaginationRendering(items, currentPage) {
    let options = {
        items: items,
        itemsOnPage: 4,
        currentPage: currentPage,
        prevText: "<",
        nextText: ">",
        displayedPages: 4,
        edges: 1,

        onPageClick: function (pageNumber, event) {
            $("#page").val(pageNumber);
            event.preventDefault();
            // обработчик клика на страницу
            WriteProductEndPagination();
            let totalPages = $('#pagination-container').pagination('getPagesCount');
            if (pageNumber === totalPages) {
                $(".ShowMore").addClass("d-none");
            } else {
                $(".ShowMore").removeClass("d-none");
            }
        }
    };

    $('#pagination-container').empty().pagination(options);
}



function table_spisok(array) {
    $(".div_print_product").append("<div class=\"text-decoration-none text-white col-12 d-flex justify-content-between  border border-0 border-bottom border-secondary my-2 py-3 border-opacity-50\">\n" +
        "                            <div class=\"col-1\">\n" +
        "                                <div class=\"col-12\">\n" +
        "                                    <div class=\"col-12 position-relative my-auto\">\n" +
        "                                        <img style=\"height:70px; object-fit: cover;\" class=\"col-12 rounded-4\" src=\"/res/img/imgProducts/" + array['product_cover'] + "\">\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                            <div class=\"col-11 d-flex flex-column Regular\">\n" +
        "                                <div class=\"col-12 d-flex justify-content-between mx-auto\">\n" +
        "                                    <div class=\"px-3\"></div>\n" +
        "                                    <a href=\"/page/client/product/product?id=" + array['product_id'] + "\" class=\"col-8 text-white text-14 text-decoration-none\">" + array['product_name'] + "</a>\n" +
        "                                    <span class=\"text-14 col-2 px-4\">Кол-во <span> " + array['quantity'] + "</span> шт.</span>\n" +
        "                                    <div class=\"col-2 d-flex\">\n" +
        "                                        <div class=\"col-8 mx-auto\">\n" +
        "                                            <button class=\"col-12 rounded-3 bg_blue border-0 text-white\">\n" +
        "                                                Купить\n" +
        "                                            </button>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                                <div class=\"col-12 d-flex justify-content-between my-2 mx-auto\">\n" +
        "                                   <div class=\"px-3\"></div>\n" +
        "                            <div class='col-8 d-flex'> " +
        "<h6 class=\"text-15 my-auto\">Магазин</h6> " +
        "<a href=\"/page/client/shop/shop?id=" + array['shop_id'] + "\" class=\"text_blue text-decoration-none Medium my-auto mx-2\">" + array['shop_name'] + "</a><" +
        "/div>" +
        "                                    <span class=\"text-14 d-block col-2 my-auto px-4\">Цена&nbsp;<span>" + array['price'] + "</span>р.</span>\n" +
        "                                    <div class=\"col-2 d-flex\">\n" +
        "                                        <span class=\"d-flex justify-content-center text-14 my-auto col-8 text-center mx-auto\">Рейтинг &nbsp;<h6 class=\"my-auto\">" + array['rating_value'] + "</h6></span>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </div>\n" +
        "                        </div>");
}

function table_table(array) {
    $(".div_print_product").append("<div class=\"w-22 d-flex align-items-center  mb-5\" style=\"min-height: 334px; max-height: 334px;\">\n" +
        " <a href=\"/page/client/product.php\" class=\"text-decoration-none my-auto text-white col-12 rounded-4 div-product position-relative\" style=\"min-height: 314px; max-height: 314px; background-color:  !important;\">\n" +
        "                                <div class=\"col-12 position-absolute div-product-img  rounded-4\" style=\"overflow:hidden;\n" +
        "width: 100%; height: 172px;\">\n" +
        "                                    <img style=\"height:172px; \" class=\"col-12 rounded-4  div-product-img-img\" src=\"/res/img/imgProducts/" + array['product_cover'] + "\">\n" +
        "                                </div>\n" +
        "\n" +
        "                                <div class=\"col-12 px-3 rounded-4 div-product-description\" style=\"border: 1px solid rgba(255, 255, 255, 0.1); margin-top: 82px; height: 220px;\">\n" +
        "                                <div class=\"col-12 div_none\" style=\"height: 88px\"></div>\n" +
        "                                    <h6 class=\"text-13 mt-2 py-1 div-product-h6 Regular\" style=\"max-height: 35px; overflow: hidden;\">" + array['product_name'] +
        "                             </h6>\n" +
        "\n" +
        "                                    <div class=\"d-flex my-2\">\n" +
        "                                        <h5 class=\"text-20 my-auto\">" + array['price'] + "₽</h5>\n" +
        "                                        <h6 class=\"text-12 mx-2 my-auto\">" + array['quantity'] + " шт.</h6>\n" +
        "                                    </div>\n" +
        "\n" +
        "                                    <div class=\"d-flex\">\n" +
        "                                        <div class=\"col-6 d-flex\">\n" +
        "                                            <button class=\"btn text-white text-center lh-1 d-flex col-12 my-auto text-14 bg-transparent border_blue btn_buy justify-content-center\"><span>Купить</span></button>\n" +
        "                                        </div>\n" +
        "\n" +
        "                                        <div class=\"col-6 px-3\">\n" +
        "                                            <div class=\"col-12 d-flex justify-content-between\">\n" +
        "                                                <img class=\"col-4 my-auto\" src=\"/res/img/elipse.png\">\n" +
        "                                                <h6 class=\"text-10  my-auto mx-1\">" + array['shop_name'] + "</h6>\n" +
        "                                            </div>\n" +
        "\n" +
        "                                            <div class=\"col-12 d-flex justify-content-between\">\n" +
        "                                                <div class=\"col-4 text-center text-10 my-auto\">\n" +
        "                                                    " + array['rating_value'] + "\n" +
        "                                                </div>\n" +
        "\n" +
        "                                                <div class=\"d-flex col-8 mx-1 my-auto\">\n" +
        "                                                    " + array['rating'] +
        "                                                </div>\n" +
        "                                            </div>\n" +
        "                                        </div>\n" +
        "                                    </div>\n" +
        "                                </div>\n" +
        "                            </a>\n" +
        "</div>"
    )
    ;
}
