<?php
/*------GET--------*/
//Return JSON array with all the recipes and all the info
function getRecipes(){

	//Sets up connection
	require_once('connect.php');
	$query = "SELECT r.id, r.updated, r.title as recipeTitle, r.slug as slug, r.type, r.description
	FROM recipe r
	ORDER BY r.updated desc;
	";
	/* QUERY TO GET ALL RECIPE INFORMATION */
	/*$query = "SELECT r.id, r.updated, r.title as recipeTitle, r.slug as slug, r.type, r.description,  
	al.containsNuts, al.containsGluten, al.containsDiary, 
	al.containsAnimalProducts, al.containsMeat
	FROM recipe r
	INNER JOIN allergy_list al
	ON r.id=al.recipe_ID
	ORDER BY r.updated;
	";*/
/* or use contains, then we can get the allergies in a seperate sql call and add it to the array in the end
*/

	//saves response to $response
	//$conn is connection, query is our query.
	$response = @mysqli_query($conn, $query);

	//if we get response
	if($response){
		// gets rows until there is no more left
		//can also use fetch_assoc()
	$recipe = array();
		while ( $row = $response->fetch_array(MYSQL_ASSOC)) {
			/*row array is a local array which contains one row*/
			$row_array['id'] = $row['id'];
			$row_array['updated'] = $row['updated'];
			/*sends it as date, not updated*/
			$row_array['date'] = $row['updated'];
			$row_array['recipeTitle'] = $row['recipeTitle'];
			$row_array['slug'] = $row['slug'];
			$row_array['type'] = $row['type'];
			$row_array['description'] = $row['description'];
			//maybe change this part later
			/*$row_array['containsNuts'] = $row['containsNuts'];
			$row_array['containsGluten'] = $row['containsGluten'];
			$row_array['containsDiary'] = $row['containsDiary'];
			$row_array['containsAnimalProducts'] = $row['containsAnimalProducts'];
			$row_array['containsMeat'] = $row['containsMeat'];*/
			/*Pushes the table rows fetched (row_array) to the assosiative array(recipe)*/
			array_push($recipe, $row_array);
			

			/*echo $row['type'];
			$array[]=$row;*/
		}
		//returns the recipe to wherever the method is called
		//echo json_encode($recipe, JSON_PRETTY_PRINT);
		return $recipe;
	} else{ //dont get response
		echo "Couldnt issue database query: ";
		echo mysqli_error($conn);
	}
	$response->close();
	mysqli_close($conn);

}

?>