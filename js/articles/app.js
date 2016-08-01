var myApp = angular.module("myApp", []);

myApp.service('articleService', function () {
	this.articles = [];
	this.getArticles = function () {
		return this.articles;
	};
	this.setArticles = function (articlesList) {
		this.articles = articlesList;
	};
	this.addNewArticles = function (newArticlesList) {
		this.articles = this.articles.concat(newArticlesList);
	};

});
/*function ctrl($scope) {
  $scope.itemList = [];
  $scope.blisterPackTemplates = [{id:1,name:"a"},{id:2,name:"b"},{id:3,name:"c"}];

  $scope.changedValue = function(item) {
    $scope.itemList.push(item.name);
  }       
}*/

myApp.controller("CategoryController", function ($scope, $http, articleService) {
	console.log("CategoryController: ");
	//Selected default value of dropdown
	$http.get('./resources/data/articles.data.json').
	success(function (data) {
		//$scope.categories = data.articles;
		articleService.setArticles(data.articles);
		$scope.categories = fetchCategories(articleService.getArticles());
		console.log($scope.categories);
	}).
	error(function (error) {
		console.log("Error reading articles.json: " + error);
	});
	$scope.onCategoryChange = function(item){
		console.dir("item");
		console.dir(item);
		console.dir($scope.item);
	};
});

myApp.controller("ArticleController", function ($scope, $http, articleService) {
	console.log("ArticleController: "+articleService.getArticles());
	$scope.articles = categorizeArticles(articleService.getArticles(), "JS");
	/*$http.get('./resources/data/articles.data.json').
	success(function (data) {
		$scope.articles = data.articles;
		//console.log($scope.articles);
		$scope.articles = categorizeArticles($scope.articles, "JS");
	}).
	error(function (error) {
		console.log("Error reading articles.json: " + error);
	});*/
});

function categorizeArticles(array, category) {
	var filteredList = [];
	if (array.length > 0) {
		filteredList = array.filter(function (item, idx, array) {
			if (item.category === category) {
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
	console.dir("fetchCategories"+array);
	for (i = 0; i < l; i++) {
		if (resultCategoryList.indexOf(array[i].category) == -1) {
			resultCategoryList.push(array[i].category);
		}
	}
	return resultCategoryList;
}
