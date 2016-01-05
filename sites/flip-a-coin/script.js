var flipper = document.getElementsByClassName('flipper')[0];
var angle = 0;

function flipCoin() {
	if (Math.random() > 0.5) {
		angle += 3600;
	} else {
		angle += 3780;
	}
	var angleStr = "rotateX(" + angle + "deg)";
	flipper.style.transform = "" + angleStr;
	flipper.style.webkitTransform = "" + angleStr;
}

function showHelp() {
	document.getElementById('info-text').innerHTML =
	'<pre>You know how<br>it works...<pre>';
}

function hideHelp() {
	document.getElementById('info-text').innerHTML = '';
}