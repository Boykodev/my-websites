$(document).ready(function() {
	//tile object prototype.
	function tile(index, row, col) {
		this.index = index;
		this.row = row;
		this.col = col;
	};
	//array of all tile objects
	var tiles = [];
	var activeTile;
	var movingInProgress = false;

	initTiles();

	function initTiles() {
		var rows = 4;
		var cols = 4;
		var size = 125;
		var index = 15;

		var offsetX = 1;
		for (var i = 0; i < rows; i++) {
			var offsetY = 1;
			for (var j = 0; j < cols; j++) {

				//handle last two tiles position
				if (index == 2) index = 1;
				if (index == 0) index = 2;

				//creates an empty tile
				if (i == rows - 1 && j == cols - 1) index = 0;

				//create tiles
				$tile = $('<div></div>');
				if (index == 0) { $tile.addClass('empty'); }

				//init the tile object
				tiles[index] = new tile(index, i, j);

				//click events for tiles and empty space
				if (index > 0) {
					$tile.click(function(event) { makeActive($(this)); });
				} else {
					$tile.click(function(event) { moveActiveTile(); });
				}

				$tile.addClass('tile')
				.attr('id', 'tile-' + index)
				.text(index--)
				.css({
					marginLeft: size * j + (offsetY++) + 'px',
					marginTop: size * i + offsetX + 'px'
				});

				$('.board').append($tile);
			};
			offsetX++;
		};
	}

	function makeActive($tile) {
		$('#tile-' + activeTile)
		.css('border', '2px solid black');
		activeTile = $tile.text();
		if (isMoveable(activeTile)) {
			$tile.css('border', '2px solid orange');
		} else {
			$tile.css('border', '2px solid red');
		}
	}

	function moveActiveTile() {
		if (activeTile == undefined) return;
		if (movingInProgress) return;
		if (isMoveable(activeTile)) {
			/* to move a tile we exchange the values of left and
			 * top margins of the tile we want to move and the empty
			 * "dummy tile" that is used especially for that.
			 */
			$active = $('#tile-' + activeTile);
			var marginLeftActive = $active.css('margin-left');
			var marginTopActive = $active.css('margin-top');

			$empty = $('.empty');
			var marginLeftEmpty = $empty.css('margin-left');
			var marginTopEmpty = $empty.css('margin-top');

			//updating tiles margin
			movingInProgress = true;
			$active.animate({
				marginLeft: marginLeftEmpty,
				marginTop: marginTopEmpty},
				250, function() {
				movingInProgress = false; 
			});
			$empty.css({
				marginLeft: marginLeftActive,
				marginTop: marginTopActive
			});

			//updating tiles position (swaping)
			var temp = { row:tiles[0]['row'], col:tiles[0]['col'] };
			tiles[0]['row'] = tiles[activeTile]['row'];
			tiles[0]['col'] = tiles[activeTile]['col'];

			tiles[activeTile]['row'] = temp['row'];
			tiles[activeTile]['col'] = temp['col'];
		}
	}

	function isMoveable(index) {
		if ((tiles[0]['row'] == tiles[index]['row'] || tiles[0]['col'] == tiles[index]['col'])
			&& (Math.abs(tiles[0]['row'] - tiles[index]['row']) == 1
			 || Math.abs(tiles[0]['col'] - tiles[index]['col']) == 1)) {
			return true;
		} else {
			return false;
		}
	}
});