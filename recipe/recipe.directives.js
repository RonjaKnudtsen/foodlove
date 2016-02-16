angular.module('recipe.directives').directive('ingredientlistForm', function(){
	return{
		controller: function ($scope){
			counter = 0;
			$scope.ingredientlist = []
			
			//Add a row which the user can input data into
			$scope.addEmptyRow = function(){
				$scope.ingredientlist.push({
					id: counter
				});
				counter ++;
			}
			//Add row as we fetch data from server
			$scope.addRow = function(data){
				data.id = counter;
				$scope.ingredientlist.push(data);
				counter++;
			}
			//This will remove the row, but not from the server
			$scope.removeRow = function(index){
				$scope.ingredientlist.splice(index, 1);
			}

		},
		templateUrl:'ingredientlist/_form.html'
	};

}).directive('recipeForm', function(){
	return{
		templateUrl:'recipe/_form.html'
	}
});

