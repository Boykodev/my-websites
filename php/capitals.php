<?php
	include "db.php";
	$sql = "SELECT * FROM capitals";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    
	    $capitals = array();

	    while($row = $result->fetch_assoc()) {
	    	$capitals[$row["id"] - 1] = array(
	    		"id"=>$row["id"],
	    		"country"=>$row["country"],
	    		"capital"=>$row["capital"]
	    		);
	    }

	    echo json_encode($capitals);

	} else {
	    echo "0 results";
	}
	$conn->close();
?>