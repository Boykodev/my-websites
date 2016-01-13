<?php
header('Content-Type: application/json');
	if (!empty($_GET['title'])) {
		$title = $_GET['title'];
		$title = prepareRequest($title);
		$url = 'http://api.themoviedb.org/3/';
		$mode = 'search/movie?query=';
	    $key = 'get_your_api_key_at_http://api.themoviedb.org';

	    echo $json = file_get_contents($url . $mode . $title . $key);
	}

	function prepareRequest($str) {
		return str_replace(' ', '%20', $str);
	}
?>