$(document).ready(function () {
	$('textarea').focus();

	$('form').on('submit', function (event) {
		event.preventDefault();

		var text = $('textarea').val();
		var y = 0;

		if (text.replace(/^\s+|\s+$/g, '') == '') {
			text = 'Teleprompters are awesome.\n\n' +
			'Putting a half-silvered mirror in front of the camera\
			so the talent can read magically floating white letters\
			scrolling upward while looking straight down the barrel\
			of the camera lens is a great way to save the trouble of memorizing\
			lengthy scripts and make shoots go faster, smoother and better.\n\n' +
			'Even without a mirror, you can put a laptop below, or above,the\
			camera to achieve almost the same thing.'
		}

		$('body').css('background-color', '#090919');
		$('#container').html('<div id="screen">' + text + '</div>')
		
		scrollText(y);

		function scrollText(y) {
			setTimeout(function () {
				var newY = y;
				var height = $('#screen').height();

				if (newY > -1 * height - 500) {
					newY -= 1;
					$('#screen').css('top', newY);

					scrollText(newY);
				}
			}, 30);
		};

	});
});