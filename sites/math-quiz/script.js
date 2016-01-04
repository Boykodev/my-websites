var quizStarted = false;
var ready = false;
var lastButton = -1;
var rightAnswer = 0;
var difficulty = "";
var totalQuestions = 10;
var correctCount = 0;

function buttonPressed(b) {
	if (!quizStarted) {
		quizStarted = true;
		if (b == 0) difficulty = "easy";
		if (b == 1) difficulty = "normal";
		if (b == 2) difficulty = "hard";
		if (!ready) {
			getReady();
			ready = true;
		} else {
			getExp();
			totalQuestions--;
		}
	} else if (totalQuestions != 0) {
		lastButton = b;
		var currentButton = document.getElementsByClassName('buttons')[b];
		if (currentButton.innerHTML == rightAnswer) correctCount++;
		totalQuestions--;
		getExp();
	} else if (lastButton != -1){
		var currentButton = document.getElementsByClassName('buttons')[b];
		if (currentButton.innerHTML == rightAnswer) correctCount++;
		showResult();
	}
}

function getReady() {
	var expression = document.getElementById('expression');
	var buttons = document.getElementsByClassName('buttons');
	expression.innerHTML = "Get ready for 10 questions.";
	buttons[0].innerHTML = "Let's go!";
	buttons[1].innerHTML = "Ready!";
	buttons[2].innerHTML = "Bring it on!";
}

function getExp() {
	if (difficulty == "hard") {
		var n1 = Math.floor((Math.random() * 100) + 1);
		var n2 = Math.floor((Math.random() * 100) + 1);
	} else {
		var n1 = Math.floor((Math.random() * 50) + 1);
		var n2 = Math.floor((Math.random() * 50) + 1);
	}
	
	var expression = document.getElementById('expression');
	var buttons = document.getElementsByClassName('buttons');
	var op = randomOperator();
	expression.innerHTML = "" + n1 + " " + op + " " + n2 + " =";

	var choice = [];
	rightAnswer = getRightAnswer(n1, n2, op);
	choice[0] = rightAnswer;
	while (true) {
		var shift1 = Math.floor((Math.random() * 5) - 5);
		var shift2 = Math.floor((Math.random() * 5) - 5);
		choice[1] = getRightAnswer(n1 + shift1, n2 + shift2, op);
		if (choice[1] != choice[0]) break;
	}
	while (true) {
		var shift1 = Math.floor((Math.random() * 5) - 5);
		var shift2 = Math.floor((Math.random() * 5) - 5);
		choice[2] = getRightAnswer(n1 + shift1, n2 + shift2, op);
		if (choice[2] != choice[1] && choice[2] != choice[0]) break;
	}
	shuffleArray(choice);
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].innerHTML = choice[i];
	}
}

function randomOperator() {
	var op;
	if (difficulty == "easy") op = Math.floor(Math.random() * 2);
	if (difficulty == "normal" || difficulty == "hard") {
		op = Math.floor(Math.random() * 3);
	}
	switch (op) {
		case 0:
			return "+";
		case 1:
			return "-";
		case 2:
			return "*";
		default:
			return "/";
	}
}

function getRightAnswer(n1, n2, op) {
	switch (op) {
		case "+":
			return (n1 + n2);
		case "-":
			return (n1 - n2);
		case "*":
			return (n1 * n2);
		default:
			return (n1 / n2);
	}
}

function showResult() {
	var expression = document.getElementById('expression');
	var buttons = document.getElementsByClassName('buttons');
	expression.innerHTML = "You have " + correctCount + " correct answers." +
	"<br>" + "Try again?";
	buttons[0].innerHTML = "Easy";
	buttons[1].innerHTML = "Normal";
	buttons[2].innerHTML = "Hard";
	restart();
}

function restart() {
	quizStarted = false;
	lastButton = -1;
	rightAnswer = 0;
	difficulty = "";
	totalQuestions = 10;
	correctCount = 0;
}

/**
 * Randomize array element order in-place.
 * Using Fisher-Yates shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}