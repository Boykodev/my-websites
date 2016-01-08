var $letters;
$(document).ready(function() {
	$letters = $('#header span').not('#space');
	colorizeHeader();
	setInterval(colorizeNextLetter, 100);
	$('.btn').click(function(event) {
		if (isValidInput()) {
			daysUntilBirthday();
		} else {
			alert('Please enter a proper date')
		}
	});
});

function colorizeHeader() {
	for (var i = 0; i < $letters.length; i++) {
		$letters.eq(i).css('color', getRandomColor());
	};
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
var colorizeNextLetter = (function() {
	var next = 0;
	var reverse = false;
	return function() {
		if (next === 0) reverse = false;
		if (next === $letters.length - 1) reverse = true;
		var shift = 20;
		if (reverse) shift = -20;
		if (next === 0) shift = 0;
		$letters.eq(next).css({
			color: getRandomColor(),
			top: shift + 'px'
		});
		var temp = next;
		setTimeout(function() {
			$letters.eq(temp).css('top', '0px');
		},100);
		if (reverse) {
			next--;
		} else {
			next++;
		}	
	}
})();

function isValidInput() {
	var month = Number($('#month').val());
	var day = Number($('#day').val());
	if ((month >= 1 && month <= 12) && isValidDay(month, day)) {
		return true;
	} else {
		$('#month').val('');
		$('#day').val('');
		return false;
	}
}

function isValidDay(month, day) {
	switch(month){
		case 1: case 3: case 5: case 7:
		 case 8: case 10: case 12:
			if (day >= 1 && day <= 31) {
				return true;
			} else {
				return false;
			}
		case 2:
			if (day >= 1 && day <= 29) {
				return true;
			} else {
				return false;
			}
		case 4: case 6: case 9: case 11:
			if (day >= 1 && day <= 29) {
				return true;
			} else {
				return false;
			}
		default:
			return false
	}
}

function daysUntilBirthday() {
	var today = new Date();
	var currentDay = today.getDate();
	var currentMonth = today.getMonth(); //January is 0!
	var currentYear = today.getFullYear();
	// Decrementing because of zero indexing
	var month = Number($('#month').val()) - 1;
	var day = Number($('#day').val());
	var daysUntil = 0;
	var birthdayDate = new Date(currentYear, month, day);
	if (datesEqual(today, birthdayDate)) {
		showResult(daysUntil);
	} else if (birthdayWasYesterday(birthdayDate)) {
		daysUntil = -1;
		showResult(daysUntil);
	} else {
		if (birthdayWasThisYear(month, day, currentMonth, currentDay)) {
			birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
			daysUntil = daysBetween(today, birthdayDate);
		} else {
			daysUntil = daysBetween(today, birthdayDate);
		}
		showResult(daysUntil);
	}
}

function birthdayWasThisYear(month, day, currentMonth, currentDay) {
	if (month < currentMonth) {
		return true;
	} else if (month > currentMonth) {
		return false;
	} else {
		return day < currentDay;
	}
}

function birthdayWasYesterday(date) {
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	return datesEqual(yesterday, date);
}

function datesEqual(date1, date2) {
	return date1.getDate() === date2.getDate()
	&& date1.getMonth() === date2.getMonth()
	&& date1.getFullYear() == date2.getFullYear();
}

function showResult(daysUntil) {
	var $result = $('.result');
	if (daysUntil === 0) {
		$result.fadeOut('fast', function() {
			$result.html("Your birthday's today!<br>Let's party!");
			$result.fadeIn('fast');
		});
	} else if (daysUntil === 1) {
		$result.fadeOut('fast', function() {
			$result.html("Your birthday's tomorrow!<br>Ready to party?");
			$result.fadeIn('fast');
		});
	} else if (daysUntil === -1) {
		$result.fadeOut('fast', function() {
			$result.html("Your birthday was yesterday!<br>Had a good party?");
			$result.fadeIn('fast');
		});
	} else {
		$result.fadeOut('fast', function() {
			$result.html(daysUntil + ' days<br>until next birthday!');
			$result.fadeIn('fast');
		});
	}
	
}

/* Posted by TNi on StackOverflow
 * http://stackoverflow.com/questions/3224834/
 */
function daysBetween(date1, date2) {
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
	return diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
}