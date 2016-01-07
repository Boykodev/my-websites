/** Declaring Breakout constants*/
// Dimensions of the game board
	var WIDTH = 400;
	var HEIGHT = 600;
// Dimensions of the paddle
	var PADDLE_WIDTH = WIDTH / 5;
	var PADDLE_HEIGHT = 10;
// Offset of the paddle up from the bottom
	var PADDLE_Y_OFFSET = 30;
// Number of bricks per row
	var NBRICKS_PER_ROW = 10;
// Number of rows of bricks
	var NBRICK_ROWS = 10;
// Separation between bricks
	var BRICK_SEP = 4;
// Width of a brick
	var BRICK_WIDTH =
		(WIDTH - (NBRICKS_PER_ROW - 1) * BRICK_SEP) / NBRICKS_PER_ROW;
// Height of a brick
	var BRICK_HEIGHT = 8;
// Radius of the ball in pixels
	var BALL_RADIUS = 10;
// Offset of the top brick row from the top
	var BRICK_Y_OFFSET = 70;
// Start dialog dimensions
	var START_WIDTH = WIDTH / 2;
	var START_HEIGHT = HEIGHT / 4;
// Intervals
var moveBallInterval;
// Globals
var alreadyStarted = false;
var lives = 3;
var totalBricks = 0;
var restart = false;
var bounce = new Audio('assets/bounce.mp3');

// Counter of removed bricks
var counter = 0;
// Ball velocity
var vx, vy;

$(document).ready(function() {
	addInfoBoxes();
	drawBricks();
	drawPaddle();
	addPaddleListener();
	addStartListener();
});

function addInfoBoxes() {
	var $totalLives = $('#total-lives');
	var $totalBricks = $('#total-bricks');
	var $start = $('#start');
	$.merge($totalLives, $totalBricks).width(WIDTH / 8).
	height(PADDLE_Y_OFFSET).show('slow');
	$start.width(START_WIDTH).height(START_HEIGHT);
	$start.css({
		marginTop: (-START_HEIGHT) / 2 + 'px',
		marginLeft: (-START_WIDTH) / 2 + 'px',
	});
	$start.slideDown('slow');
}

var drawBricks = (function(){
	var originX = (WIDTH - ((NBRICKS_PER_ROW - 1) *
	BRICK_SEP + NBRICKS_PER_ROW * BRICK_WIDTH)) / 2;
	var originY = BRICK_Y_OFFSET;
	return function() {
		for (var i = 0; i < NBRICK_ROWS; i++) {
			for (var j = 0; j < NBRICKS_PER_ROW; j++) {
				var brick = document.createElement('div');
				$(brick).width(BRICK_WIDTH).height(BRICK_HEIGHT);
				$(brick).addClass('brick');
				
				if (i == 0 || i == 1) {
					$(brick).css('background-color', 'red');
				} else if (i == 2 || i == 3) {
					$(brick).css('background-color', 'orange');
				} else if (i == 4 || i == 5) {
					$(brick).css('background-color', 'yellow');
				} else if (i == 6 || i == 7) {
					$(brick).css('background-color', 'green');
				} else if (i == 8 || i == 9) {
					$(brick).css('background-color', 'cyan');
				}
				$(brick).css({
					left: originX + (BRICK_WIDTH + BRICK_SEP) * j + 'px',
					top: originY + (BRICK_HEIGHT + BRICK_SEP) * i + 'px',
					position: 'absolute',
					display: 'none'
				});
				$('#breakout').append(brick);
				$(brick).slideDown('slow');
			}
		}
	}
})();

function drawPaddle() {
	var paddle = document.createElement('div');
	$(paddle).width(PADDLE_WIDTH).height(PADDLE_HEIGHT);
	$(paddle).attr('id', 'paddle');
	$(paddle).css({
		left: (WIDTH - PADDLE_WIDTH) / 2,
		top: HEIGHT - PADDLE_Y_OFFSET - PADDLE_HEIGHT,
		position: 'absolute'
	});
	$('#breakout').append(paddle);
}

