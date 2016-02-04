//Create new module to contain all recipe controllers
angular.module('recipe.controllers', [])

//Controller for multiple recipes
.controller('recipe-controller',function($scope, $state, RecipeService) {

$scope.recipelist = RecipeService.query(function(){
	//console.log($scope.recipelist);
});

//This should be placed somewhere else
$scope.deleteRecipe = function(recipe, index){
	$slug = recipe.slug;
	console.log($scope.slug);
	recipe.$delete({slug:$slug}, function(response){
		console.log("Recipe deleted from server:");
		$scope.recipelist.splice(index, 1);

	});
}


}).controller('one-recipe-controller',function($scope, $stateParams, RecipeService, IngredientListService){
	//To hold the ingredientlist as we fetch it async
	$scope.ingredientlist = [];
	//Get the recipe from resource
	$scope.recipe = RecipeService.get({slug: $stateParams.slug}, function(){
			//Save the recipe ID 
			rId = $scope.recipe.id
			//Get all the rows for the ingredientlist based on recipe ID
			$scope.list = IngredientListService.query({recipeId: rId}, function(response){
				//Push the listelement onto the ingredientlist array
				for (var i = 0; i < $scope.list.length; i++) {
					$scope.ingredientlist.push($scope.list[i]);
					console.log($scope.ingredientlist);
				};
			});
	});


	//Use the different ID from the recipe to
	//Get the list of allergies
	//$scope.allergy = RecipeService.get({recipe.allergyId});
	//Get a list of the ingredients used
	//$scope.ingredientlist = RecipeService.get({recipe.ingredientListId});
	//Get the xBenefit with description
	//$scope.xBenefit = RecipeService.get({recipe.xBenefitId});





	//$stateParams has the slug, which we can use to retrieve form the database
	//$stateParams.slug
	//from the example: $scope.movie = Movie.get({ id: $stateParams.id }); 


}).controller('edit-recipe-controller',function($scope, $state, $stateParams, RecipeService, IngredientListService){

	//This exact duplicate is also in "new recipe", should be moved into a directive or something
	var counter = 0;
	$scope.ingredientlist = [{
		id: counter
	}]
	
	$scope.addRow = function(){
		console.log ("ADD");
		counter ++;
		$scope.ingredientlist.push({
			id: counter
		});
	}
	$scope.removeRow = function(index){
		$scope.ingredientlist.splice(index, 1);
	}



	$scope.ingredientlist = [];
	//Get the recipe from resource
	$scope.recipe = RecipeService.get({slug: $stateParams.slug}, function(){
			//Save the recipe ID 
			rId = $scope.recipe.id

			//Get all the rows for the ingredientlist based on recipe ID
			$scope.list = IngredientListService.query({recipeId: rId}, function(response){
				//Push the listelement onto the ingredientlist array
				for (var i = 0; i < $scope.list.length; i++) {
					//Turn the floats into integers, not strings!
					$scope.list[i].quantity = parseInt($scope.list[i].quantity);
					$scope.list[i].grams = parseInt($scope.list[i].grams);
					
					//Push the ingredientlist we got onto the list array
					$scope.ingredientlist.push($scope.list[i]);

					console.log(typeof $scope.list[i].quantity);
					console.log(typeof $scope.list[i].grams);
					console.log($scope.ingredientlist[i]);
				};
			});
	});



	//Create a new RecipeService instance 

	//action which is fired on update
	$scope.updateRecipe = function () {
		//on the server side we use the slug to find the same recipe
		$scope.recipe.$update(function(repsonse){


			 $scope.list = $scope.ingredientlist;


			//console.log(response);	
			//Update ingredientlist after the recipe is updated.
			//THis is so we know both are done befor changing state.

			for (var i = 0; i < $scope.ingredientlist.length; i++) {
				//Need to add the new items onto the service instance like in new recipe
				//If there is an instance of the list item update it, else create a new
				if($scope.list[i].$update){
					$scope.list[i].$update(function(response){
						console.log(response);	
					});
				}else{

					console.log("List:");
					console.log($scope.list[i]);

					$scope.list[i].recipeId = $scope.recipe.id;
					console.log($scope.list[i]);
					//$scope.list[i] = new IngredientListService(); 

					$scope.list[i].$save();
					console.log($scope.list[i]);

					//$scope.list[i] = new IngredientListService(); 

					//Push the item from the table back to the instance
					/*$scope.ingredientlist[i].recipeId = $scope.recipe.id;
					console.log("Ingredientlist object:");
					console.log($scope.ingredientlist[i].recipeId);
					console.log($scope.ingredientlist[i].ingredient);


					$scope.list[i] = $scope.ingredientlist[i];
					console.log("Ingredientlist instance:");
					console.log($scope.ingredientlist[i]);

					$scope.ingredientlist[i].$save();
/*
					$scope.list[i].push($scope.ingredientlist[i]);
					$scope.list[i].recipeId = $scope.recipeId;
					$scope.list[i] = new IngredientListService();*/
				};
				
				
			};
			$state.go('recipes');
		});

		//Create a new ListService instance 
		//Cant just update the previous one because we might have new rows
		//In the backend we need to remove the ones that arent created here
		/*$scope.ingredientlist = new IngredientListService();

		$scope.ingredientlist.$save*/
	};


}).controller('new-recipe-controller',function($scope, $state, $stateParams, RecipeService, IngredientListService){
		//takes .recipe from ng model and makes a new recipeservice object
		//$scope.recipe = new RecipeService();

		/*
		MOVE THE EXTRA FUNCTIONS INTO DIRECTIVES
		*/
		var counter = 0;
		$scope.ingredientlistInput = [{
			id: counter
		}]

		$scope.addRow = function(){
			console.log ("ADD");
			counter ++;
			$scope.ingredientlistInput.push({
				id: counter
			});
		}
		$scope.removeRow = function(index){
			$scope.ingredientlistInput.splice(index, 1);
		}



		$scope.recipeId;
		//Create a new RecipeService instance 
		$scope.recipe = new RecipeService();
	
	//	$scope.ingredientlist = new IngredientListService();
	//	$scope.ingredientlist.recipeId = $scope.recipeId;
	//	$scope.ingredientlist = $scope.ingredientlistInput;
		$scope.addRecipe= function(){
			//this new instance should save recipe
			console.log($scope.ingredientlistInput);
			console.log("FOEACH");

			$scope.recipe.$save(function(response){
				$scope.recipeId = (response.recipeId);
				console.log("Recipe saved:");
				console.log(response);



				for(index = 0; index < $scope.ingredientlistInput.length; ++index){
					//$scope.ingredientlistInput[index].recipeId = $scope.recipeId;
					//console.log("RecipeID: "+$scope.ingredientlistInput[index].recipeId);
					$scope.ingredientlist = new IngredientListService();

					$scope.ingredientlist.quantity = $scope.ingredientlistInput[index].quantity;
					$scope.ingredientlist.unit = $scope.ingredientlistInput[index].unit;
					$scope.ingredientlist.ingredient = $scope.ingredientlistInput[index].ingredient;
					$scope.ingredientlist.comment = $scope.ingredientlistInput[index].comment;
					$scope.ingredientlist.grams = $scope.ingredientlistInput[index].grams;

					$scope.ingredientlist.recipeId = $scope.recipeId;

					$scope.ingredientlist.$save(function(response){
						console.log(response);
						$state.go('recipes');
					});
				}


			//Save the ingredientlist after we have produced a recipeId

				/*$scope.ingredientlist.recipeId = $scope.recipeId;
				console.log("second response:");
				console.log($scope.ingredientlist);

				$scope.ingredientlist.$save(function(response){
						console.log(response);
						$state.go('recipes');
					});*/

			});



		};


/*

	$scope.recipe = new RecipeService();
	console.log($scope.recipe);

	$scope.addRecipe = function(){ //Issues a POST to /api/recipe
		console.log($scope.recipe.$save());
/*
		$scope.recipe.$save(function(){
			console.log('saved');
			console.log
			//$state.go('recipes') //on sucess go back home, state recipe
		});*/
	//};
});