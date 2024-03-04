<?php

error_reporting(0);
// NEED TO SEND POST OF movie_id




require_once("./inc/connect_pdo.php");

$person_count = $_POST["person_count"];


if ($people_count) {
	$people_count = $people_count;
} else {
	$people_count = "8";
}

function get_cover ($people_image_id,$dbo) {
	$query = "SELECT name
	FROM image
	WHERE image_id = '$people_image_id' ";
	//print("$query");
	foreach($dbo->query($query) as $row) {
		$image_name = stripslashes($row["0"]);
	}
	
	return $image_name;
}



$query = "SELECT people_id, name, cover_id, cover_name
FROM people
ORDER BY RAND() 
LIMIT 0,$people_count";
//print("$query");
foreach($dbo->query($query) as $row) {
	$people_id = stripslashes($row["0"]);
	$people_name = stripslashes($row["1"]);
	$people_image_id = stripslashes($row["2"]);
	
	$people["people_id"] = $people_id;
	
	$people["people_name"] = $people_name;
	$people["image_id"] = $people_image_id;
	
	$cover = get_cover($people_image_id,$dbo);
	
	
	
	$actors[] = $people;
}






$data = json_encode($actors);

header("Content-Type: application/json");

print($data);




?>
