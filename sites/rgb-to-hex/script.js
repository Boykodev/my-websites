$(document).ready(function() {
	if (colorIsValid()) {
		$('body').css('background-color',
			$('.result').text().trim());
	} else {
		$('body').css('background-color', 'white');
	}
});

function colorIsValid() {
	return $('.result').text().indexOf('#') > -1;
}