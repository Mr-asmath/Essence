(function ($) {
    'use strict';

    var $window = $(window);

    // :: Nav Active Code
    if ($.fn.classyNav) {
        $('#essenceNav').classyNav();

        function scrollToHash(hash, animate) {
            var target = $(hash);
            if (!target.length) {
                return;
            }

            var headerHeight = $('.header_area').outerHeight() || 80;
            var scrollTop = target.offset().top - headerHeight;

            if (animate) {
                $('html, body').stop().animate({
                    scrollTop: scrollTop
                }, 650, 'easeInOutQuart');
            } else {
                $('html, body').stop().scrollTop(scrollTop);
            }
        }

        // Home-page menu links scroll to sections and close the mobile drawer.
        $('#essenceNav .classynav a, .hero-content a[href*="#"], .cta--text a[href*="#"]').on('click', function(e) {
            var link = this;
            var hash = link.hash;
            var currentPath = window.location.pathname.replace(/^\//, '');
            var linkPath = link.pathname.replace(/^\//, '');
            var isHomeFromRoot = currentPath === '' && linkPath === 'index.html';
            var isSamePage = linkPath === currentPath || link.pathname === '' || isHomeFromRoot;

            if (hash && isSamePage) {
                var target = $(hash);
                if (target.length) {
                    e.preventDefault();
                    scrollToHash(hash, true);
                }
            }
            if ($('.classy-menu').hasClass('menu-on')) {
                $('.classy-menu').removeClass('menu-on');
                $('.classy-navbar-toggler .navbarToggler').removeClass('active');
                $('body').removeClass('nav-overlay-on');
            }
        });
        // Ensure nav overlay is above all when menu opens
        $('.classy-navbar-toggler').on('click', function() {
            setTimeout(function() {
                if ($('.classy-menu').hasClass('menu-on')) {
                    $('body').addClass('nav-overlay-on');
                } else {
                    $('body').removeClass('nav-overlay-on');
                }
            }, 10);
        });
        // Also close overlay on close icon
        $('.classycloseIcon').on('click', function() {
            $('body').removeClass('nav-overlay-on');
        });

        if (window.location.hash) {
            $window.on('load', function () {
                setTimeout(function () {
                    scrollToHash(window.location.hash, false);
                }, 80);
            });
        }
    }

    function scrollToProducts() {
        var target = $('#products');
        if (!target.length) {
            return;
        }

        var headerHeight = $('.header_area').outerHeight() || 80;
        $('html, body').stop().animate({
            scrollTop: target.offset().top - headerHeight
        }, 650, 'easeInOutQuart');
    }

    function popularProductsOptions(count) {
        return {
            items: 4,
            margin: 30,
            loop: count > 1,
            nav: false,
            dots: false,
            autoplay: count > 1,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        };
    }

    function rebuildPopularProducts($carousel, items) {
        if (!$carousel.length) {
            return;
        }

        if ($carousel.hasClass('owl-loaded')) {
            $carousel.trigger('destroy.owl.carousel');
        }

        $carousel
            .removeClass('owl-loaded owl-drag')
            .empty()
            .append(items);

        if ($.fn.owlCarousel) {
            $carousel.owlCarousel(popularProductsOptions(items.length));
        }
    }

    // :: Sliders Active Code
    var $popularProducts = $('.popular-products-slides');
    var $allPopularProducts = $popularProducts.children('.single-product-wrapper').clone(false, false);

    if ($.fn.owlCarousel) {
        rebuildPopularProducts($popularProducts, $allPopularProducts.clone(false, false));

        $('.product_thumbnail_slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ["<img src='img/core-img/long-arrow-left.svg' alt=''>", "<img src='img/core-img/long-arrow-right.svg' alt=''>"],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });
    }

    $('.category-filter').on('click', function (e) {
        e.preventDefault();

        var category = $(this).data('category');
        var filteredProducts = $allPopularProducts.filter(function () {
            return $(this).data('category') === category;
        }).clone(false, false);

        $('.category-filter').removeClass('active');
        $(this).addClass('active');
        rebuildPopularProducts($popularProducts, filteredProducts);
        scrollToProducts();
    });

    // :: Header Cart Active Code
    var cartbtn1 = $('#essenceCartBtn');
    var cartOverlay = $(".cart-bg-overlay");
    var cartWrapper = $(".right-side-cart-area");
    var cartbtn2 = $("#rightSideCart");
    var cartOverlayOn = "cart-bg-overlay-on";
    var cartOn = "cart-on";

    cartbtn1.on('click', function (e) {
        e.preventDefault();
        cartOverlay.toggleClass(cartOverlayOn);
        cartWrapper.toggleClass(cartOn);
        $('body').toggleClass('cart-open', cartWrapper.hasClass(cartOn));
    });
    cartOverlay.on('click', function () {
        $(this).removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
        $('body').removeClass('cart-open');
    });
    cartbtn2.on('click', function (e) {
        e.preventDefault();
        cartOverlay.removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
        $('body').removeClass('cart-open');
    });

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: Sticky Active Code
    $window.on('scroll', function () {
        if ($window.scrollTop() > 0) {
            $('.header_area').addClass('sticky');
        } else {
            $('.header_area').removeClass('sticky');
        }
    });

    // :: Nice Select Active Code
    if ($.fn.niceSelect) {
        $('select').niceSelect();
    }

    // :: Slider Range Price Active Code
    $('.slider-range-price').each(function () {
        var min = jQuery(this).data('min');
        var max = jQuery(this).data('max');
        var unit = jQuery(this).data('unit');
        var value_min = jQuery(this).data('value-min');
        var value_max = jQuery(this).data('value-max');
        var label_result = jQuery(this).data('label-result');
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function (event, ui) {
                var result = label_result + " " + unit + ui.values[0] + ' - ' + unit + ui.values[1];
                console.log(t);
                t.closest('.slider-range').find('.range-price').html(result);
            }
        });
    });

    // :: Favorite Button Active Code
    $(document).on('click', '.favme', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    $(document).on('click touchstart', '.favme', function () {
        $(this).toggleClass('is_animating');
    });

    $(document).on('animationend', '.favme', function () {
        $(this).toggleClass('is_animating');
    });

    // :: Nicescroll Active Code
    if ($.fn.niceScroll) {
        $(".cart-list, .cart-content").niceScroll();
    }

    // :: wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: PreventDefault a Click
    $("a[href='#']").on('click', function (e) {
        e.preventDefault();
    });

    $(".search-area form").on('submit', function (e) {
        e.preventDefault();
    });

})(jQuery);
