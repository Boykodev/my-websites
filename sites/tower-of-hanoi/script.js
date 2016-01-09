var $currentDisk;
// stacks to track amount of disks
var peg1, peg2, peg3;
// counter for moves
var counter;
// 5 is default difficulty
var currentDiff = 5;
// used to show restart message only once
var restartMessage = false;

$(document).ready(function() {
	// default set-up
	initDisks(currentDiff);

	$('body').mouseup(function(event) {
		document.removeEventListener('mousemove', trackingMouseMoves);
		dropDiskOnPeg();
		$currentDisk.css({
			top: '',
			left: ''
		});
	});
	$('.help').click(function(event) {
		$('.restart-menu').slideUp('slow', function() {
			$('.help-text').slideToggle('slow');
		});
	});
	$('.restart').click(function(event) {
		$('.help-text').slideUp('slow', function() {
			$('.restart-menu').slideToggle('slow');
		});
	});
	$('#restart').click(function(event) {
		initDisks(currentDiff);
		$('.restart-menu').slideUp('slow');
	});
	$('#diff-3').click(function(event) {
		currentDiff = 3;
		$('#restart').trigger('click');
	});
	$('#diff-4').click(function(event) {
		currentDiff = 4;
		$('#restart').trigger('click');
	});
	$('#diff-4').click(function(event) {
		currentDiff = 4;
		$('#restart').trigger('click');
	});
	$('#diff-5').click(function(event) {
		currentDiff = 5;
		$('#restart').trigger('click');
	});
	$('#diff-6').click(function(event) {
		currentDiff = 6;
		$('#restart').trigger('click');
	});
	$('#diff-7').click(function(event) {
		currentDiff = 7;
		$('#restart').trigger('click');
	});
	$('#diff-8').click(function(event) {
		currentDiff = 8;
		$('#restart').trigger('click');
	});

});
// place chosen number of disks on the first peg
function initDisks(disks) {
	restartMessage = false;
	counter = -1; updateCounter();
	peg1 = []; peg2 = []; peg3 = [];
	$('.disks').remove();
	for (var i = disks; i > 0; i--) {
		var disk = document.createElement('div');
		$(disk).attr('id', 'disk' + i).
		addClass('disks').css('bottom', (disks - i) * 16 + 'px');
		$('#peg1').append(disk);
		peg1.push(i);
	}
	$currentDisk = $('#disk1');
	addDiskDragEvent();
}
/*
	This function handles disk drop
	It checks if:
	- mouse is over the peg
	- disk can be drop at a given peg
	It also changes disk bottom offset.
*/
function dropDiskOnPeg() {
	var left = $currentDisk.css('left');
	var top = $currentDisk.css('top');
	var id = $currentDisk.attr('id');
	left = left.replace("px", "");
	top = top.replace("px", "");
	id = Number(id.replace("disk", ""));
	if ($currentDisk.parent().attr('id') == 'peg1') {
		if ((left >= 90 && left <= 130) && (top >= 0 && top <= 120)) {
			if ((peg2[peg2.length - 1] > id) || (peg2.length == 0)) {
				peg1.pop();
				$('#peg2').append($currentDisk);
				$currentDisk.css('bottom', peg2.length * 16 + 'px');
				peg2.push(id);
				updateCounter();
			}
		} else if ((left >= 200 && left <= 240) && (top >= 0 && top <= 120)) {
			if ((peg3[peg3.length - 1] > id) || (peg3.length == 0)) {
				peg1.pop();
				$('#peg3').append($currentDisk);
				$currentDisk.css('bottom', peg3.length * 16 + 'px');
				peg3.push(id);
				updateCounter();
			}
		}
	} else if ($currentDisk.parent().attr('id') == 'peg2') {
		if ((left >= -130 && left <= -90) && (top >= 0 && top <= 120)) {
			if ((peg1[peg1.length - 1] > id) || (peg1.length == 0)) {
				peg2.pop();
				$('#peg1').append($currentDisk);
				$currentDisk.css('bottom', peg1.length * 16 + 'px');
				peg1.push(id);
				updateCounter();
			}
		} else if ((left >= 90 && left <= 130) && (top >= 0 && top <= 120)) {
			if ((peg3[peg3.length - 1] > id) || (peg3.length == 0)) {
				peg2.pop();
				$('#peg3').append($currentDisk);
				$currentDisk.css('bottom', peg3.length * 16 + 'px');
				peg3.push(id);
				updateCounter();
			}
		}
	} else if ($currentDisk.parent().attr('id') == 'peg3') {
		if ((left >= -130 && left <= -90) && (top >= 0 && top <= 120)) {
			if ((peg2[peg2.length - 1] > id) || (peg2.length == 0)) {
				peg3.pop();
				$('#peg2').append($currentDisk);
				$currentDisk.css('bottom', peg2.length * 16 + 'px');
				peg2.push(id);
				updateCounter();
			}
		} else if ((left >= -240 && left <= -200) && (top >= 0 && top <= 120)) {
			if ((peg1[peg1.length - 1] > id) || (peg1.length == 0)) {
				peg3.pop();
				$('#peg1').append($currentDisk);
				$currentDisk.css('bottom', peg1.length * 16 + 'px');
				peg1.push(id);
				updateCounter();
			}
		}
	}
	checkForWin();
}
// check if disk is on top of the stack
function isOnTop() {
	var id = $currentDisk.attr('id');
	id = Number(id.replace("disk", ""));
	if ($currentDisk.parent().attr('id') == 'peg1') {
		if (peg1[peg1.length - 1] == id) return true;
	} else if ($currentDisk.parent().attr('id') == 'peg2') {
		if (peg2[peg2.length - 1] == id) return true;
	} else if ($currentDisk.parent().attr('id') == 'peg3') {
		if (peg3[peg3.length - 1] == id) return true;
	} else {
		return false;
	}
}
// track mouse movement and moving the disk
var trackingMouseMoves = function(e) {
	var parentOffset = $currentDisk.parent().offset();
	$currentDisk.css('left', e.pageX - parentOffset.left + "px");
	$currentDisk.css('top', e.pageY - parentOffset.top + "px");
};
// this event need to be added with each restart
function addDiskDragEvent() {
	$('.disks').mousedown(function(event) {
		$currentDisk = $(this);
		if (isOnTop()) {
			document.addEventListener('mousemove', trackingMouseMoves);
		}
	});
}
// update counter and show result on 'clock'
function updateCounter() {
	counter++;
	if (counter % 10 == counter) {
		$('.clock').text('000' + counter);
	} else if (counter % 100 == counter) {
		$('.clock').text('00' + counter);
	} else if (counter % 1000 == counter) {
		$('.clock').text('0' + counter);
	} else {
		$('.clock').text(counter);
	}
}
// show restart message if entire tower was moved
function checkForWin() {
	if (peg2.length == currentDiff ||
		peg3.length == currentDiff) {
		if (!restartMessage) $('.restart').trigger('click');
		restartMessage = true;
	}
}