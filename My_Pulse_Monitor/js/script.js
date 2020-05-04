$(document).ready(function(){
    $('.carousel_inner').slick({
        speed: 1200,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/right.svg"></button>'
    });

    $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
        $(this)
          .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
          .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog_item_content').eq(i).toggleClass('catalog_item_content_active');
                $('.catalog_item_list').eq(i).toggleClass('catalog_item_list_active');
            })
        });
    };
    
    toggleSlide('.catalog_item_link');
    toggleSlide('.catalog_item_back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal_close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal_descr').text($('.catalog_item_subheader').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    //////маска ввода

    $('input[name=phone]').mask("+7 (999) 999-9999");
    
    ///// localhost

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    ///// Smooth scroll and pageup

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
});