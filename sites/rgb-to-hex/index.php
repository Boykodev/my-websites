<!DOCTYPE html>
<html>
<head>
	<title>RGB to HEX</title>
	<link rel="stylesheet" href="/css/reset.css">
	<link rel="stylesheet" href="style.css">
	<link href='http://fonts.googleapis.com/css?family=Chewy' rel='stylesheet' type='text/css'>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="script.js" defer></script>
</head>
<body>
<header>
	<h2>
		<span>R</span><span>G</span><span>B</span>
		to
		<span>HEX</span>
		<br>converter
	</h2>
</header>
<form method="POST">  
	<label for="red">Red: </label>
	<input name="red" id="red" type="text" class="rgb-input" maxlength="3">
	<label for="green">Green: </label>
	<input name="green" id="green" type="text" class="rgb-input" maxlength="3">
	<label for="blue">Blue: </label>
	<input name="blue" id="blue" type="text" class="rgb-input" maxlength="3">
	<input type="submit" name="submit" value="Convert to Hex" class="convert-btn">
</form>
<div class="result">
	<?php
		if (isset($_POST["red"]) && isset($_POST["green"]) && isset($_POST["blue"])) {
			if (isValidInput($_POST["red"]) && isValidInput($_POST["green"]) && isValidInput($_POST["blue"])) {
				echo "#" . getHex($_POST["red"]) . getHex($_POST["green"]) . getHex($_POST["blue"]);
			} else {
				echo "Please enter valid input:<br>RGB values should be from 0 to 255 only!";
			}
		}
		function isValidInput($rgb) {
			if (!is_numeric($rgb)) return false;
			return $rgb >= 0 && $rgb <= 255;
		}

		function getHex($rgb) {
			$result = strtoupper(dechex($rgb));
			if (strlen($result) == 1) {
				$result = "0" . $result;
			}
			return $result;
		}
	?>
</div>
</body>
</html>