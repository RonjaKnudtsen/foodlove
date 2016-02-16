angular.module('recipe.controllers').controller('new-recipe-controller',function($scope, $state, $stateParams, RecipeService, IngredientListService){

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