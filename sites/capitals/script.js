$(document).ready(function() {
	var rightAnswer;
	var rightCounter = 0;
	var totalCounter = 0;
	var capitals = [];

	var loadInterval;
	var loadTimeouts = [];
	addLoadingAnimation();

	$.ajax({
		url: '/php/capitals.php',
		type: 'GET',
		success: function(json) {
			capitals = $.parseJSON(json);
			clearLoading();
			$('.btn-2').text('Start').one('click', function(event) {
				startQuiz();
			});
		},
		error: function() {
			clearLoading();
			$('.btn-2').text('Error :(')
		}
	});

	function addLoadingAnimation() {
		loadInterval = setInterval(function() {
			// 4 timeouts to create an animation effect of moving dots
			loadTimeouts[0] = setTimeout(function() {
				$('.btn-2').text('Loading' + '');
			}, 0);

			loadTimeouts[1] = setTimeout(function() {
				$('.btn-2').text('Loading' + '.');
			}, 100);

			loadTimeouts[2] = setTimeout(function() {
				$('.btn-2').text('Loading' + '..');
			}, 200);

			loadTimeouts[3] = setTimeout(function() {
				$('.btn-2').text('Loading' + '...');
			}, 300);
		}, 400);
	}

	function clearLoading() {
		clearInterval(loadInterval);
		for (var i = 0; i < loadTimeouts.length; i++) {
			clearTimeout(loadTimeouts[i]);
		};
	}

	function startQuiz() { nextQuestion(); }
	
	function nextQuestion() {
		var TOTAL_COUNTRIES = 234;
		var id = Math.floor((Math.random() * TOTAL_COUNTRIES) + 1);

		$('.question').text('What is the capital of ' + capitals[id - 1]['country'] + '?')

		var rightAnswer = Math.floor((Math.random() * 3) + 1);
		$('.btn-' + rightAnswer).text(capitals[id - 1]['capital']);

		var wrongAnswer1, wrongAnswer2;

		while (true) {
			var wrongAnswer1 = Math.floor((Math.random() * TOTAL_COUNTRIES) + 1);
			var wrongAnswer2 = Math.floor((Math.random() * TOTAL_COUNTRIES) + 1);
			if (wrongAnswer1 !== id && wrongAnswer2 !== id &&
				wrongAnswer1 !== wrongAnswer2) break;
		}
		// placing wrong answers
		if (rightAnswer === 1) {
			$('.btn-2').text(capitals[wrongAnswer1 - 1]['capital']);
			$('.btn-3').text(capitals[wrongAnswer2 - 1]['capital']);
		} else if (rightAnswer === 2) {
			$('.btn-1').text(capitals[wrongAnswer1 - 1]['capital']);
			$('.btn-3').text(capitals[wrongAnswer2 - 1]['capital']);
		} else if (rightAnswer === 3) {
			$('.btn-1').text(capitals[wrongAnswer1 - 1]['capital']);
			$('.btn-2').text(capitals[wrongAnswer2 - 1]['capital']);
		}

		// special case for Sri Lanka capital
		if (id === 190 || wrongAnswer1 === 190 || wrongAnswer2 === 190) {
			$('.btn').css('line-height', '30px');
		} else {
			$('.btn').css('line-height', '40px');
		}
		// show left and right button
		$('.btn-1').show('400');
		$('.btn-3').show('400', function() {
			// listener for buttons when capitals are on them
			$('.btn').one('click', function(event) {
				totalCounter++;
				if ($(this).hasClass('btn-' + rightAnswer)) {
					rightCounter++;
					showResult('+');
				} else {
					showResult('-');
				}
			});
		});
	}

	function showResult(result) {
		// prevent clicking other buttons when choice is made
		$('.btn').off();
		// hide left and right button
		$('.btn-1').hide('400');
		$('.btn-3').hide('400', function() {
			// here second button has a 'Next' label
			$('.btn-2').one('click', function(event) {
				nextQuestion();
			});
		});
		if (result === '+') {
			$('.question').html('That is correct!<br>Your current score is:<br>'
				+ rightCounter + '/' + totalCounter);
			$('.btn-2').text('Next');
		} if (result === '-') {
			$('.question').html('Nope!<br>Your current score is:<br>'
				+ rightCounter + '/' + totalCounter);
			$('.btn-2').text('Next');
		}
	}

});