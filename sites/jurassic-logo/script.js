var flipperAngle = 0;

$(document).ready(function() {
	$('.jurassic').one('click', function(event) {
		var $movie = $(this);
		var counter = $('.jurassic').length;
		$('.jurassic').fadeOut('slow', function() {
			counter--;
			if (counter == 0) {
				$('form p:first').text('Click on logo to flip it!')
				.css('margin-bottom', '50px');
				if ($movie.hasClass('park')) {
					$('.jurassic-park-logo').fadeIn('slow');
				}
				if ($movie.hasClass('world')) {
					$('.jurassic-world-logo').fadeIn('slow');
				}
			}
		});
	});
});

function flipLogo(direction, movie) {
	if (movie == 'park') {
		$flipper = $('.jurassic-park-logo');
	} else if (movie == 'world') {
		$flipper = $('.jurassic-world-logo');
	}

	if (direction == 'right') {
		flipperAngle += 360;
	} else if (direction == 'left') {
		flipperAngle -= 360;
	}
	var angleValue= "rotateY(" + flipperAngle + "deg)";
	$flipper.css({
		transform: angleValue,
		webkitTransform: angleValue
	});
}