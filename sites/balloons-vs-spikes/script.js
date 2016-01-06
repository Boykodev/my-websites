var index = 0; // index of current balloon
var balloons = []; // balloons array of intervals
var currentMousePos = { x: -1, y: -1 };
var poppingSound = new Audio('assets/balloon-pop.mp3');
$(document).ready(function() {
	$('#canvas').click(function() {
		putBalloon();
	});
	$('#canvas').on('mousemove', function(event) {
		currentMousePos.x = event.pageX;
		currentMousePos.y = event.pageY;
	});
});

function showHelp() { $('#info').fadeIn('slow'); }
function hideHelp() { $('#info').fadeOut('slow'); }

function putBalloon() {
	var rdeg = Math.floor((Math.random() * 360) + 1);
	var balloon = document.createElement('img');
	$(balloon).addClass('balloon')
		.attr('src', 'assets/balloon.png')
		.attr('alt', 'Balloon')
		.attr('width', '150')
		.attr('height', '150')
		.css('-webkit-filter', 'hue-rotate(' + rdeg + 'deg)')
		.css({
			'top': currentMousePos.y - 75,
			'left': currentMousePos.x - 75
		});
	$('#canvas').append(balloon);
	balloons[index] = setInterval(moveUp, 10, balloon, index);
	index++;
}

function moveUp(balloon, index) {
	var top = $(balloon).css('top');
	top = top.replace("px", "");
	top -= 1;
	$(balloon).css('top', top);
	if (top <= 66) {
		clearInterval(balloons[index]);
		$(balloon).remove();
		poppingSound.play();
	}
}