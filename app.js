 //---------CREATE MODULE
// create the module and name it food-love
//Takes ngRoute, resource, the recipe controller(module), the recipe service(module), and later ingredient controller and service
//The recipe controller module contains all the controllers for the recipes, and same with the recipe-service module  
//They need to be loaded in the index


//Initiates a empty recipe module for controllers, the individual controllers assign themselves to this later. 
//Splitting up controllers: http://stackoverflow.com/questions/20087627/how-to-create-separate-angularjs-controller-files
angular.module('recipe.controllers', []);
angular.module('recipe.directives', []);
var foodlove = angular.module('foodlove', ['ui.router', 'ngResource', 'recipe.controllers', 'recipe.directives']);

 //---------RouteProvider
 //Maybe change this to stateprovider later?
 //Tutorial: http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
 //Difference: http://stackoverflow.com/questions/27645202/what-is-the-difference-between-routeprovider-and-stateprovider-in-angularjs
foodlove.factory('RecipeService', function($resource){
        //Uses slugs as id, they should be UNIQUE
        return $resource('api/recipe/:slug', {slug: '@slug'},{
            update: {
                method: 'PUT'
            }
        });
    });

foodlove.factory('IngredientListService', function($resource){
        //Uses slugs as id, they should be UNIQUE
        var listServiceResource = $resource('api/ingredientlist/:recipeId',
            {recipeId: '@recipeId'},{
                query: {
                    method: 'GET',
                    isArray:true,
                    params:{
                        recipeId: '@recipeId'
                        }
                    },
                update: {
                    method: 'PUT'
                    }
            });
        
        return listServiceResource;
    });

//Slett skal slette alle med samme recipeId
//Update skal oppdatere alle med samme recipeId
//Post blir som vanlig


 foodlove.config(function($stateProvider){
    $stateProvider.state('recipes', {
        url: '/recipe',
        templateUrl : 'recipe/all-recipes.html',
        controller  : 'all-recipes-controller'
    }).state('newRecipe',{
        url:'/recipe/new',
        views: {
            'recipe':{
                templateUrl: 'recipe/new-recipe.html',
                controller: 'new-recipe-controller'
            },
            'ingredientlist':{
                templateUrl: 'ingredientlist/new-ingredientlist.html',
                controller: 'new-recipe-controller',
                parent: 'recipe'
            }
        }
    }).state('oneRecipe', {
        url:'/recipe/:slug',
        templateUrl: 'recipe/one-Recipe.html',
        controller  : 'one-recipe-controller'
    }).state('editRecipe', {
        url:'/recipe/:slug/edit',
        templateUrl : 'recipe/edit-recipe.html',
        controller  : 'edit-recipe-controller'
    });
}).run(function($state){
    $state.go('recipes');
});

