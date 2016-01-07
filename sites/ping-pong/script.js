/** Declaring Ping-Pong constants*/
// Dimensions of the table
	var WIDTH = 600;
	var HEIGHT = 400;
// Dimensions of the paddle
	var PADDLE_WIDTH = 10
	var PADDLE_HEIGHT = HEIGHT / 4;
// Offset of the paddle from table side
	var PADDLE_OFFSET = 20;
// Radius of the ball in pixels
	var BALL_RADIUS = 10;
// Start dialog dimensions
	var START_WIDTH = WIDTH / 2;
	var START_HEIGHT = HEIGHT / 2;
// Intervals
	var moveBallInterval;
// Globals
	var level = 0;
	var alreadyStarted = false;

$(document).ready(function() {
	drawPaddles();
	addPaddleListener();
	addStart();
	addStartListener();
});

function drawPaddles() {
	var paddle1 = document.createElement('div');
	var paddle2 = document.createElement('div');
	$(paddle1).add(paddle2).width(PADDLE_WIDTH).height(PADDLE_HEIGHT);
	$(paddle1).add(paddle2).addClass('paddle')
	$(paddle1).add(paddle2).css({
		backgroundColor: 'white',
		position: 'absolute'
	});
	$(paddle1).css({
		top: (HEIGHT - PADDLE_HEIGHT ) / 2,
		left: PADDLE_OFFSET / 2
	});
	$(paddle2).css({
		top: (HEIGHT - PADDLE_HEIGHT ) / 2,
		left: WIDTH - PADDLE_OFFSET
	});
	$('#ping-pong').append(paddle1, paddle2);
}

function addPaddleListener() {
	$('#ping-pong').mousemove(function(event) {
		var currentY = event.pageY;
		currentY -= Number($(this).css('margin-top').replace('px', ''))
		currentY -= $(this).position().top;
		if (currentY <= PADDLE_HEIGHT / 2) {
			$('.paddle').css('top', '0px');
		} else if (currentY >= HEIGHT - (PADDLE_HEIGHT / 2)) {
			$('.paddle').css('top', HEIGHT - PADDLE_HEIGHT + 'px');
		} else {
			$('.paddle').css('top', currentY - PADDLE_HEIGHT / 2 + 'px');
		}
	});
}

function addBall() {
	var ball = $('#ball');
	$(ball).width(BALL_RADIUS * 2).height(BALL_RADIUS * 2);
	$(ball).css({
		top: HEIGHT / 2 - BALL_RADIUS,
		left: WIDTH / 2 - BALL_RADIUS,
	});
	$(ball).show();
}

function addStart() {
	var start = $('#start');
	$(start).width(START_WIDTH).height(START_HEIGHT);
	$(start).css({
		marginTop: (-START_HEIGHT) / 2 + 'px',
		marginLeft: (-START_WIDTH) / 2 + 'px',
	});
	$('#level').text(level + 1);
	$('#ping-pong').append(start);
}

function addStartListener() {
	$('#start').click(function(event) {
		$(this).slideUp('slow', function() {
			if (!alreadyStarted) startBall();
		});
	});
}

function startBall() {
	alreadyStarted = true;
	addBall();
	vx = 1.5 + 0.1 * level;
	vy = (Math.random() * (vx - 1.5) + 1.5).toFixed(4);
	if (Math.random() > 0.5) vx = -vx;
	if (Math.random() > 0.5) vy = -vy;
	var delay = 5;
	vx = Number(vx);
	vy = Number(vy);
	moveBallInterval = setInterval(moveBall, delay);
}

var moveBall = (function() {
	var cooldown = 0;
	var gameOver = false;
	var streak = 0;
	return function() {
		var ball = $('#ball');
		var currentX = Number(ball.css('left').replace('px', ''));
		var currentY = Number(ball.css('top').replace('px', ''));
		if (!gameOver) {
			ball.css({
				left: currentX + Number(vx) + 'px',
				top: currentY + Number(vy) + 'px'
			});
		}
		if (currentY <= 0) {
			ball.css('top', '1px');
			vy = -vy;
		}
		if (currentX <= 0) {
			gameOver = true;
		}
		if ((currentX + BALL_RADIUS * 2) >= WIDTH ) {
			gameOver = true;
		}
		if ((currentY + BALL_RADIUS * 2) >= HEIGHT) {
			ball.css('top', HEIGHT - (BALL_RADIUS * 2) - 1 + 'px');
			vy = -vy;
		}
		if (ball.collision('.paddle').length >= 1 && cooldown == 0) {
			vx = -vx;
			cooldown = 10;
			streak++;
		}

		if (streak != 0 && streak % 5 == 0) {
			level += 2; // actually only one level is added
			gameOver = true;
		}

		if (gameOver) {
			if (level > 0) level--;
			$(ball).hide();
			alreadyStarted = false;
			clearInterval(moveBallInterval);
			$('#level').text(level + 1);
			$('#start').slideDown('slow');
			streak = 0;
			gameOver = false;
		}
		if (cooldown > 0) cooldown--;
	}
})();