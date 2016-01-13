$(document).ready(function() {
	var popSound = new Audio('assets/pop.mp3');
	$.ajax({
		url: 'assets/pop.mp3',
		url: 'assets/wrap-1.png',
		url: 'assets/wrap-2.png',
		url: 'assets/wrap-3.png',
		url: 'assets/wrap-4.png',
		url: 'assets/wrap-5.png'
	});
	createBubbles();

	function createBubbles() {
		var bubbleSize = 76.18;
		var bubblesInRow = window.screen.width / bubbleSize + 3;
		var bubblesInCol = window.screen.height / bubbleSize + 3;
		for (var i = 0; i < bubblesInRow; i++) {
			for (var j = 0; j < bubblesInCol; j++) {
				$('body').append($('<div></div>')
					.css({
						cursor: 'pointer',
						borderRadius: '50%',
						position: 'absolute',
						width: bubbleSize + 'px',
						height: bubbleSize + 'px',
						marginLeft: i * bubbleSize + 
						((j % 2 == 0) ? 1 : (-36)) + 'px',
						marginTop: j * bubbleSize + 3 - 9.5*j + 'px'
					})
					.one('click', function(event) {
						popBubble($(this));
					})
				);
			}

		}
	}

	function popBubble($bubble) {
		var bgIndex = Math.floor((Math.random() * 5) + 1);
		$bubble.addClass('bg-' + bgIndex).css('cursor', 'default');
		popSound.play();
	}
});