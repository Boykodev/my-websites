$(document).ready(function() {
	// Used for beeping
	var beepCode;
	var beepIndex;
	// Sound for beeping
	var dotSound = new Audio('assets/morse-dot-sound.mp3');
	var dashSound = new Audio('assets/morse-dash-sound.mp3');
	$.ajax({
        url: 'assets/morse-dot-sound.mp3',
        url: 'assets/morse-dash-sound.mp3'
    });

	$('#source-text').on('input', function(event) {
		translateToMorse($(this).val());
	});

	$('#beep-btn').click(function(event) {
		if ($('#beep-btn').text().charAt(0) == 'B') {
			beepCode = translateToMorse($('#source-text').val());
			$(this).text('Stop');
			beepIndex = 0;
			beepIt();
		} else {
			stopIt();
		}
	});

	function beepIt() {
		if ($('#beep-btn').text().charAt(0) == 'S' && beepIndex < beepCode.length) {
			var beepStr = beepCode[beepIndex];
			if (beepStr.charAt(0) == '\n' || beepStr.length == 0) {
				setTimeout(beepIt, 500);
			} else {
				var pause = 300;
				var dotCount = (beepStr.match(/·/g) || []).length;
				var dashCount = (beepStr.match(/-/g) || []).length;
				var interval = dotCount * 320 + dashCount * 550 + pause;
				setTimeout(beepIt, interval)
				makeBeeps(beepStr);
			}
			beepIndex++;
		} else {
			stopIt();
		}
	}

	function makeBeeps(code) {
		var delay = 0;
		for (var i = 0; i < code.length; i++) {
			if (code.charAt(i) == '-') {
				setTimeout(function(){ dashSound.play(); }, delay);
				delay += 550;
			} else if (code.charAt(i) == '·') {
				setTimeout(function(){ dotSound.play(); }, delay);
				delay += 320;
			}
		};
	}

	function stopIt() { $('#beep-btn').text('Beep!'); }

	translateToMorse($('#source-text').val());

	function translateToMorse(text) {
		var morseCode = [];
		var morseStr = '';
		for (var i = 0; i < text.length; i++) {
			morseCode[i] = letterToMorse(text.charAt(i));
			//formatting morse code input
			if (morseCode[i].charAt(0) != '\n' &&
				i != 0 && morseCode[i - 1].charAt(0) != '\n') {
				morseStr += ' ' + morseCode[i];
			} else {
				morseStr += morseCode[i];
			}
		};
		$('#morse-text').html(morseStr);
		return morseCode;
	}

	function letterToMorse(ch) {
		switch (ch.charAt(0).toUpperCase()) {
			case 'A':
				return "·-";
			case 'B':
				return "-···";
			case 'C':
				return "-·-·";
			case 'D':
				return "-··";
			case 'E':
				return "·";
			case 'F':
				return "··-·";
			case 'G':
				return "--·";
			case 'H':
				return "····";
			case 'I':
				return "··";
			case 'J':
				return "·---";
			case 'K':
				return "-·-";
			case 'L':
				return "·-··";
			case 'M':
				return "--";
			case 'N':
				return "-·";
			case 'O':
				return "---";
			case 'P':
				return "·--·";
			case 'Q':
				return "--·-";
			case 'R':
				return "·-·";
			case 'S':
				return "···";
			case 'T':
				return "-";
			case 'U':
				return "··-";
			case 'V':
				return "···-";
			case 'W':
				return "·--";
			case 'X':
				return "-··-";
			case 'Y':
				return "-·--";
			case 'Z':
				return "--··";

			case '0':
				return "-----";
			case '1':
				return "·----";
			case '2':
				return "··---";
			case '3':
				return "···--";
			case '4':
				return "····-";
			case '5':
				return "·····";
			case '6':
				return "-····";
			case '7':
				return "--···";
			case '8':
				return "---··";
			case '9':
				return "----·";

			case '.':
				return "·-·-·-";
			case ',':
				return "--··--";
			case '?':
				return "··--··";
			case '\'':
				return "·----·";
			case '!':
				return "-·-·--";
			case '/':
				return "-··-·";
			case '(':
				return "-·--·";
			case ')':
				return "-·--·-";
			case '&':
				return "·-···";
			case ':':
				return "---···";
			case ';':
				return "-·-·-·";
			case '=':
				return "-···-";
			case '+':
				return "·-·-·";
			case '-':
				return "-····-";
			case '_':
				return "··--·-";
			case '"':
				return "·-··-·";
			case '$':
				return "···-··-";
			case '@':
				return "·--·-·";

			case ' ':
				return "\n";
			case '\n':
				return "\n\n";
			default:
				return "";
			}
	}
});