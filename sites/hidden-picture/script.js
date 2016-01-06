$(document).ready(addSquares());

function addSquares() {
	for (var i = 0; i < 90; i++) {
		for (var j = 0; j < 60; j++) {
			var square = $('<div class="square" onmouseover="changeColor(this)"></div>');
			$(square).css('width', '10px');
			$(square).css('height', '10px');
			$(square).css('background-color', getRandomColor());
			$(square).css('margin-top', 10 * j + "px");
			$(square).css('margin-left', 10 * i + "px");
			$("#frame").append(square);
		}
	}
	$('#frame').css('background-image', 'url(assets/surprised-cat.jpg)');
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function changeColor(element) {
	$(element).css('background-color', 'rgba(255, 255, 255, 0)');
}

function showHelp() {
	document.getElementById('info-text').innerHTML =
	'<pre>Clear the frame<br>to see the<br>hidden picture...<pre>';
}

function hideHelp() {
	document.getElementById('info-text').innerHTML = '';
}