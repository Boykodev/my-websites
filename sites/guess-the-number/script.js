var game = new guessingGame();

$(document).ready(function() {
	$('.guess-button').click(function(event) {
		if (!game.isGuessed) {
			if (isValidInput()) {
				checkTheGuess();
			} else {
				alert('Please enter a proper number');
				$('#guess').val('');
			}
		}
	});
	$('#guess-form').submit(function(event) {
		event.preventDefault();
		$('.guess-button').trigger('click');
	});
});

function isValidInput() {
	var guessValue = $('#guess').val();
	if (guessValue >= game.min && guessValue <= game.max) {
		return true;
	} else {
		return false;
	}
}

function checkTheGuess() {
	var guessValue = $('#guess').val();
	$('#guess').val('');
	if (Math.abs(guessValue - game.number) > 50) {
		showResult('Antarctica cold!');
	} else if (Math.abs(guessValue - game.number) > 40) {
		showResult('Siberia cold!');
	} else if (Math.abs(guessValue - game.number) > 30) {
		showResult('Very Cold!');
	} else if (Math.abs(guessValue - game.number) > 20) {
		showResult('Cold');
	} else if (Math.abs(guessValue - game.number) > 10) {
		showResult('Warm');
	} else if (Math.abs(guessValue - game.number) > 1) {
		showResult('Hot!');
	} else if (Math.abs(guessValue - game.number) == 1) {
		showResult('Hot, hot, hot!');
	} else if (guessValue == game.number){
		game.isGuessed = true;
		showResult('You have guessed the number!<br>\
			<button class="restart btn" onclick="restartGame()">RESTART</div>');
	}
	setTemperature(Math.abs(guessValue - game.number));
}

function setTemperature(diff) {
	if (diff == 0) {
		var level = 705;
	} else {
		var level = 702 - diff * 10;
		if (level < 202) level = 202;
	}
	$('.level').css('height', level + 'px');
}

function showResult(result) {
	var $result = $('.result');
	$result.slideUp('slow', function() {
		$result.html(result);
		$result.slideDown('slow');
	});
}

function restartGame() {
	game = new guessingGame();
	$('.result').slideUp('slow');
	$('.level').css('height', '202px');
}

function guessingGame() {
    this.min = 1;
    this.max = 100;
    this.isGuessed = false;
    this.number = Math.floor((Math.random() * this.max) + this.min);
}