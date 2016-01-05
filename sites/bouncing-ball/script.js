var ball = document.getElementById('ball');
var bounceSound = new Audio('assets/bounce-sound.mp3');
var bouncing;
var GRAVITY = 0.5;
var BOUNCE_REDUCE = 0.9;
var yVel = 0;

var trackingMouseMoves = function(e) {     
  ball.style.left = e.pageX - 75 + "px";
  ball.style.top = e.pageY - 75 + "px";
};

function draggingStart() {
  clearInterval(bouncing);
  yVel = 0;
  document.addEventListener('mousemove', trackingMouseMoves);
}

function draggingStop() {
  document.removeEventListener('mousemove', trackingMouseMoves);
}

function startBall() {
  moveBall();
  bouncing = setInterval(moveBall, 15);
}

function moveBall() {
  if (getBallTopOffset() < getWindowHeight() - 200) {
    if (yVel < 50) {
      yVel += GRAVITY;
    }
    
    ball.style.top = getBallTopOffset() + yVel + "px";
  }
  if (getBallTopOffset() >= getWindowHeight() - 200) {
    ball.style.top = getWindowHeight() - 201 + "px";
    yVel = -yVel * BOUNCE_REDUCE;
    bounceSound.play();
    if (Math.abs(yVel) < 5) {
      clearInterval(bouncing);
    }
  }
}

function getWindowHeight() {
  var body = document.body,
    html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight,
 html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function getBallTopOffset() {
  var str = ball.style.top;
  str = str.replace("px", "");
  return Number(str);
}

function showHelp() {
  document.getElementById('info-text').innerHTML =
  '<pre>GRAB THE BALL<br>AND PLAY SOME<br>BOUNCING BALL!<pre>';
}

function hideHelp() {
  document.getElementById('info-text').innerHTML = '';
}