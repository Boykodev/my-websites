$(document).ready(function() {
	var fanIsOn = false;

	$('#switch').click(function(event) {
		if (!fanIsOn) {
			startTheFan();
		} else {
			stopTheFan();
		}
	});
	function startTheFan() {
		$('.blades').css({
			'-webkit-animation-play-state': 'running',
			'-moz-animation-play-state': 'running',
			'-ms-animation-play-state': 'running',
			'-o-animation-play-state': 'running',
			'animation-play-state': 'running'
		});
		fanIsOn = true;
	}
	function stopTheFan() {
		$('.blades').css({
			'-webkit-animation-play-state': 'paused',
			'-moz-animation-play-state': 'paused',
			'-ms-animation-play-state': 'paused',
			'-o-animation-play-state': 'paused',
			'animation-play-state': 'paused'
		});
		fanIsOn = false;
	}
});