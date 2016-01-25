<?php
	function putIngredientlist($ingredientList){

		require_once "connect.php";
		$list_ID = $ingredientList['list_ID'];
		$recipe_ID = $ingredientList['recipe_ID'];
		$ingredient = $ingredientList['ingredient'];
		$quantity = $ingredientList['quantity'];
		$unit =	$ingredientList['unit'];
		$grams = $ingredientList['grams'];
		$comment = $ingredientList['comment'];

		$query = "UPDATE ingredientlist
		SET quantity = '$quantity', 
			ingredient = '$ingredient', 
			unit = '$unit',
			grams = '$grams',
			comment = '$comment'
		WHERE list_ID = '$list_ID'";

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