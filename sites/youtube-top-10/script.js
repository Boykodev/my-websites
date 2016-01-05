var buttonPressed = false;

function showHelp() {
	if (!buttonPressed) {
		document.getElementById('info-text').innerHTML =
	'<pre>Press Big Red Button<br>to see the Top 10<br>Youtube videos.<pre>';
	}
}

function hideHelp() {
	document.getElementById('info-text').innerHTML = '';
}

function showTop() {
	buttonPressed = true;
	var videos = document.getElementById('videos');
	var button = document.getElementById('big-red-button');
	var code = videos.innerHTML;
	code = code.replace("<!--", " ");
	code = code.replace("-->", " ");
	document.body.removeChild(button);
	videos.innerHTML = code;
}