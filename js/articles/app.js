var myApp = angular.module("myApp", []);

myApp.service('articleService', function ($http) {
	this.getArticlesAsync = function () {
		// $http returns a promise
		var promise = $http.get('./resources/data/articles.data.json');
		return promise;
	};

	this.addNewArticles = function (newArticlesList) {
		this.articles = this.articles.concat(newArticlesList);
	};

	this.getArticles = function (callbackFn) {
		$http.get('./resources/data/articles.data.json')
			.success(function (data) {
				callbackFn(data)
			});

	};
});

myApp.controller("ArticleController", function ($scope, $http, articleService) {

	articleService.getArticlesAsync()
		.then(function (response) {
			$scope.articles = categorizeArticles(response.data.articles, "CSS");
			$scope.articleCategory = String.toString(scope.articles.category);//{{::article.category}}
		});
	/*articleService.getArticles(function(articles){
		 $scope.articles = categorizeArticles(articles, "CSS");
	 });
	console.log("Inside  Article controller");*/
	$scope.$on('sevent', function (event, categoryObj) {
		console.log(event + "category: " + categoryObj.category);
		articleService.getArticlesAsync()
			.then(function (response) {
				console.log("category: " + categoryObj.category);
				$scope.articles = categorizeArticles(response.data.articles, categoryObj.category);
			});
	});
});

myApp.controller("CategoryController", function ($rootScope, $scope, articleService) {
	console.log("CategoryController");
	articleService.getArticlesAsync()
		.then(function successCallback(response) {
			// this callback will be called asynchronously
			// when the response is available
			$scope.categories = fetchCategories(response.data.articles);
			$scope.category = $scope.categories[0];

		}, function errorCallback(response) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
			console.log("errorCallback");
		});
	$scope.onCategoryChange = function () {
		console.log("onCategoryChange: " + this.category);
		$rootScope.$broadcast('sevent', {
			"category": this.category
		});
		console.log("After emit");
	};
});

function categorizeArticles(array, category) {
	var filteredList = [];
	if (array.length > 0) {
		filteredList = array.filter(function (item, idx, array) {
			if (item.category.includes(category)) {
				return true;
			}
			return false;
		}, this);
	} else {
		filteredList = array;
	}
	console.dir(filteredList);
	return filteredList;
}

function fetchCategories(array) {
	var resultCategoryList = [];
	var i = 0,
		l = array.length;
	for (i = 0; i < l; i++) {
		var j = 0;
		var catLen = array[i].category.length;
		for (j = 0; j<catLen; j++) {
			if (resultCategoryList.indexOf(array[i].category[j]) == -1) {
				resultCategoryList.push(array[i].category[j]);
			}
		}
	}
	return resultCategoryList;
}