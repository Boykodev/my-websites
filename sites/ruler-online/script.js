$(document).ready(function() {

    init();

    function init() {
        setRulerDimensions();
        makeRulerDraggable();
        removeTip();
    }

    function setRulerDimensions() {
        // total inches on the ruler
        var totalInches = 12.125;
        // rulerWidth depends on DPI
        var rulerWidth = getDPI() * totalInches;
        var rulerHeight = rulerWidth * 0.09154639;
        // margin is used to place ruler in the center
        var marginLeft = -rulerWidth / 2;
        var marginTop = -rulerHeight / 2;

        $('#ruler').width(rulerWidth).height(rulerHeight)
        .css({
            marginLeft: marginLeft,
            marginTop: marginTop
        });;
    }

    function removeTip() { $('#ruler').one('mousedown', function(event) {
            $('header p').fadeOut('slow');
        });
    }
    function makeRulerDraggable() { $('#ruler').draggable(); }
    function getDPI() { return $('#dpi').outerHeight(); }
});