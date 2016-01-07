var display = $('#display');
var current = ''; // current operand
var last = ''; // last operand
var currentReset = true; // resets current on the next click
var currentOperation = ''; // + - * /
var periodWasPressed = false;

$(document).ready(function() {
	displayCurrent();
	// clear the display
	$('#cancel').click(function(event) {
		currentOperation = ''
		current = '';
		last = '';
		displayCurrent();
	});
	// perform negation on current operand
	$('#plus-minus').click(function(event) {
		if (current !== '') {
			current *= -1;
			displayCurrent();
		}
	});
	// 1 percent of current operand
	$('#percent').click(function(event) {
		if (current !== '') {
			current *= 0.01;
			displayCurrent();
		}
	});
	// add numbers to current operand
	$('.number').click(function(event) {
		addCurrent($(this));
		displayCurrent();
	});
	// division click
	$('#obelus').click(function(event) {
		if (currentOperation === '/') {
			showResult();
		}
		currentOperation = '/';
		last = display.html();
		currentReset = true;
	});
	// multiplication click
	$('#times-sign').click(function(event) {
		if (currentOperation === '*') {
			showResult();
		}
		currentOperation = '*';
		last = display.html();
		currentReset = true;
	});
	// addition click
	$('#plus').click(function(event) {
		if (currentOperation === '+') {
			showResult();
		}
		currentOperation = '+';
		last = display.html();
		currentReset = true;
	});
	// subtraction click
	$('#minus').click(function(event) {
		if (currentOperation === '-') {
			showResult();
		}
		currentOperation = '-';
		last = display.html();
		currentReset = true;		
	});
	// equals click
	$('#equals').click(function(event) {
		if (currentOperation !== '') {
			showResult();
		}
	});
	$('#period').click(function(event) {
		periodWasPressed = true;
	});
});

function addCurrent(element) {
	if (currentReset) {
		current = '';
		currentReset = false;
	}

	if (periodWasPressed) {
		if (display.text().indexOf('.') < 0) {
			current += (current === '') ? '0.' : '.';
		}
		periodWasPressed = false;
	}

	if (current === '' && element.html() === '0') {
		current += element.html();
		currentReset = true;
	} else if (current.length > 10) {
		return;
	} else {
		current += element.html();
	}
}

function displayCurrent() {
	if (current === '') {
		display.html('0');
	} else {
		display.html(current);
	}
}

function showResult() {
	switch(currentOperation){
		case '/':
			last = Number(last) / Number(current);
			// make 0 / 0 an Infinity
			if (isNaN(last)) last = Number.MAX_VALUE * 2;
			display.html(last);
			break
		case '*':
			last = Number(last) * Number(current);
			display.html(last);
			break
		case '+':
			last = Number(last) + Number(current);
			display.html(last);
			break
		case '-':
			last = Number(last) - Number(current);
			display.html(last);
			break
		default:
			break;
	}
}