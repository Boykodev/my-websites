<?php
	include "db.php";
	$sql = "SELECT * FROM bender_quotes";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    
	    $quotes = array();

	    while($row = $result->fetch_assoc()) {
	    	$quotes[$row["id"] - 1] = array(
	    		"id"=>$row["id"],
	    		"text"=>$row["text"],
	    		"audio"=>$row["audio"]
	    		);
	    }

	    echo json_encode($quotes);

	} else {
	    echo "0 results";
	}
	$conn->close();
?>