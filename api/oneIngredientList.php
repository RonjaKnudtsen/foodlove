<?php
/*------GET--------*/
//Functions that return a json object

function getIngredientlist($recipeId){
	require('connect.php');

	$query = "SELECT list_ID, recipe_ID, ingredient, quantity, unit, grams, comment
	FROM ingredientlist 
	WHERE recipe_ID = '$recipeId'
	";


	$response = @mysqli_query($conn, $query);

	//if we get response
	if($response){
		//associative array
		//$ingredientlist = $response->fetch_array(MYSQLI_ASSOC);
		$ingredientlist = mysqli_fetch_all($response, MYSQLI_ASSOC);

		return $ingredientlist;
	}else{
		echo "Couldnt issue database query: ";
		echo mysqli_error($conn);
	}
	$response->close();
	mysqli_close($conn);

}
?>