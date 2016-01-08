$(document).ready(function() {
	$('.btn').click(function(event) {
		if (isValidInput()) {
			showEvents();
		} else {
			alert('Please enter a proper date')
		}
	});
});

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

function showEvents() {
	var month = Number($('#month').val());
	var day = Number($('#day').val());
	var link = 'https://en.wikipedia.org/wiki/' 
		+ getMonthName(month) + '_' + day;
		
	$('#frame').slideUp('slow', function() {
		$('#frame').attr('src', link);
		$('#frame').load(function() {
			// Thanks to 'pratikabu' answer on
			// http://stackoverflow.com/questions/9249680
			$('#frame').slideDown('slow');
		});
	});
}

function getMonthName(month) {
	switch(month) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
        default: return "???";
    }
}