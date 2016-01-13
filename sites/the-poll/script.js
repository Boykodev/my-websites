$(document).ready(function() {
	var BUTTON_WIDTH = 200;
	var BUTTON_HEIGHT = 75;
	var BUTTON_MARGIN = 50;
	// flag variable to check if 'No' button haven't been removed already
	var noRemoved = false;

	$('#yes').one('click', function(event) {
		noRemove();
		$('#yes').animate({ width: '500px' },
			1000, function() {
				drawText();
		});
	});

	$('#no').hover(function() {
		var randomX = getRandomX();
		var randomY = getRandomY();
		// timeout gives a chance of clicking on button
		setTimeout(function() {
			$('#no').css({ left: randomX, top: randomY });
		}, 40)
	}, function(){});

	// this prevents cheating with tab :)
	$('#no').focus(function(event) {
		$('#no').trigger('mouseover');
		$('#no').trigger('blur');
	});

	$('#no').one('mousedown', function(event) {
		noRemove();
		alert('Oops! You clicked too hard and destroyed this button!');
	});

	// animate text using timeouts
	function drawText() {
		var text = 'Thanks for your feedback !!!'
		var index = 0;

		for (var i = 0; i < text.length; i++) {
			setTimeout(function() {
				$('#yes').text(text.substring(0, ++index));
			}, 80 * i)
			if (i + 1 >= text.length) {
				setTimeout(function() {
					showStatistic();
				}, 80 * i)
			}
		};
	}

	function showStatistic() {
		$('.yes-bar').animate({ height: '450px' },
			1000, function() {
			$(this).text('100 %');
		});
		$('.no-bar').animate({ height: '5px' }, 500);
	}

	// remove 'No' button if it's not already removed
	function noRemove() {
		if (!noRemoved) {
			$('#no').off;
			$('#no').remove();
			noRemoved = true;
		}
	}

	function getRandomX() {
		var maxWidth = $(window).width() - BUTTON_WIDTH - BUTTON_MARGIN;
		var minWidth = -BUTTON_MARGIN;
		return Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
	}

	function getRandomY() {
		var maxHeight = $(window).height() - BUTTON_HEIGHT;
		var minHeight = 150;
		return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
	}
});