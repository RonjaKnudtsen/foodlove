//Create new module to contain all recipe controllers
angular.module('recipe.controllers', []).controller('recipe-controller',function($scope, $state, RecipeService) {

var recipelist = RecipeService.query(function(){
	console.log(recipelist);
});
$scope.recipelist = recipelist;

$scope.deleteRecipe = function(recipe, index){
	$slug = recipe.slug;
	console.log($scope.slug);
	recipe.$delete({slug:$slug}, function(response){
		console.log("Recipe deleted from server:");
		$scope.recipelist.splice(index, 1);

	});
}


}).controller('one-recipe-controller',function($scope, $stateParams, RecipeService, IngredientListService){
	$scope.ingredientlist = [];
	$scope.recipe = RecipeService.get({slug: $stateParams.slug}, function(){
			console.log($scope.recipe.id);
			rId = $scope.recipe.id
			$scope.list = IngredientListService.get({recipeId: rId}, function(response){
				console.log("ingredientlist: ");
				console.log($scope.list);
				$scope.ingredientlist.push($scope.list);
				//     VI SENDER BARE EN FRA SERVEREN 
				//		MÅ HENTE UT FLERE
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
	/*$scope.ingredientlist = [
		{quantity: '1', unit: 'liter', name: 'melk'},
		{quantity: '3', unit: 'desiliter', name: 'hvetemel'},
		{quantity: '1', unit: 'knust', name: 'banan', comment:'frossen'},
	];*/

}).controller('edit-recipe-controller',function($scope, $state, $stateParams, RecipeService){

	var recipe = RecipeService.get({slug: $stateParams.slug});
	console.log(recipe);
	$scope.recipe = recipe;

	//Create a new RecipeService instance 

	//action which is fired on update
	$scope.updateRecipe = function () {
		//on the server side we use the slug to find the same recipe
		$scope.recipe.$update(function(response){
			console.log(response);
			$state.go('recipes');
		});
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