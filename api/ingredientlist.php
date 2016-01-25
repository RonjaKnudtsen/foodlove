<?php
//run the correct methods for each action
//GET(slug), GET, POST, PUT(SLUG) and DROP(SLUG)
//Post: Add one new ingredientlist, takes a json object
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	$ingredientlist = file_get_contents("php://input");
	$ingredientlist = json_decode($ingredientlist, true); //True = assosiative array
	//$ingredientlist = json_encode($ingredientlist, JSON_PRETTY_PRINT);

	require_once("saveIngredientlist.php");
	saveIngredientList($ingredientlist);

//Get: get one or all ingredientlists
} else if ($_SERVER['REQUEST_METHOD'] == 'GET'){
	//(GET) Return ONE ingredientlist in json
	//One ingredientlist has multiple rows
	if (isset($_GET["recipeId"])) {
		//echo $_GET["recipeId"];
		require_once ('oneIngredientList.php');
		$ingredientlist = getIngredientlist($_GET["recipeId"]);
		echo json_encode($ingredientlist, JSON_PRETTY_PRINT);
		
	//(GET) Return ALL the ingredientlists in json
	} else{
		//If we havent specified a recipeID, run this.
	}

//PUT: Update a ingredientlist
} else if($_SERVER['REQUEST_METHOD']=='PUT'){
	//get and decode the ingredientlist
	$ingredientlist = file_get_contents("php://input");
	$ingredientlist = json_decode($ingredientlist, true);

	//Open file and run putIngredientlist
	require_once("updateIngredientlist.php");
	$ingredientlist = putIngredientlist($ingredientlist);

//DROP: drop one ingredientlist(takes slug)
} else if($_SERVER['REQUEST_METHOD']=='DELETE'){

}

?>