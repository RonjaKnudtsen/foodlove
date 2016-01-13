<?php
function putRecipe($recipe){
	//gets connection and database
	require 'connect.php';

	if(isset($recipe['recipeTitle'], $recipe['type'], $recipe['description'])){
		$title = trim($recipe['recipeTitle']); //removes whitespace before and after
		$type = $recipe['type'];
		$description = $recipe['description'];

		$slug = $recipe['slug'];

		//-----Recipe------
		//"recipe" handles basic information
		$query = "UPDATE recipe SET title = '$title', type = '$type', description = '$description'
		WHERE slug = '$slug'";

		if(mysqli_query($conn, $query)){
			//$response =  json_decode($slug);
			//echo($response);
			$recipe['recipeId'] = mysqli_insert_id($conn); //Need to be stored for later
			echo json_encode($recipe);

			
		}else{
			echo "Error: " . mysqli_error($conn);
		}



	}else{
		echo "Missing data";
	}


}
?>