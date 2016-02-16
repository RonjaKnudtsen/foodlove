angular.module('recipe.controllers').controller('edit-recipe-controller',function($scope, $state, $stateParams, RecipeService, IngredientListService){

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
					$scope.addRow($scope.list[i]);
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
					$scope.list = new IngredientListService();

					$scope.list.quantity = $scope.ingredientlist[i].quantity;
					$scope.list.unit = $scope.ingredientlist[i].unit;
					$scope.list.ingredient = $scope.ingredientlist[i].ingredient;
					$scope.list.comment = $scope.ingredientlist[i].comment;
					$scope.list.grams = $scope.ingredientlist[i].grams;

					$scope.list.recipeId = $scope.recipe.id;

					$scope.list.$save(function(response){
						console.log(response);
						$state.go('recipes');
					});

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


});