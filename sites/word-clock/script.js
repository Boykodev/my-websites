$(document).ready(function() {
	setInterval(updateTime, 1000);

	function updateTime() {
		var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();

		$('span').css('color', 'black'); // clear all previous colors
		$('span').css('border-bottom', 'none'); // clear all underlines
		$('span').css('outline', 'none'); // clear all outlines

		$('span:nth-child(' + (h + 1) + ')').css('color', '#DD0048');

		if (m === h) {
			$('span:nth-child(' + (m + 1) + ')')
			.css('outline', '3px dotted #39FF14');
		} else {
			$('span:nth-child(' + (m + 1) + ')').css('color', '#39FF14');
		}

		if (s === h || s === m) {
			$('span:nth-child(' + (s + 1) + ')')
			.css('border-bottom', '3px solid cyan');
		} else {
			$('span:nth-child(' + (s + 1) + ')').css('color', 'cyan');
		}
	    
	}
});