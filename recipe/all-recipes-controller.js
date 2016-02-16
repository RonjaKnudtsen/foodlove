angular.module('recipe.controllers').controller('all-recipes-controller', function($scope, $state, RecipeService){
	$scope.recipelist = RecipeService.query(function(){
		//console.log($scope.recipelist);
	});
	//This should be placed in a directive instead
	//This should be placed somewhere else
	$scope.deleteRecipe = function(recipe, index){
		$slug = recipe.slug;
		console.log($scope.slug);
		recipe.$delete({slug:$slug}, function(response){
			console.log("Recipe deleted from server:");
			$scope.recipelist.splice(index, 1);

		});
	}
	/*
	$scope.ingredientlist
	$scope.x-benefitlist
	$scope.allergylist*/

});


