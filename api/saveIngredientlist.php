<?php
	function saveIngredientList($ingredientList){

		require_once "connect.php";
		$recipe_ID = $ingredientList['recipeId'];
		$ingredient = $ingredientList['ingredient'];
		$quantity = $ingredientList['quantity'];
		$unit =	$ingredientList['unit'];
		$grams = $ingredientList['grams'];
		$comment = $ingredientList['comment'];

		$query = "INSERT INTO ingredientlist (recipe_ID, ingredient, quantity, unit, grams, comment)
			VALUES('$recipe_ID', '$ingredient', '$quantity', '$unit', '$grams', '$comment')";

		if(mysqli_query($conn, $query)){
			//$response =  json_decode($slug);
			//echo($response);
			echo json_encode($ingredientList);
			//This id can be used in the allergy and ingredientlist later
			//$recipe_ID = mysqli_insert_id($conn); //Need to be stored for later
		}else{
			echo "Error: " . mysqli_error($conn);
		}
	}
?>