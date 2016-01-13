$(document).ready(function() {
	// Sound for messages
	var sendSound = new Audio('assets/ios-message-send-sound.mp3');
	var receiveSound = new Audio('assets/ios-message-receive-sound.mp3');
	$.ajax({
        url: 'assets/ios-message-send-sound.mp3',
        url: 'assets/ios-message-receive-sound.mp3'
    });

	$('#btn-ys').click(function(event) { sendAs('ys'); });
	$('#btn-sb').click(function(event) { sendAs('sb'); });

	$('body').keypress(function(event) {
		if (event.which == 13 && event.shiftKey) {
			event.preventDefault();
			sendAs('ys');
		} else if (event.which == 13 && event.ctrlKey) {
			event.preventDefault();
			sendAs('sb');
		}
	});

	function sendAs(from) {
		// Prevent sending empty message
		if (!$('#message-box').val().trim()) return;

		var $message = $('<div></div>');
		$message.addClass('from-' + from)
		.css('display', 'none');
		// Because initially message has property of 'display: none'
		// the dummy is used to make scroll go all the way to the bottom
		var $dummy = $('<div></div>');
		$dummy.addClass('dummy')
		.addClass('from-' + from);

		var text = $('#message-box').val();
		$message.append('<p>' + text + '</p>');
		$('#message-box').val('');

		$dummy.html($message.html());

		var $clear = $('<div></div>');
		$clear.addClass('clear');

		$('#showcase').append($message);
		$('#showcase').append($dummy);
		
		$message.slideDown('slow', function() { $dummy.remove(); });
		playSound(from);

		$('#showcase').append($clear);
		// This is where scroll goes to the very bottom
		$('#showcase').scrollTop(Number.MAX_SAFE_INTEGER);
		// Allows sending messages again right away
		$('#message-box').trigger('focus');
	}

	function playSound(from) {
		if (from == 'ys') sendSound.play();
		if (from == 'sb') receiveSound.play();
	}

	$('#message-box').focus(function() {
	    $(this).attr('placeholder', '');
	});

	$('#message-box').blur(function() {
	    $(this).attr('placeholder',
		"Tip: Press 'Shift + Enter' to send as yourself" +
		"\nor press 'Ctrl + Enter' to send as somebody.");
	});
	// Make sure tip will show when site starts
	$('#message-box').trigger('blur');
});