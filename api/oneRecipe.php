<?php
/*------GET--------*/
//Functions that return a json object
//Make sure to prevent SQL injections where a parameter is passed.
//Use prepared statements: http://stackoverflow.com/questions/60174/how-can-i-prevent-sql-injection-in-php

//slugs are used as an ID, they are(or atleast should be) unique

function getRecipe($slug){
	require('connect.php');

	$query = "SELECT r.id, r.updated, r.title as recipeTitle, r.slug as slug, r.type, r.description
	FROM recipe r
	WHERE r.slug = '$slug'
	";

	/* QUERY TO GET ALL RECIPE INFORMATION */
	/*$query = "SELECT r.id, r.updated, r.title as recipeTitle, r.slug as slug, r.type, r.description,  
	al.containsNuts, al.containsGluten, al.containsDiary, 
	al.containsAnimalProducts, al.containsMeat
	FROM recipe r
	INNER JOIN allergy_list al
	ON r.id=al.recipe_ID
	WHERE r.slug = '$slug'
	";*/

	//saves response to $response
	//$conn is connection, query is our query.
	$response = @mysqli_query($conn, $query);

	//if we get response
	if($response){
		//associative array
		$recipe = $response->fetch_array(MYSQLI_ASSOC);
		return $recipe;
	}else{
		echo "Couldnt issue database query: ";
		echo mysqli_error($conn);
	}
	$response->close();
	mysqli_close($conn);

}
?>