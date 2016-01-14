$(document).ready(function() {
    var preloadComplete = false;
    function blinkingText(selector) {
        if (preloadComplete) return;
        $(selector).fadeOut('slow', function() {
            if (preloadComplete) {
                $(selector).css('display', 'block');
                return;
            }
            $(selector).fadeIn('slow', function() {
                blinkingText(selector);
            });
        });
    }

    function preloadImages(images, callback) {
        var count = images.length;
        if(count === 0) {
            callback();
        }
        var loaded = 0;
        $(images).each(function() {
            $('<img>').attr('src', this).load(function() {
                loaded++;
                if (loaded === count) {
                    callback();
                }
            });
        });
    }

    function showTip() {
        $('.tip').text('Hover over the image to stop scrolling');
    }
    function startScroll() {
        $('.panorama').css({
            background: "url('assets/panorama.jpg')",
            backgroundSize: 'auto 460px'
        }).removeClass('paused');
    }

    blinkingText('.tip');
    preloadImages(['assets/panorama.jpg'], function() {
        preloadComplete = true; showTip(); startScroll();
    });
});