$(document).ready(function () {
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true, // Animations happen only once while scrolling down
            offset: 120, // Offset (in px) from the original trigger point
            duration: 800, // Animation duration
            easing: 'ease-out-cubic',
        });
    }

    // 2. Sticky Header Effect
    var header = $('.header');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            header.addClass('scrolled');
        } else {
            header.removeClass('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    $('.mobile-menu-btn').click(function () {
        $('.nav').toggleClass('active');
        var icon = $(this).find('i');
        if ($('.nav').hasClass('active')) {
            icon.removeClass('fa-bars').addClass('fa-times');
        } else {
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });

    // 4. Smooth Scrolling for Navigation Links (Ensure cross-page compatibility)
    $('.nav-list a, .header-contact a').on('click', function (event) {
        var href = $(this).attr('href');

        // If it's a hash link on the CURRENT page
        if (href.startsWith('#') || (href.includes('#') && window.location.pathname.endsWith(href.split('#')[0]))) {

            var targetId = href.substring(href.indexOf('#'));
            var target = $(targetId);

            if (target.length) {
                event.preventDefault();

                // Close mobile menu if open
                $('.nav').removeClass('active');
                $('.mobile-menu-btn i').removeClass('fa-times').addClass('fa-bars');

                // Smooth scroll
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 85 // Adjust for fixed header height
                }, 1000, 'swing');
            }
        }
    });

    // Close mobile menu on ANY click containing a hash (useful from external pages)
    $('.nav-list a').on('click', function () {
        if ($('.nav').hasClass('active')) {
            $('.nav').removeClass('active');
            $('.mobile-menu-btn i').removeClass('fa-times').addClass('fa-bars');
        }
    });

    // 5. Active Link Highlighting during scroll
    $(window).scroll(function () {
        var scrollDistance = $(window).scrollTop() + 100;
        var sections = $('section');

        if (sections.length > 0) {
            sections.each(function (i) {
                if ($(this).position().top <= scrollDistance) {
                    $('.nav-list a.active').removeClass('active');
                    $('.nav-list a').eq(i).addClass('active');
                }
            });
        }
    }).scroll();

    // 6. Interactive Form Submission (Simulation)
    $('#contactForm').submit(function (e) {
        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('button[type="submit"]');
        var originalText = $btn.html();

        // Change button state
        $btn.html('<i class="fa-solid fa-spinner fa-spin"></i> Sende Nachricht...');
        $btn.prop('disabled', true);
        $btn.css('opacity', '0.8');

        // Simulate AJAX Request using setTimeout
        setTimeout(function () {
            // Restore button
            $btn.html(originalText);
            $btn.prop('disabled', false);
            $btn.css('opacity', '1');

            // Show Success Message elegantly
            var successMsg = '<div style="background: rgba(46, 204, 113, 0.1); color: #27ae60; padding: 15px; border-radius: 8px; margin-top: 20px; font-weight: 600; display: none;" id="successMsg"><i class="fa-solid fa-circle-check"></i> Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet. Wir melden uns in Kürze.</div>';

            $('.form-status').html(successMsg);
            $('#successMsg').slideDown(300);

            // Clear the form
            $form[0].reset();

            // Remove the message after 6 seconds
            setTimeout(function () {
                $('#successMsg').slideUp(300, function () {
                    $(this).remove();
                });
            }, 6000);

        }, 1800); // 1.8 seconds delay simulated
    });
});
