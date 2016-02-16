angular.module('recipe.controllers').controller('new-recipe-controller',function($scope, $state, $stateParams, RecipeService, IngredientListService){

		$scope.recipeId;
		//Create a new RecipeService instance 
		$scope.recipe = new RecipeService();
	
	//	$scope.ingredientlist = new IngredientListService();
	//	$scope.ingredientlist.recipeId = $scope.recipeId;
	//	$scope.ingredientlist = $scope.ingredientlist;

		$scope.addRecipe= function(){
			//this new instance should save recipe
			console.log($scope.ingredientlist);
			console.log("FOEACH");

			$scope.recipe.$save(function(response){
				$scope.recipeId = (response.recipeId);
				console.log("Recipe saved:");
				console.log(response);
console.log("*******Ingredientlist:");
console.log($scope.ingredientlist);

				for(index = 0; index < $scope.ingredientlist.length; ++index){
					//$scope.ingredientlist[index].recipeId = $scope.recipeId;
					//console.log("RecipeID: "+$scope.ingredientlist[index].recipeId);
					$scope.list = new IngredientListService();

					$scope.list.quantity = $scope.ingredientlist[index].quantity;
					$scope.list.unit = $scope.ingredientlist[index].unit;
					$scope.list.ingredient = $scope.ingredientlist[index].ingredient;
					$scope.list.comment = $scope.ingredientlist[index].comment;
					$scope.list.grams = $scope.ingredientlist[index].grams;

					$scope.list.recipeId = $scope.recipeId;

					$scope.list.$save(function(response){
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