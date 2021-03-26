$(function() {
    // It solve problem with wrong messages in console 
    jQuery.event.special.mousewheel = {
        setup: function( _, ns, handle ){
          if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("mousewheel", handle, { passive: false });
          } else {
            this.addEventListener("mousewheel", handle, { passive: true });
          }
        }
      };
      jQuery.event.special.touchstart = {
        setup: function( _, ns, handle ){
          if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchstart", handle, { passive: false });
          } else {
            this.addEventListener("touchstart", handle, { passive: true });
          }
        }
      };
      jQuery.event.special.touchmove = {
        setup: function( _, ns, handle ){
          if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchmove", handle, { passive: false });
          } else {
            this.addEventListener("touchmove", handle, { passive: true });
          }
        }
      };
    //  <------------------------------------>

    // Fixed Header 
    let header = $('#header');
    let intro = $('#intro');
    let nav = $('#nav');
    let navToggle = $('#nav-toggle');

    let introH = intro.innerHeight();
    let aboutTop = $('#about').offset().top
    let aboutBottom = $('#about').innerHeight() + aboutTop + 100;
    let serviceTop = $('#service').offset().top - 90
    let serviceBottom = $('#service').innerHeight() + serviceTop;
    let workTop = $('#work').offset().top - 200
    let workBottom = $('#work').innerHeight() + workTop - 100;
    let blogTop = $('#blog').offset().top - 350
    let blogBottom = $('#blog').innerHeight() + blogTop - 90;

    let scrollPos = $(window).scrollTop();

    checkScroll(introH, scrollPos)

    $(window).on('scroll resize', function() {
        introH = intro.innerHeight();
        scrollPos = $(this).scrollTop();
        checkScroll(introH, scrollPos)
        hightlightNav(scrollPos)

    });
    // fix Nav if intro section was scrolled
    function checkScroll(introH, scrollPos) {
        if( scrollPos > introH ) {
            header.addClass('fixed');

        } else {
            header.removeClass('fixed');
        }
    }
    // hightlight nav-item if its section was riched
    function hightlightNav(scrollPos) {
        $('#nav .nav__link').removeClass('active');
        if( scrollPos >= aboutTop && scrollPos <= aboutBottom) {
            $('.nav__link[data-scroll="#about"]').addClass('active');

            } 
        else if( scrollPos >= serviceTop && scrollPos <= serviceBottom) {
            $('.nav__link[data-scroll="#service"]').addClass('active');

            } 
        else if( scrollPos >= workTop && scrollPos <= workBottom) {
            $('.nav__link[data-scroll="#work"]').addClass('active');

            } 
        else if( scrollPos >= blogTop && scrollPos <= blogBottom) {
            $('.nav__link[data-scroll="#blog"]').addClass('active');

            } 
        else if( scrollPos >= blogBottom) {
            $('.nav__link[data-scroll="#contact"]').addClass('active');
            }
        
    } 

    // Nav Toggle 
    navToggle.on('click', function(event) {
        event.preventDefault();

        navToggle.toggleClass('active');
        nav.toggleClass('active') 
    
    });
    
    // Smooth Scroll 
    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $this.data('scroll'),
            elementOfferset = $(blockId).offset().top;
        
        $('#nav a').removeClass('active');
        $(this).addClass('active')

        // close burger-menu by click on item in menu 
        if( navToggle.hasClass('active')) {
            $(window).on("scroll", function() {
             navToggle.removeClass("active");
             nav.removeClass("active");
            });
           
        }

        $('.section__title').removeClass('bg-highlight')
        $(blockId + ' .section__title').addClass('bg-highlight')

        if( blockId != "#about") {
            elementOfferset = elementOfferset - 20;
        } else {
          elementOfferset++;
        }

        $('html, body').animate({
            scrollTop: elementOfferset
        }, 700);

    });

    // Accordion
    $('#accordion .accordion__content').hide().prev().click(function(event) {
        event.preventDefault();
        $('#accordion .accordion__content').not(this).slideUp().parent().removeClass('active');
        
        $(this).next().not(':visible').slideDown().parent().addClass('active');

    });

    // Slick 
    // https://kenwheeler.github.io/slick/
    $('#speechSlider').slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    $('#testimonialSlider').slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

});
