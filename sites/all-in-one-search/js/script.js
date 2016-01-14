$(function() {
    var queryName = {
        google: 'query',
        yahoo: 'p',
        yandex: 'text'
    };

    var actionUrl = {
        google: 'http://www.google.com/search',
        yahoo: 'http://search.yahoo.com/search',
        yandex: 'http://www.yandex.com/search'
    }

    $('.google').click(function (e) {
        e.preventDefault();
        $('.query').attr('name', queryName.google);
        $('form').attr('action', actionUrl.google).submit();
    });

    $('.yahoo').click(function (e) {
        e.preventDefault();
        $('.query').attr('name', queryName.yahoo);
        $('form').attr('action', actionUrl.yahoo).submit();
    });

    $('.yandex').click(function (e) {
        e.preventDefault();
        $('.query').attr('name', queryName.yandex);
        $('form').attr('action', actionUrl.yandex).submit();
    });
});