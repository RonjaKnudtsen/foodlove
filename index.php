<!--Makes the app-->
<html ng-app="foodlove">
	<head>
		<!--Bootstrap css-->
		<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.css">

		<!-- load angular and angular route via CDN and angular resource -->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.js"></script>     
        <script src="angular-ui-router.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-resource.js"></script>
        <script src="angular-popup-service.js"></script>

        <!--app.js: Our main app, collecting all controllers and views together-->
        <script src="app.js"></script>

        <!--Load all our recipe controllers-->
        <script src="recipe/all-recipes-controller.js"></script>
        <script src="recipe/one-recipe-controller.js"></script>
        <script src="recipe/new-recipe-controller.js"></script>
        <script src="recipe/edit-recipe-controller.js"></script>

        <!--Loading directives-->

        <script src="recipe/recipe.directives.js"></script>

	</head>

	<!--The app runs inside body-->
    <!--Loads the main controller-->
	<body 
		<div>
			<header>
            <nav class="navbar navbar-default">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/">Food-love</a>
                </div>

                <ul id="menu" class="nav navbar-nav navbar-right">
                    <li><a href="#"><i class="fa fa-home"></i>Recipes</a></li>
                    <li><a href="#about"><i class="fa fa-shield"></i>Ingredients</a></li>
                </ul>
            </div>
            </nav>
        </header>

        <!-- MAIN CONTENT AND INJECTED VIEWS -->
        <!-- angular templating -->
        <!-- this is where content will be injected -->
        <div id="main" class="container bs-docs-container">
        	<div ui-view>

        	</div>
            <div ui-view="recipe"></div>
            <!--<div ui-view="ingredientlist"></div>
            <!-- Future views:
            <div ui-view="xBenefit"></div>
            <div ui-view="allergylist"></div> -->


        	

        </div>
			<footer>
				
			</footer>

			
		</center>
	</body>

</html>
