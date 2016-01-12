var ALPHABET = 26;

function caesarEncrypt() {
	var text = $('#original-text').val();
	var key = $('input').val();
	$('#cipher-text').val(encryptText(text, key));
}

function setCipher(value) {
	var cipherAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	cipherAlphabet = encryptText(cipherAlphabet, value);
	$('.alphabet.cipher').text(cipherAlphabet);
	caesarEncrypt();
}

/** Encrypts text.*/
function encryptText(plainText, key) {
	var result = "";
	
	for (var i = 0; i < plainText.length; i++) {
		result += encryptChar(plainText.charAt(i), key);
	}
	
	return result;
}

/** Encrypts a character.*/
function encryptChar(ch, key) {
	if (isLetter(ch)) {
		if (ch.toLowerCase().charCodeAt(0) + key % ALPHABET > 'z'.charCodeAt(0)) {
			key = (key % ALPHABET) - ALPHABET ;
		}
		if (ch.toLowerCase().charCodeAt(0) + key % ALPHABET < 'a'.charCodeAt(0)) {
			key = ALPHABET + (key % ALPHABET);
		}
		
		return String.fromCharCode(ch.charCodeAt(0) + (key % ALPHABET));
	}
	
	return ch;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}