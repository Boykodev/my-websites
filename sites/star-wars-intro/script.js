var buttonPressed = false;

$(document).ready(function() {
	$.ajax({
        url: 'assets/star-wars-intro.mp3',
        success: function() {
            $('#start-btn').text('START');
            $('#start-btn').click(function(event) {
				if (!buttonPressed) {
					buttonPressed = true;
					var code = $('#wrap').html();
					code = code.replace('<!--', ' ');
					code = code.replace('-->', ' ');
					$('#wrap').html(code);
					$('#start-btn').remove();
					setTimeout(function() {
		            	var audio = new Audio('assets/star-wars-intro.mp3');
		            	audio.play();
		            }, 2500);
				}
			});
        }
    });
});