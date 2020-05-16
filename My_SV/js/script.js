$(document).ready(function () {
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.experience_social'),
        menuItem = document.querySelectorAll('.experience_item'),
        hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('experience_social_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('experience_social_active');
        })
    })
});
///    не работает

    $(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href=#up]").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
        return false;
    });
});