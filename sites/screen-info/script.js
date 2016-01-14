$(document).ready(function() {
	$(window).resize(function(event) {
		$('header p').html(getViewPortWidth() +
			' <span class="x">×</span> <span class="opacity">' +
			 getViewPortHeight() + '</span>');
	});

	function showScreenSize() {
		$('footer p').html(getScreenWidth() +
			' <span class="x">×</span> <span class="opacity">' +
			 getScreenHeight() + '</span>');
	}

	init();

	function init() {
		showScreenSize();
		$(window).trigger('resize');
		$('.dpi').text('DPI: ' + getDPI());
	}

	function getScreenWidth() { return window.screen.width; }
	function getScreenHeight() { return window.screen.height; }
	function getViewPortWidth() { return $(window).width(); }
	function getViewPortHeight() { return $(window).height(); }
	function getDPI() { return $('#dpi-detector').outerHeight(); }
});