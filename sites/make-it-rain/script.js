var dropbox = $('#drop-box');
var water = $('#water');
var duck = $('#duck');
var dropMakingInterval;
var dropFallingIntervals = [];
var rainIsFalling = false;
var totalDrops = 0;
var index = 0;

$(document).ready(function() {
	$('#make-rain').click(function(event) {
		if (!rainIsFalling) {
			dropMakingInterval = setInterval(dropMaking, 300);
			rainIsFalling = true;
		}
	});
	$('#stop-rain').click(function(event) {
		if (rainIsFalling) {
			clearInterval(dropMakingInterval);
			rainIsFalling = false;
		}
	});
});

function showHelp() { $('#info').fadeIn('slow'); }
function hideHelp() { $('#info').fadeOut('slow'); }

function dropMaking() {
	var drop = document.createElement('div');
	var rmargin = Math.floor(Math.random() * (200 - 15));
	$(drop).css({
		width: '9px',
		height: '12px',
		marginTop: '0px',
		position: 'absolute',
		marginLeft: rmargin + 'px',
		backgroundImage: 'url("assets/rain-drop.png")',
		backgroundSize: '100% 100%'
	});
	$(dropbox).append(drop);

	dropFallingIntervals[index] =
	setInterval(dropFalling, 10, drop, index);
	index++;
}

function dropFalling(drop, index) {
	var marginTop = $(drop).css('margin-top');
	marginTop = marginTop.replace('px', '');
	marginTop = Number(marginTop);
	marginTop += 1;
	$(drop).css('margin-top', marginTop + 'px');
	if (marginTop >= dropbox.height()) {
		clearInterval(dropFallingIntervals[index]);
		$(drop).remove();
		totalDrops++;
		updateWater();
	}
}

function updateWater() {
	if (water.height() + 200 < dropbox.height()) {
		// ±10 is made to create additional water for duck to float.
		water.height(Math.floor(totalDrops / 10) + 10);
		duck.css('bottom', water.height() - 10);
	}
}