var prevTile;
var flips = 0;
var pairsCount = 0;
var oneTileOpened = false;
var TILE_SIZE = 128;

$(document).ready(addTiles());

function addTiles() {
	// Shift margin a little with each iteration
	var marginLeft = 0, marginTop = 0;
	var SHIFT = 18;
	// id to prevent "double-click" bug
	var id = 0;

	for (var i = 0; i < 6; i++) {
		marginLeft += SHIFT;
		marginTop = 0;
		for (var j = 0; j < 4; j++) {
			marginTop += SHIFT;
			var tile = $('<div class="tile" id="d' + id + '"></div>');
			$(tile).css('width', TILE_SIZE + "px");
			$(tile).css('height', TILE_SIZE + "px");
			$(tile).css('margin-top', TILE_SIZE * j + marginTop + "px");
			$(tile).css('margin-left', TILE_SIZE * i + marginLeft + "px");

			var front = $('<div class="front" onclick="flip($(this).parent())"></div>');
			var back = $('<div class="back"></div>');
			$(tile).append(front);
			$(tile).append(back);

			$("#frame").append(tile);
			id++;
		}
	}
	shuffleTiles();
	initTiles(); // all the heavy initialization is moved to this function
}

function showHelp() {
	document.getElementById('info-text').innerHTML =
	'<pre>Flip the tiles<br>and match<br>the pairs.<pre>';
}

function hideHelp() {
	document.getElementById('info-text').innerHTML = '';
}

function flip(element) {
	$(element).css("-webkit-transform", "rotateY(180deg)");
	$(element).css("transform", "rotateY(180deg)");

	if (oneTileOpened) {
		if ($(element).attr('id') != $(prevTile).attr('id') &&
			$(element).children('.back').attr('class') ===
			$(prevTile).children('.back').attr('class')) {
			pairsCount++;
		} else {
			// declaring local previous to avoid unclosed tiles
			var prev = prevTile;
			setTimeout(function(){closeTiles(element, prev);}, 1000);
		}
		oneTileOpened = false;
	} else {
		prevTile = element;
		oneTileOpened = true;
	}

	flips++;
	if (pairsCount == 12) gameOver();
}

function closeTiles(cur, prev) {
	$(cur).css("-webkit-transform", "rotateY(0deg)");
	$(cur).css("transform", "rotateY(0deg)");
	$(prev).css("-webkit-transform", "rotateY(0deg)");
	$(prev).css("transform", "rotateY(0deg)");
}

function shuffleTiles() {
    var tiles = $('.tile');
    var frame = $('#frame');
    var size = tiles.length;

    for (var i = 0; i < size * 10; i++) {
    	var rand = Math.floor(Math.random() * (size - 1));
    	var temp = tiles.get(rand);
        frame.append(temp);
    }
}

function gameOver() {
	$('#result').html("Nice Job!<br>It took you " + flips + 
		" flips for the complete match." +
		"<br>Reload the page to play again.");
}

function initTiles() {
	$('.front').css('background-image',
		'url(assets/tile.png)');

	$('.back:eq(0), .back:eq(1)').addClass('tile-0')
	.css('background-image', 'url(assets/angry-birds.png)');
	$('.back:eq(2), .back:eq(3)').addClass('tile-1')
	.css('background-image', 'url(assets/apple-maps.png)');
	$('.back:eq(4), .back:eq(5)').addClass('tile-2')
	.css('background-image', 'url(assets/facebook.png)');
	$('.back:eq(6), .back:eq(7)').addClass('tile-3')
	.css('background-image', 'url(assets/flappy-bird.png)');
	$('.back:eq(8), .back:eq(9)').addClass('tile-4')
	.css('background-image', 'url(assets/google-maps.png)');
	$('.back:eq(10), .back:eq(11)').addClass('tile-5')
	.css('background-image', 'url(assets/instagram.png)');
	$('.back:eq(12), .back:eq(13)').addClass('tile-6')
	.css('background-image', 'url(assets/lumosity.png)');
	$('.back:eq(14), .back:eq(15)').addClass('tile-7')
	.css('background-image', 'url(assets/mail.png)');
	$('.back:eq(16), .back:eq(17)').addClass('tile-8')
	.css('background-image', 'url(assets/omnifocus.png)');
	$('.back:eq(18), .back:eq(19)').addClass('tile-9')
	.css('background-image', 'url(assets/skype.png)');
	$('.back:eq(20), .back:eq(21)').addClass('tile-10')
	.css('background-image', 'url(assets/twitter.png)');
	$('.back:eq(22), .back:eq(23)').addClass('tile-11')
	.css('background-image', 'url(assets/weather.png)');
}