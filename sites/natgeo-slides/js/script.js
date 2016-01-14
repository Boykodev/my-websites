$(function() {

    var sliderWidth; // длина слайдера
    var totalSlides; // всего слайдов (+1 для рестарта)
    var currSlide = 0; // текущий слайд

    var interval; // интервал смены слайдера
    var isSlidding = false; // предотвращяет множественные нажатия

    // настройки слайдера
    var config = {
        sideAnimSpeed: 500,
        animSpeed: 1000,
        pause: 3000
    };

    /* ========== ИНИЦИАЛИЗАЦИЯ ========== */

    function prepareSlider() {
        // Узнаем длину слайдера
        sliderWidth = $('div#slider').width();

        // Добавляет боковой слайдер
        addSideSlider();

        // Копируем первую картинку для добавления в конец
        var firstImage = $('div#slider .slides .slide:first-child').html();
        var $lastSlide = $('<li></li>').addClass('slide').html(firstImage);
        // Добавляем первый слайд в конец слайдера
        $('div#slider .slides').append($lastSlide);

        // Задаем новую длину слайдера
        totalSlides = $('div#slider .slides .slide').length;
        $('div#slider .slides').width(sliderWidth * totalSlides);

        // Добавляем боковые переключатели
        $('<div></div>').addClass('control left').appendTo('div#slider');
        $('<div></div>').addClass('control right').appendTo('div#slider');

        // Создаем эвенты для нажатия на переключатали
        $('.control.left').click(function() { slideLeft() });
        $('.control.right').click(function() { slideRight() });
    }

    function startSlider() {
        interval = setInterval(function () {
            $('div#slider .slides').animate({'margin-left': '-=' + sliderWidth}, config.animSpeed,
            function() {
                currSlide++;
                if (currSlide >= totalSlides - 1) {
                    currSlide = 0;
                    $('div#slider .slides').css('margin-left', '0');
                }
            });
        }, config.pause);
    }

    // Останавливает слайдер при входе курсора и восстанавливает при выходе
    $('.slider-container').on('mouseenter', stopSlider).on('mouseleave', startSlider);

    function stopSlider() { clearInterval(interval); }

    /* ========== РУЧНОЕ УПРАВЛЕНИЕ СЛАЙДЕРОМ ========== */

    function slideLeft() {

        if (!isSlidding) {
            isSlidding = true;

            if (currSlide === 0) {
                $('div#slider .slides').css('margin-left', -(sliderWidth * (totalSlides - 1)) );
            }

            $('div#slider .slides').animate({'margin-left': '+=' + sliderWidth}, config.animSpeed,
                function() {
                    currSlide--;
                    if (currSlide < 0) { currSlide = totalSlides - 2; }
                    isSlidding = false;
                }
            );
        }
    }

    function slideRight() {

        if (!isSlidding) {
            isSlidding = true;

            $('div#slider .slides').animate({'margin-left': '-=' + sliderWidth}, config.animSpeed,
                function() {
                    currSlide++;
                    if (currSlide === totalSlides - 1) {
                        currSlide = 0;
                        $('div#slider .slides').css('margin-left', '0');
                    }
                    isSlidding = false;
                }
            );
        }
    }

    /* ========== БОКОВОЙ СЛАЙДЕР ========== */

    var addSideSlider = (function () {
        // Добавляем боковой слайдер

        var sideSliderData = {
            lastSlide: 3,
            slideLength: 0
        };

        return function () {
            var $slides = $('<ul></ul>').addClass('slides').html( $('div#slider .slides').html() );

            $.each( $($slides).find('.slide'), function(key, value) {
                $(value).attr('data-count', key);
            });

            // Добавляем боковой слайдера в общий контейнер
            $('<div></div>').addClass('side-slider').html($slides).appendTo('div.slider-container');
            // Добаляем переключатель для этого слайдера
            $('<div></div>').addClass('more').appendTo('div.slider-container');
            // Определяем длину перемещения для слайдера
            sideSliderData.slideLength = $('.side-slider .slide').height() + 20;

            addButtonAction(sideSliderData); // Добавляем действие для переключателя

            slideWithSideBar(); // Делает возможным переключать слайды через сайд-бар
        }

    })();

    function addButtonAction(data) {
        // Добавляем действие для переключателя

        $('.slider-container .more').click(function () {
            if (!isSlidding) {
                isSlidding = true;

                if (data.lastSlide < totalSlides - 1) {
                    $('.side-slider .slides').animate({'margin-top': '-=' + data.slideLength},
                        config.sideAnimSpeed, function() { data.lastSlide++; isSlidding = false; }
                    );
                } else {
                    $('.side-slider .slides').animate({'margin-top': 0},
                        config.sideAnimSpeed, function() { isSlidding = false; }
                    );
                    data.lastSlide = 3;
                }
            }
        });
    }

    function slideWithSideBar() {
        // Делает возможным переключать слайды через сайд-бар

        $('.side-slider .slide').click(function () {
            if (!isSlidding) {
                isSlidding = true;

                var dateCount = $(this).attr('data-count');
                $('div#slider .slides').animate({'margin-left': -(sliderWidth * dateCount)},
                    config.animSpeed, function () {
                        currSlide = Number(dateCount) + 1;
                        isSlidding = false;
                    });
            }
        });
    }

    /* Запускаем слайдер... */
    prepareSlider();
    startSlider();
});