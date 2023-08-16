$(function(){
    print_shops();
});

//Фильтр на странице шопов
$(".menu_filter").click(function(){
    $(".menu_filter").removeClass("menu_filter_active");
    $(this).addClass("menu_filter_active");

    $(".text_filter_shops").text($(this).find('h6').text());
    $(".select__input_Filter_shops").val("default");

    $(".input_search_shops").val("");
    $(".select__head_Filter_shops").text("Фильтровать по");
    $("#filterCategory").val($(this).attr("id"));
    $("#page").val(1);
    print_shops();
});

jQuery(($) => {
    $('.select_Filter_shops').on('click', '.select__head_Filter_shops', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head_Filter_shops').removeClass('open');
            $('.select__list_Filter_shops').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });

    $('.select_Filter_shops').on('click', '.select__item_Filter_shops', function () {
        $('.select__head_Filter_shops').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().text($(this).text());
        $(this).parent().prev().prev().val($(this).attr('id'));
        print_shops();
        $(".ShowMore").removeClass("d-none");
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select_Filter_shops').length) {
            $('.select__head_Filter_shops').removeClass('open');
            $('.select__list_Filter_shops').fadeOut();
        }
    });
});

function print_shops() {
    const searchInput = $.trim($('.input_search_shops').val());
    const filterShops = $(".select__input_Filter_shops").val();
    const filterCategory = $("#filterCategory").val();
    let page = $("#page").val();

    queryShops(searchInput, filterShops, filterCategory, page);
}

function queryShops(searchInput, filterShops, filterCategory, page){
    $.ajax({
        url: "/backend/client/shops.php",
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'Select_Shops_Filter',
            category: filterCategory,
            parameter: filterShops,
            search: searchInput,
            page: page
        },
        success: function(data){
            if (data !== 0) {
                console.log(data);

                PaginationRendering(parseInt(data['items']), page);
                $(".div-write-shops").empty();

                data['array'].forEach(function (array) {
                    $(".div-write-shops").append("<a href=\"/page/client/shop/shop?id="+array['id']+"\" class=\"text-white text-decoration-none shops_mini w-18 rounded-3 my-2 pb-2\" style=\"border: 1px solid rgba(255, 255, 255, 0.1);\">\n" +
                        "                            <div class=\"col-12 d-flex flex-column\">\n" +
                        "                                <img style=\"object-fit: cover;\n" +
                        "  width: 150px;\n" +
                        "  height: 150px; max-height: 150px\n" +
                        "  border-radius: 50%;\" src=\"/res/img/imgShop/"+array['logo']+"\" class=\"rounded-circle mx-auto \">\n" +
                        "                                <h6 class=\"text-center text-16 my-2\">"+array['name']+"</h6>\n" +
                        "\n" +
                        "                                <div class=\"col-12 d-flex justify-content-center\">\n" +
                        "                                    <h6 class=\"text-16 mx-2 my-auto\">"+array['rating_value']+"</h6>\n" +
                        "                                    <div class=\"d-flex justify-content-around my-auto\">\n" +
                     array['rating']+
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "\n" +
                        "                            <h6 class=\"text-14 mx-3 my-2 Regular\">"+array['heading']+"</h6>\n" +
                        "                        </a>");
                });
            }
            else {
                $(".div-write-shops").empty();
            }
        }
    });
}


function PaginationRendering (items, currentPage) {
    let options = {
        items: items,
        itemsOnPage: 5,
        currentPage: currentPage,
        prevText: "<",
        nextText: ">",
        displayedPages: 4,
        edges: 1,

        onPageClick: function(pageNumber, event) {
            $("#page").val(pageNumber);
            event.preventDefault();
            // обработчик клика на страницу
            print_shops();

            let totalPages = $('#pagination-container').pagination('getPagesCount');
            if (pageNumber === totalPages) {
                $(".ShowMore").addClass("d-none");
            }
            else {
                $(".ShowMore").removeClass("d-none");
            }
        }
    };

    $('#pagination-container').empty().pagination(options);
}


$(".reset-filter").click( function () {
    $(".input_search_shops").val("");
    $(".select__head_Filter_shops").text("Фильтровать по");
    $("#filterCategory").val("all");
    $("#page").val(1);
    print_shops();
    $(".text_filter_shops").text("Все аккаунты");
    $(".menu_filter").removeClass("menu_filter_active");
    $(".ShowMore").removeClass("d-none");
});

$(".input_search_shops").on('input', function(e) {
    print_shops();
});

$(".ShowMore").click( function () {
    const searchInput = $.trim($('.input_search_shops').val());
    const filterShops = $(".select__input_Filter_shops").val();
    const filterCategory = $("#filterCategory").val();
    let page = $("#page").val();

    $.ajax({
        url: "/backend/client/shops.php",
        method: 'POST',
        dataType: 'json',
        data: {
            action: 'Select_Shops_ShowMore',
            category: filterCategory,
            parameter: filterShops,
            search: searchInput,
            page: page
        },
        success: function(data){
            if (data !== 0) {

                data['array'].forEach(function (array) {
                    $(".div-write-shops").append("<a href=\"/page/client/shop/shop?id="+array['id']+"\" class=\"text-white text-decoration-none shops_mini w-18 rounded-3 my-2 pb-2\" style=\"border: 1px solid rgba(255, 255, 255, 0.1);\">\n" +
                        "                            <div class=\"col-12 px-4 py-2\">\n" +
                        "                                <img style='max-height: 130px' src=\"/res/img/imgShop/"+array['logo']+"\" class=\"col-12 rounded-circle\">\n" +
                        "                                <h6 class=\"text-center text-16 my-2\">"+array['name']+"</h6>\n" +
                        "\n" +
                        "                                <div class=\"col-12 d-flex justify-content-center\">\n" +
                        "                                    <h6 class=\"text-16 mx-2 my-auto\">"+array['rating_value']+"</h6>\n" +
                        "                                    <div class=\"d-flex justify-content-around my-auto\">\n" +
                        array['rating']+
                        "                                    </div>\n" +
                        "                                </div>\n" +
                        "                            </div>\n" +
                        "\n" +
                        "                            <h6 class=\"text-14 mx-3 my-2 Regular\">"+array['heading']+"</h6>\n" +
                        "                        </a>");
                });
            }
            $(".ShowMore").addClass("d-none");

        }
    });
});
