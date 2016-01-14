$(document).ready(function() {
	var audio = [];
	var quotes;
	var totalQuotes;
	var currentQuote = 0;

	$.ajax({
		url: '/php/bender-quotes.php',
		type: 'GET',
		success: function(json) {
			quotes = $.parseJSON(json);
			loadAudio();
			addClickListeners();
		},
		error: function() {
			alert('Error loading quotes.');
		}
	});

	function isPlaying() {
		for (var i in audio) {
			if (!audio[i].paused) {
				return true;
			}
		}
		return false;
	}

    function loadAudio() {
    	totalQuotes = quotes.length;
    	for (var i in quotes) {
    		$.ajax({
		        url: 'assets/' + quotes[i].audio,
		        indexValue: i,
		        success: function() {
		            audio[this.indexValue] = new Audio('assets/' +
		            	quotes[this.indexValue].audio);
		        }
		    });
    	}
    }

    function addClickListeners() {
    	$('#container div').click(function(event) {
			if (isPlaying()) return;
			if (currentQuote === totalQuotes) {
				currentQuote = 0;
			}
			audio[currentQuote++].play();
		});

		$('#container div').one('click', function(event) {
			$('.speech').hide('slow');
		});
    }
});