function addPaddleListener() {
	$('#breakout').mousemove(function(event) {
		var currentX= event.pageX;
		currentX -= Number($(this).css('margin-left').replace('px', ''))
		currentX -= $(this).position().left;
		if (currentX <= PADDLE_WIDTH / 2) {
			$('#paddle').css('left', '0px');
		} else if (currentX >= WIDTH - (PADDLE_WIDTH / 2)) {
			$('#paddle').css('left', WIDTH - PADDLE_WIDTH + 'px');
		} else {
			$('#paddle').css('left', currentX - PADDLE_WIDTH / 2 + 'px');
		}
	});
}

function addStartListener() {
	$('#start').click(function(event) {
		$(this).slideUp('slow', function() {
			if (!alreadyStarted) startBall();
		});
	});
}

function drawBall() {
	var ball = $('#ball');
	$(ball).width(BALL_RADIUS * 2).height(BALL_RADIUS * 2);
	$(ball).attr('id', 'ball');
	$(ball).css({
		left: WIDTH / 2 - BALL_RADIUS,
		top: HEIGHT / 2 - BALL_RADIUS,
		backgroundColor: 'white',
		borderRadius: '50%',
		position: 'absolute'
	});
	$('#breakout').append(ball);
}

/** Rolls the ball.*/
function startBall() {
	alreadyStarted = true;
	if (restart) restartGame();
	drawBall();
	$('#ball').show('fast', function() {
		vy = 5;
		vx = (Math.random() * (vy - 1.5) + 1.5).toFixed(4);
		if (Math.random() > 0.5) vx = -vx;
		var delay = 10;
		vx = Number(vx);
		vy = Number(vy);
		moveBallInterval = setInterval(moveBall, delay);
	});
	
}

var moveBall = (function() {
	var cooldown = 0;
	var gameOver = false;
	return function() {
		var ball = $('#ball');
		var currentX = Number(ball.css('left').replace('px', ''));
		var currentY = Number(ball.css('top').replace('px', ''));
		if (counter < NBRICKS_PER_ROW * NBRICK_ROWS) {
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
			ball.css('left', '1px');
			vx = -vx;
		}
		if ((currentX + BALL_RADIUS * 2) >= WIDTH ) {
			ball.css('left', WIDTH - (BALL_RADIUS * 2) - 1 + 'px');
			vx = -vx;
		}
		if ((currentY + BALL_RADIUS * 2) >= HEIGHT) {
			ball.css('top', HEIGHT - (BALL_RADIUS * 2) - 1 + 'px');
			$('#total-lives').html(--lives);
			gameOver = true;
		}
		if (cooldown == 0) {
			if (checkForCollisions(ball)) {
				cooldown = 10;
			}
		}
		if (cooldown != 0) cooldown--;
		if (totalBricks == 100) gameOver = true;
		if (gameOver) {
			clearInterval(moveBallInterval);
			$(ball).hide();
			alreadyStarted = false;
			if (lives == 0) newGame();
			if (totalBricks == 100) winner();
			$('#start').slideDown('slow');
			gameOver = false;
		}
	}
})();

function checkForCollisions(ball) {
	var bricks = ball.collision('.brick');
	if (bricks.length > 0) {
		$('#total-bricks').html(++totalBricks);
		bricks[0].remove();
		bounce.play();
		vy = -vy;
		return true;
	} else if (ball.collision('#paddle').length > 0) {
		vy = -vy;
		return true;
	} else {
		return false;
	}
}

function newGame() {
	$('#start').children('p').first().html('GAME<br>OVER');
	$('#start').children('p').last().html('Click to restart.');
	$('.brick').remove();
	drawBricks();
	lives = 3;
	restart = true;
}

function winner() {
	$('#start').children('p').first().html("Congratulations!<br>You've done it!");
	$('#start').children('p').last().html('Play again?');
	drawBricks();
	lives = 3;
	restart = true;
}

function restartGame() {
	$('#start').children('p').first().html('Remove all the bricks!');
	$('#start').children('p').last().html('Click to start.');
	totalBricks = 0;
	$('#total-lives').html(lives);
	$('#total-bricks').html(totalBricks);
	restart = false;
}