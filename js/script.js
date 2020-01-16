$(document).ready(function () {
    $('body').addClass("loaded");
    var elements = document.querySelectorAll('.scrollwatch');
    var config = {
        threshold: 0.01
    };
    var observer;
    function onIntersection(entries) {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                handleScrolledIntoView(entry.target);
            }
        });
    }

    if (!('IntersectionObserver' in window)) {
        Array.from(elements).forEach(el => handleScrolledIntoView(el));
    } else {
        observer = new IntersectionObserver(onIntersection, config);
        elements.forEach(el => {
            observer.observe(el);
        });
    }
    function handleScrolledIntoView(target) {
        target.classList.add('scrolled');
    }

    $('a').on("click", function () {
        if ($(this).attr("href").charAt(0) === '#') {
            $("html,body").animate({ scrollTop: $($(this).attr("href")).offset().top - 100 }, 750);
        }
    });
    // $('.featured-strip__list').slick({
    //     slidesToShow: 4,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     dots: false,
    //     autoplay: true,
    //     autoplaySpeed: 2000,
    //     infinite: true,
    //     variableWidth: true,
    //     responsive: [
    //         {
    //           breakpoint: 1460,
    //           settings: {
    //             slidesToShow: 3,
    //           }
    //         },
    //         {
    //           breakpoint: 1200,
    //           settings: {
    //             slidesToShow: 2,
    //           }
    //         },
    //         {
    //           breakpoint: 480,
    //           settings: {
    //             slidesToShow: 1,
    //           }
    //         }
    //       ]
    // });

    $('.reviews-strip__list').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        prevArrow: '<span class="icon-chevron-left slick-prev"></span>',
        nextArrow: '<span class="icon-chevron-right slick-next"></span>'
    });

    $('.faqs-strip__question').on("click", function(){
        $(this).next('.faqs-strip__answer').toggleClass('active');
    });
});