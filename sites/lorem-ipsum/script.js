var currentFontSize = 14;

function setFont(button) {
	var font = $(button).children().text();
	if (font.indexOf(' ') > -1) {
		font = "'" + font + "'";
	}
	$('.showcase').css('font-family', font);
}

function fontUp() {
	$('.showcase-text').css('font-size', ++currentFontSize + 'px');
}

function fontDown() {
	if (currentFontSize > 0) currentFontSize--;
	$('.showcase-text').css('font-size', currentFontSize + 'px');
}

function clearText() {
	$('.showcase-text').text('').attr('rows', '4');
}