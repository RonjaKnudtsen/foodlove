dropRecipe($recipeSlug);


<?php
function dropRecipe($recipeSlug){
	# code...
	require_once('connect.php');
	$query = "DELETE FROM recipe
			WHERE slug = '$recipeSlug'":

	if(mysqli_query($conn, $query)){
		echo "Table: ". $id ." dropped</br>";
	}else{
		echo "Couldnt drop table: ".$id ."</br>";
		echo "Error: ". $sql . "<br>" . mysqli_error($conn);
	}
}

?>

	