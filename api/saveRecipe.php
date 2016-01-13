<?php
function saveRecipe($recipe){
	//gets connection and database
	require 'connect.php';
	require_once 'makeSlug.php';

	if(isset($recipe['recipeTitle'], $recipe['type'], $recipe['description'])){
		$title = trim($recipe['recipeTitle']); //removes whitespace before and after
		$slug = makeSlug($title); //Make sure this is unique
		$recipe['slug'] = $slug;
		//$feature = $recipe['featureImage'];
		$type = $recipe['type'];
		$description = $recipe['description'];

		//-----Recipe------
		//"recipe" handles basic information
		$query = "INSERT INTO recipe (title, slug, type, description)
		VALUES('$title', '$slug', '$type', '$description')";

		if(mysqli_query($conn, $query)){
			//$response =  json_decode($slug);
			//echo($response);
			$recipe['recipeId'] = mysqli_insert_id($conn); //Need to be stored for later
			echo json_encode($recipe);
			//This id can be used in the allergy and ingredientlist later
			
		}else{
			echo "Error: ". $sql . "<br>" . mysqli_error($conn);
		}
	/*Allergy list has been removed for  some time*/
	/*Ingredient list not yet created*/
	/*Missing xBenefit*/


	}else{
		echo "Missing data";
	}



	
	//Make sure that the slug is unique, if not, add a number

	//http://stackoverflow.com/questions/15971685/creating-unique-page-title-slugs-php/15972027#15972027
	//Need to make sure the slugs are unique
	/*function makeUniqueSlug($string){
		$query "SELECT slug 
				FROM recipe
				WHERE slug LIKE '$string'"
		$response = mysql_query($conn $query);

		if($response){

			while ($response->fetch_row()) {
				if (condition) {
					# code...
				}
			}
			return $slug;

		} else{
			echo "Couldnt issue database query while comparing slug: ";
			echo mysqli_error($conn);
		}

	}*/
}
?>