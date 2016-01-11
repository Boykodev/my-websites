$(document).ready(function() {
	$('#content').stickynote({
		size 			 : 'large',
		containment		 : 'content',
		event			 : 'dblclick'
	});
	$('#content').one('dblclick', function(event) {
		$('header p').fadeOut('slow');
	});
});