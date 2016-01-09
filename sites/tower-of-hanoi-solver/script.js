// stacks to track amount of disks
var peg1, peg2, peg3;
// counter for moves
var counter;
// 5 is default difficulty
var currentDiff = 5;
// this delay creates queue for disks movement
var currentDelay = 0;
// prevent bug when start pressed multiple times
var solvingInProgress = false;

$(document).ready(function() {
	initDisks(currentDiff);
    $('#start').click(function(event) {
        if (!solvingInProgress) {
            solvingInProgress = true;
            initDisks(currentDiff);
            currentDelay = 0;
            moveTowerTo('3');
            $('.restart-menu').slideUp('slow');
        }
    });
    $('#diff-3').click(function(event) {
        currentDiff = 3;
        initDisks(currentDiff);
    });
    $('#diff-4').click(function(event) {
        currentDiff = 4;
        initDisks(currentDiff);
    });
    $('#diff-4').click(function(event) {
        currentDiff = 4;
        initDisks(currentDiff);
    });
    $('#diff-5').click(function(event) {
        currentDiff = 5;
        initDisks(currentDiff);
    });
    $('#diff-6').click(function(event) {
        currentDiff = 6;
        initDisks(currentDiff);
    });
    $('#diff-7').click(function(event) {
        currentDiff = 7;
        initDisks(currentDiff);
    });
    $('#diff-8').click(function(event) {
        currentDiff = 8;
        initDisks(currentDiff);
    });
});

function initDisks(disks) {
	peg1 = []; peg2 = []; peg3 = [];
    counter = -1; updateCounter();
	$('.disks').remove();
	for (var i = disks; i > 0; i--) {
		var disk = document.createElement('div');
		$(disk).attr('id', 'disk' + i).
		addClass('disks').css('bottom', (disks - i) * 17 + 'px');
		$('#peg1').append(disk);
		peg1.push(i);
	}
}
// wrapper function for tower final destination
function moveTowerTo(destination) {
    switch (destination) {
        case '1':
            break;
        case '2':
            moveTower(currentDiff, '1', '3', '2');
            break;
        case '3':
            moveTower(currentDiff, '1', '2', '3');
            break;
        default:
            break;
    }
}
// recursive function from CS106B Stanford course
function moveTower(height, start, temp, finish) {
	if (height == 1) {
        setTimeout(moveDisk, currentDelay, start, finish);
        currentDelay += 1500;
    } else {
        moveTower(height - 1, start, finish, temp);
        setTimeout(moveDisk, currentDelay, start, finish);
        currentDelay += 1500;
        moveTower(height - 1, temp, start, finish);
    }
}
// move one disk to the given peg
function moveDisk(start, finish) {
    var diskNumber = diskOn(start);
    var $diskToMove = $('#disk' + diskNumber);
    moveDiskUp($diskToMove);
    switch (finish) {
        case '1':
            moveToStartPeg($diskToMove);
            peg1.push(diskNumber);
            break;
        case '2':
            moveToTempPeg($diskToMove);
            peg2.push(diskNumber);
            break;
        case '3':
            moveToFinishPeg($diskToMove);
            peg3.push(diskNumber);
            break;
        default:
            break;
    }
    moveDiskDown($diskToMove, finish);
}
// pop a disk number from peg stack
function diskOn(peg) {
    switch (peg) {
        case '1':
            return peg1.pop();
        case '2':
            return peg2.pop();
        case '3':
            return peg3.pop();
        default:
            return 0;
    }
}
// move disk to start peg
function moveToStartPeg($disk) {
	var id = $disk.parent().attr('id');
	id = Number(id.replace("peg", ""));

    if (id == 3) {
        moveHorizontal($disk, 'L', 2);
    } else if (id == 2) {
        moveHorizontal($disk, 'L', 1);
    }
}
// move disk to temporary peg
function moveToTempPeg($disk) {
	var id = $disk.parent().attr('id');
	id = Number(id.replace("peg", ""));

    if (id == 3) {
        moveHorizontal($disk, 'L', 1);
    } else if (id == 1) {
        moveHorizontal($disk, 'R', 1);
    }
}
// move disk to final destination peg
function moveToFinishPeg($disk) {
	var id = $disk.parent().attr('id');
	id = Number(id.replace("peg", ""));

    if (id == 1) {
        moveHorizontal($disk, 'R', 2);
    } else if (id == 2) {
        moveHorizontal($disk, 'R', 1);
    }
}
// move disk horizontal above the pegs
function moveHorizontal($disk, direction, steps) {
	var marg = $disk.css('margin-left');
	marg = Number(marg.replace("px", ""));

	if (direction == 'L') {
		$disk.animate({marginLeft: -170 * steps + marg + 'px'},
			500, function() {});
	} else if (direction == 'R') {
		$disk.animate({marginLeft: 170 * steps + marg + 'px'},
			500, function() {});
	}
}
// take disk off the peg
function moveDiskUp($disk) {
	$disk.animate({bottom: '160px'},
	500, function() {});
}
// put disk on the peg
function moveDiskDown($disk, finish) {
	var disksOnPeg;
    switch (finish) {
        case '1':
            disksOnPeg = peg1.length;
            break;
        case '2':
            disksOnPeg = peg2.length;
            break;
        case '3':
            disksOnPeg = peg3.length;
            break;
        default:
            break
    }
	
	$disk.animate({bottom: disksOnPeg * 17 - 17 + 'px'},
	500, function() {
        switch (finish) {
            case '1':
                $disk.css('margin-left', '');
                $('#peg1').append($disk);
                break;
            case '2':
                $disk.css('margin-left', '');
                $('#peg2').append($disk);
                break;
            case '3':
                $disk.css('margin-left', '');
                $('#peg3').append($disk);
                break;
            default:
                break
        }
        updateCounter();
        checkForWin();
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
        setTimeout(function() {
            $('.restart-menu').slideDown('slow');
            solvingInProgress = false;
        }, 1500);
    }
}