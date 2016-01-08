var $flipper = $('.flipper');
var $word = $('.word');
var flipperAngle = 0;
var arrayOfWords = [];
var totalWords;

$(document).ready(function() {
 	$.get('assets/lexicon.txt', function(data) {
    	createArrayOfWords(data);
	});
 });

function flipCard(direction) {
	if (direction == 'top') {
		flipperAngle += 360;
	} else if (direction == 'bottom') {
		flipperAngle -= 360;
	}
	var angleValue= "rotateX(" + flipperAngle + "deg)";
	$flipper.css({
		transform: angleValue,
		webkitTransform: angleValue
	});
	setTimeout(function() {
		$word.text(getRandomWord());
	}, 500);
}

function createArrayOfWords(lexicon) {
	var lexiconLength = lexicon.length;
	var currentWord = '';
	for (var i = 0; i < lexiconLength; i++) {
		if (lexicon[i] == '\n') {
			if (currentWord.length != 0 &&
			 	currentWord.length <= 15) {
				arrayOfWords.push(currentWord);
			}
			currentWord = '';
		} else {
			currentWord += lexicon[i];
		}
	}
	totalWords = arrayOfWords.length;
}

function getRandomWord() {
	var index = Math.floor(Math.random() * totalWords - 1);
	return arrayOfWords[index];
}