$(document).ready(function() {
	setCellsPosition();
	$('.cells').click(function(event) {
		if (isEmpty($(this))) {
			fillCell($(this));
			submitResult();
		}
	});
});

function setCellsPosition() {
	var totalRows = 3; var totalCols = 3;
	for (var i = 0; i < totalRows; i++) {
		for (var j = 0; j < totalCols; j++) {
			var ml = i * 100 + 'px';
			var mt = j * 100 + 'px';
			var index = i * totalCols + j;
			$('.cell-' + index).css({
				marginLeft: ml,
				marginTop: mt
			});
		}
	}
}

function fillCell($cell) {
	if (putX()) {
		$cell.val('X');
	} else {
		$cell.val('O');
	}
}

function putX() {
	$cells = $('.cells');
	var totalCells = 0;
	var l = $cells.length;
	for (var i = 0; i < l; i++) {
		if (!isEmpty($cells.eq(i))) {
			totalCells++;
		}
	}
	return totalCells % 2 == 0;
}

function isEmpty($cell) { return $cell.val() == ''; }

function submitResult() {
	if ($('.btn').length != 1) {
		$('form').submit();
	}
}

function restart() {
	$cells = $('.cells'); var l = $cells.length;
	for (var i = 0; i < l; i++) {
		$cells.eq(i).val('');
	}
}