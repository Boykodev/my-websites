<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>What's My IP Address?</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="/css/reset.css">
	<link rel="stylesheet" href="style.css">
	<link href='https://fonts.googleapis.com/css?family=Cutive+Mono' rel='stylesheet' type='text/css'>
</head>
<body>
	<header>
		<h1>Dude, What's My IP Address?</h1>
	</header>
	<div class="ip-container">
		<p>Your IP Address is:</p>
		<div id="ip"><?=$_SERVER['REMOTE_ADDR'];?></div>
	</div>
</body>
</html>