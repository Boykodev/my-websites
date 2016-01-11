// current colors
var currentColor = {
	flask1: '#ff0000',
	flask2: '#00ff00',
	flask3: '#0000ff'
};
// last selected flask
var prevFlask = 0;

$(document).ready(function() {
	$('.flasks').on('click', function(event) {
		if ($(this).hasClass('flask-1')) {
			$('.status').text('First flask selected!')
			if (prevFlask != 0 && prevFlask != 1) {
				$('.status').text('First flask color is mixed!')
				mixColors(1, prevFlask);
			} else {
				prevFlask = 1;
			}
		} else if ($(this).hasClass('flask-2')) {
			$('.status').text('Second flask selected!')
			if (prevFlask != 0 && prevFlask != 2) {
				$('.status').text('Second flask color is mixed!')
				mixColors(2, prevFlask);
			} else {
				prevFlask = 2;
			}
		} else if ($(this).hasClass('flask-3')) {
			$('.status').text('Third flask selected!')
			if (prevFlask != 0 && prevFlask != 3) {
				$('.status').text('Third flask color is mixed!')
				mixColors(3, prevFlask);
			} else {
				prevFlask = 3;
			}
		}
	});
});

function mixColors(target, resource) {
	var targetColor = currentColor['flask' + target];
	var resourceColor = currentColor['flask' + resource];
	targetColor = $.xcolor.combine(targetColor, resourceColor).getHex();
	if (targetColor == '#ffffff') {
		// make white color more visible
		$('.flask-'+ target + ' .contents')
		.css('background-color', 'black');
	} else {
		$('.flask-'+ target + ' .contents')
		.css('background-color', targetColor);
	}
	currentColor['flask' + target] = targetColor;
	prevFlask = 0;
}