angular.module('recipe.controllers').controller('one-recipe-controller',function($scope, $stateParams, RecipeService, IngredientListService){
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
			/*Get the list of allergies
			$scope.allergy = AllergyListService.query({recipeId: rId}, function(response){

			})*/
	});


	//Use the different ID from the recipe to

	//Get the xBenefit with description
	//$scope.xBenefit = RecipeService.get({recipe.xBenefitId});

});