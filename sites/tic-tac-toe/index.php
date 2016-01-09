<!DOCTYPE html>
<html>
<head>
	<title>Tic Tac Toe</title>
	<link rel="stylesheet" href="/css/reset.css">
	<link rel="stylesheet" href="style.css">
	<link href='http://fonts.googleapis.com/css?family=Permanent+Marker' rel='stylesheet' type='text/css'>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="script.js" defer></script>
</head>
<body>
<div class="header">Tic Tac Toe</div>
<form method="post">
	<div class="game">
		<input type="text" class="cells cell-0" name="cell-0" 
			value="<?=empty($_POST['cell-0']) ? '' : $_POST['cell-0']?>" readonly>
		<input type="text" class="cells cell-1" name="cell-1" 
			value="<?=empty($_POST['cell-1']) ? '' : $_POST['cell-1']?>" readonly>
		<input type="text" class="cells cell-2" name="cell-2" 
			value="<?=empty($_POST['cell-2']) ? '' : $_POST['cell-2']?>" readonly>

		<input type="text" class="cells cell-3" name="cell-3" 
			value="<?=empty($_POST['cell-3']) ? '' : $_POST['cell-3']?>" readonly>
		<input type="text" class="cells cell-4" name="cell-4" 
			value="<?=empty($_POST['cell-4']) ? '' : $_POST['cell-4']?>" readonly>
		<input type="text" class="cells cell-5" name="cell-5" 
			value="<?=empty($_POST['cell-5']) ? '' : $_POST['cell-5']?>" readonly>

		<input type="text" class="cells cell-6" name="cell-6" 
			value="<?=empty($_POST['cell-6']) ? '' : $_POST['cell-6']?>" readonly>
		<input type="text" class="cells cell-7" name="cell-7" 
			value="<?=empty($_POST['cell-7']) ? '' : $_POST['cell-7']?>" readonly>
		<input type="text" class="cells cell-8" name="cell-8" 
			value="<?=empty($_POST['cell-8']) ? '' : $_POST['cell-8']?>" readonly>
	</div>
	<div class="result">
		<?php
			$cells = array
				(
					array(empty($_POST['cell-0']) ? '' : $_POST['cell-0'],
						empty($_POST['cell-3']) ? '' : $_POST['cell-3'],
							empty($_POST['cell-6']) ? '' : $_POST['cell-6']),

					array(empty($_POST['cell-1']) ? '' : $_POST['cell-1'],
						empty($_POST['cell-4']) ? '' : $_POST['cell-4'],
							empty($_POST['cell-7']) ? '' : $_POST['cell-7']),

					array(empty($_POST['cell-2']) ? '' : $_POST['cell-2'],
						empty($_POST['cell-5']) ? '' : $_POST['cell-5'],
							empty($_POST['cell-8']) ? '' : $_POST['cell-8'])
				);

			$result = getResult($cells);

			if ($result == 'X') {
				echo '<span>X wins!</span>';
				echo '<button class="btn" onclick="restart()">Play Again</button>';
			} elseif ($result == 'O') {
				echo '<span>O wins!</span>';
				echo '<button class="btn" onclick="restart()">Play Again</button>';
			} elseif (allFilled($cells)) {
				echo "<span>It's a draw!</span>";
				echo '<button class="btn" onclick="restart()">Play Again</button>';
			}

			function getResult($cells) {
				if (!empty($cells[0][0]) && $cells[0][0] == $cells[0][1] && $cells[0][1] == $cells[0][2]) {
					return $cells[0][0];
				} else if (!empty($cells[1][0]) && $cells[1][0] == $cells[1][1] && $cells[1][1] == $cells[1][2]) {
					return $cells[1][0];
				} else if (!empty($cells[2][0]) && $cells[2][0] == $cells[2][1] && $cells[2][1] == $cells[2][2]) {
					return $cells[2][0];
				} else if (!empty($cells[0][0]) && $cells[0][0] == $cells[1][0] && $cells[1][0] == $cells[2][0]) {
					return $cells[0][0];
				} else if (!empty($cells[0][1]) && $cells[0][1] == $cells[1][1] && $cells[1][1] == $cells[2][1]) {
					return $cells[0][1];
				} else if (!empty($cells[0][2]) && $cells[0][2] == $cells[1][2] && $cells[1][2] == $cells[2][2]) {
					return $cells[0][2];
				} else if (!empty($cells[0][0]) && $cells[0][0] == $cells[1][1] && $cells[1][1] == $cells[2][2]) {
					return $cells[0][0];
				} else if (!empty($cells[2][0]) && $cells[2][0] == $cells[1][1] && $cells[1][1] == $cells[0][2]) {
					return $cells[2][0];
				} else {
					return '-';
				}
			}

			function allFilled($cells) {
				for ($i = 0; $i < 3; $i++) { 
					for ($j = 0; $j < 3; $j++) { 
						if (empty($cells[$i][$j])) return false;
					}
				}
				return true;
			}
		?>
	</div>
</form>
</body>
</html>