var game = new guessingGame();
var $bubble = $('.bubble pre');

$(document).ready(function() {
	$('#play').click(function(event) {
		if (!game.isStarted) startGame();
	});
	$('#yes').click(function(event) {
		handleAnswer('y');
	});
	$('#no').click(function(event) {
		handleAnswer('n');
	});
});

function startGame() {
	game = new guessingGame();
	game.isStarted = true;
	$('#play').slideUp('slow', function() {
		$('#yes').slideDown('400', function() {
			$('#no').slideDown('400', function() {
				$bubble.text('Is the\nnumber\n' + game.firstGuess + '?');
				$('#play').css('font-size', '50px').text('Again');
			});
		});
	});
}

function handleAnswer(answer) {
	// shows final result
	if (game.isGuessed) {
		showResult(answer);
		return;
	}
	// executed if first question get answer 'yes'
	if (game.totalGuesses == 0 && answer == 'y') {
		showResult(answer);
		game.isGuessed = true;
		return;
	}
	// handle the final 'odd-even' question
	if (game.max - game.min == 1) {
		showFinalGuess(answer);
		game.isGuessed = true;
		game.totalGuesses++;
		return;
	}
	// guess is not included
	if (game.totalGuesses == 1) {
		if (game.currentDirection == '>') {
			if (answer == 'y') game.min = game.currentGuess + 1;
			if (answer == 'n') game.max = game.currentGuess - 1;
		} else if (game.currentDirection == '<') {
			if (answer == 'y') game.max = game.currentGuess - 1;
			if (answer == 'n') game.min = game.currentGuess + 1;
		}
		game.currentGuess = Math.floor((game.min + game.max) / 2);
	}
	// guesses are included
	if (game.totalGuesses > 1) {
		if (game.currentDirection == '>') {
			if (answer == 'y') game.min = game.currentGuess;
			if (answer == 'n') game.max = game.currentGuess;
		} else if (game.currentDirection == '<') {
			if (answer == 'y') game.max = game.currentGuess;
			if (answer == 'n') game.min = game.currentGuess;
		}
		game.currentGuess = Math.floor((game.min + game.max) / 2);
	}
	// show the final 'odd-even' question
	if (game.max - game.min == 1) {
		game.currentDirection = (Math.random() > 0.5) ? '>' : '<';
		if (game.currentDirection == '>') {
			$bubble.text('Is your\nnumber\n even?');
		} else if (game.currentDirection == '<') {
			$bubble.text('Is your\nnumber\n odd?');
		}
		game.totalGuesses++;
		return;
	}
	askDirection();
	game.totalGuesses++;
}
// asking 'greater-less' questions
function askDirection() {
	game.currentDirection = (Math.random() > 0.5) ? '>' : '<';

	if (game.currentDirection == '>') {
		$bubble.text('Is it\ngreater than\n' + game.currentGuess + '?');
	} else if (game.currentDirection == '<') {
		$bubble.text('Is it\nless than\n' + game.currentGuess + '?');
	}
}
// function to handle the answer to 'odd-even' question
function showFinalGuess(answer) {
	if (game.currentDirection == '>') {
			if (answer == 'y') {
				if (game.min % 2 == 0) {
					$bubble.text('Your number\nmust be\n' + game.min + '!');
				} else if (game.max % 2 == 0) {
					$bubble.text('Your number\nmust be\n' + game.max + '!');
				}
			} else if (answer == 'n') {
				if (game.min % 2 != 0) {
					$bubble.text('Your number\nmust be\n' + game.min + '!');
				} else if (game.max % 2 != 0) {
					$bubble.text('Your number\nmust be\n' + game.max + '!');
				}
			}
	} else if (game.currentDirection == '<') {
		if (answer == 'y') {
			if (game.min % 2 != 0) {
				$bubble.text('Your number\nmust be\n' + game.min + '!');
			} else if (game.max % 2 != 0) {
				$bubble.text('Your number\nmust be\n' + game.max + '!');
			}
		} else if (answer == 'n') {
			if (game.min % 2 == 0) {
				$bubble.text('Your number\nmust be\n' + game.min + '!');
			} else if (game.max % 2 == 0) {
				$bubble.text('Your number\nmust be\n' + game.max + '!');
			}
		}
	}
}
// show final result and let restart
function showResult(answer) {
	if (answer == 'y') {
		$bubble.text('I guessed!\nIt took me\n' +
		(game.totalGuesses+1) + " tr" + ((game.totalGuesses+1 == 1) ? "y." : "ies."));
	} else if (answer == 'n') {
		$bubble.text('\nYou cheater!');
	}

	$('#no').slideUp('400', function() {
		$('#yes').slideUp('400', function() {
			$('#play').slideDown('slow', function() {
				game = new guessingGame();
			});
		});
	});
}
// all the necessary data for guessing
function guessingGame() {
	this.min = 1; // also used as a left hand for guessing
	this.max = 100; // also used as a right hand for guessing
	this.isStarted = false;
	this.isGuessed = false;
	this.totalGuesses = 0;
	this.currentDirection = '';
	this.firstGuess = Math.floor((Math.random() * 81) + 10);
	this.currentGuess = this.firstGuess;
}