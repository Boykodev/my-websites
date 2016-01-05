var button = document.getElementById('button');
var countInfo = document.getElementById('btn-count');
var counter = 0;

function buttonPicked() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	var rdeg = Math.floor((Math.random() * 360) + 1);
	var rtop = Math.floor((Math.random() * (height - 150)) + 1);
	var rleft = Math.floor((Math.random() * (width - 100)) + 1);

	var degree = "-webkit-filter: hue-rotate(" + rdeg + "deg)";
	button.setAttribute('style', degree);
	button.style.marginTop = rtop + 'px';
	button.style.marginLeft = rleft + 'px';
	countInfo.innerHTML = ++counter;
}

function showHelp() {
	document.getElementById('info-text').innerHTML =
	'<pre>KEEP CALM<br>AND COLLECT<br>THE BUTTONS!<pre>';
}

function hideHelp() {
	document.getElementById('info-text').innerHTML = '';
}