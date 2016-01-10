$(document).ready(function() {
	$('#cp-left').ColorPicker({flat: true});
	$('#cp-left').ColorPickerSetColor('#4cb8c4');

	$('#cp-right').ColorPicker({flat: true});
	$('#cp-right').ColorPickerSetColor('#3cd3ad');

	setInterval(updateGradient, 100);
});

function updateGradient() {
	$('body').css('background-image', 'linear-gradient(' + '#' +
		$('#cp-left .colorpicker_hex input').val() + ', #' +
			$('#cp-right .colorpicker_hex input').val() + ')')
	.css('background-image', '-webkit-linear-gradient(' + '#' +
		$('#cp-left .colorpicker_hex input').val() + ', #' +
			$('#cp-right .colorpicker_hex input').val() + ')')
	.css('background-image', '-moz-linear-gradient(' + '#' +
		$('#cp-left .colorpicker_hex input').val() + ', #' +
			$('#cp-right .colorpicker_hex input').val() + ')')
	.css('background-image', '-o-linear-gradient(' + '#' +
		$('#cp-left .colorpicker_hex input').val() + ', #' +
			$('#cp-right .colorpicker_hex input').val() + ')');
}