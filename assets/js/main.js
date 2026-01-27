/*
        Dimension by HTML5 UP
        html5up.net | @ajlkn
        Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

        var     $window = $(window),
                $body = $('body'),
                $wrapper = $('#wrapper'),
                $header = $('#header'),
                $main = $('#main'),
                $main_articles = $main.children('article');

        // Breakpoints.
                breakpoints({
                        xlarge:   [ '1281px',  '1680px' ],
                        large:    [ '981px',   '1280px' ],
                        medium:   [ '737px',   '980px'  ],
                        small:    [ '481px',   '736px'  ],
                        xsmall:   [ '361px',   '480px'  ],
                        xxsmall:  [ null,      '360px'  ]
                });

        // Play initial animations on page load.
                $window.on('load', function() {
                        window.setTimeout(function() {
                                $body.removeClass('is-preload');
                        }, 100);
                });

        // Fix: Flexbox min-height bug on IE.
                if (browser.name == 'ie') {

                        var flexboxFixTimeoutId;

                        $window.on('resize.flexbox-fix', function() {

                                clearTimeout(flexboxFixTimeoutId);

                                flexboxFixTimeoutId = setTimeout(function() {
                                        if ($wrapper.prop('scrollHeight') > $window.height())
                                                $wrapper.css('height', 'auto');
                                        else
                                                $wrapper.css('height', '100vh');

                                }, 250);

                        }).triggerHandler('resize.flexbox-fix');

                }

        // Nav.
                var $nav = $header.children('nav'),
                        $nav_li = $nav.find('li'),
                        $nav_links = $nav.find('a[href^="#"]'),
                        $nav_toggle = $header.find('.nav-toggle');

                // Add "middle" alignment classes if we're dealing with an even number of items.
                        if ($nav_li.length % 2 == 0) {

                                $nav.addClass('use-middle');
                                $nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

                        }

        // Show content immediately.
                $main.show();
                $main_articles.show();

        // Smooth scrolling and active state handling.
                var getHeaderOffset = function() {
                        return ($header.outerHeight() || 0);
                };

                var activateLink = function(id) {
                        $nav_links.removeClass('active');
                        if (!id) return;
                        $nav_links.filter('[href="#' + id + '"]').addClass('active');
                };

                var closeNav = function() {
                        if (!$header.hasClass('nav-open'))
                                return;

                        $header.removeClass('nav-open');
                        $nav_toggle.attr('aria-expanded', 'false');
                };

                $nav_links.on('click', function(event) {
                        var href = $(this).attr('href');
                        if (!href || href.charAt(0) !== '#' || href.length === 1)
                                return;

                        var $target = $(href);
                        if ($target.length === 0)
                                return;

                        event.preventDefault();
                        var offset = $target.offset().top - getHeaderOffset() - 16;
                        $('html, body').animate({ scrollTop: offset }, 500);
                        activateLink($target.attr('id'));
                        closeNav();
                });

                $nav_toggle.on('click', function() {
                        var isOpen = $header.toggleClass('nav-open').hasClass('nav-open');
                        $nav_toggle.attr('aria-expanded', isOpen ? 'true' : 'false');
                });

                var updateActiveLink = function() {
                        var scrollPos = $window.scrollTop() + getHeaderOffset() + 32;
                        var currentId = null;

                        $main_articles.each(function() {
                                var $this = $(this);
                                if ($this.offset().top <= scrollPos)
                                        currentId = $this.attr('id');
                        });

                        activateLink(currentId);
                };

                $window.on('scroll resize', function() {
                        updateActiveLink();
                });

                updateActiveLink();

})(jQuery);
