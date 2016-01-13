<?php
//run the correct methods for each action
//GET(slug), GET, POST, PUT(SLUG) and DROP(SLUG)

//Post: Add one new recipe, takes a json object
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	//Angular and ajax calls sends json files via with: file_get_contents("php://input")
	$recipe = file_get_contents("php://input");
	$recipe = json_decode($recipe, true);
	
	/*Writes to file "input-data.json"*/
	/*$test = $recipe['recipeTitle'];
	$json_string = $test;
	$file_handle = fopen('input-data.json', 'w');
	fwrite($file_handle, $json_string);
	fclose($file_handle);*/

	require_once("saveRecipe.php");
	saveRecipe($recipe);

//Get: get one or all recipes
} else if ($_SERVER['REQUEST_METHOD'] == 'GET'){

	//(GET) Return ONE recipe in json
	if (isset($_GET["slug"])) {
		require_once("oneRecipe.php");
		$recipe = array();
		//run getRecipe(slug) from oneRecipe.php

		$recipe = getRecipe($_GET["slug"]);
		echo json_encode($recipe, JSON_PRETTY_PRINT);

	/*Testdata
	$recipe['slug'] = $_GET["slug"];
	$recipe['description'] = "Vestibulum ullamcorper dolor at consectetur sagittis. Integer suscipit quis erat nec auctor. Proin sit amet nunc sit amet elit dignissim aliquam. Nullam euismod in diam a tristique. Nulla at leo non turpis interdum bibendum eget cursus magna. Integer pulvinar suscipit eros a suscipit. Vivamus finibus commodo ligula, a vehicula sem efficitur non. Nullam neque odio, mollis sit amet faucibus in, vehicula at ipsum.";*/
	
	//(GET) Return ALL the recipes in json
	} else{
		/* WORKAROUND
		THE REST REQUEST FROM ANGULAR DOESENT GET HERE, IT GOES TO RECIPES/INDEX.PHP*/
		require_once("allRecipes.php");
		//run getRecipes() from allRecipes.php

		$recipe = getRecipes();
		echo json_encode($recipe, JSON_PRETTY_PRINT);
	}

//PUT: Update a recipe
} else if($_SERVER['REQUEST_METHOD']=='PUT'){
	$recipe = file_get_contents("php://input");
	$recipe = json_decode($recipe, true);

	require_once("updateRecipe.php");
	$recipe = putRecipe($recipe);
	

//DROP: drop one recipe(takes slug)
} else if($_SERVER['REQUEST_METHOD']=='DELETE'){
	//Angular and ajax calls sends json files via with: file_get_contents("php://input")
	
	//explode splits up an array, this will split it at each slash (/) so that recipe[4] contains the slug
	$recipe = explode("/", $_SERVER['REQUEST_URI']);
	//saves the slug into recipe

	$recipeSlug = $recipe[4];
	$recipe = json_encode($recipe);
	
	/*Writes to file "input-data.json"*/
	/*If we want to keep backup of deleted files we can get them now and print to file before deleting*/
	require_once("oneRecipe.php");

	$backup = getRecipe($recipeSlug);
	$backup = json_encode($backup, JSON_PRETTY_PRINT);

	$file_handle = fopen('backup.json', 'a+');
	fwrite($file_handle, $backup);
	fclose($file_handle);

	require_once("dropRecipe.php");
	dropRecipe($recipeSlug);
}

?>