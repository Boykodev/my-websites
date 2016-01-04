function buttonPressed() {
	var text = document.getElementsByTagName('p');
	var button = document.getElementById('button');
	var spacing = document.getElementById('spacing');
	var audio = new Audio('assets/explosion.mp3');
	var img = new Image();
	img.src = 'assets/nuclear-blast.jpg';
	window.alert("YOU HAD ONE JOB!");
	for (var i = text.length - 1; i >= 0; i--) {
		document.body.removeChild(text[i]);
	}
	document.body.removeChild(spacing);
	document.body.removeChild(button);
	document.body.style.backgroundImage =
	'url("assets/nuclear-blast.jpg")';
	document.body.style.backgroundRepeat = 'no-repeat';
	document.body.style.backgroundSize = '100% 100%';
	document.body.style.backgroundPosition = 'center';
	document.body.style.backgroundAttachment = 'fixed';
	audio.play();
}