var myApp = angular.module("myApp", []);

myApp.service('articleService', function ($http) {
	this.articles = [];
	$http.get('./resources/data/articles.data.json').
	success(function (data) {
		this.articles = = data.articles;
	}).
	error(function (error) {
		console.log("Error reading articles.json: " + error);
	});
	this.getArticles = function () {
		return this.articles;
	};
	/*this.setArticles = function (articlesList) {
		this.articles = articlesList;
	};*/
	this.addNewArticles = function (newArticlesList) {
		this.articles = this.articles.concat(newArticlesList);
	};

});

myApp.controller("CategoryController", function ($scope, articleService) {
	console.log("CategoryController: ");
	//Selected default value of dropdown
	$scope.categories = fetchCategories(articleService.getArticles());
	console.log($scope.categories);
	$scope.onCategoryChange = function (item) {
		console.dir("item");
		console.dir(item);
		console.dir($scope.item);
	};
});

myApp.controller("ArticleController", function ($scope, $http, articleService) {
	console.log("ArticleController: " + articleService.getArticles());
	$scope.articles = categorizeArticles(articleService.getArticles(), "JS");
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
	console.dir("fetchCategories" + array);
	for (i = 0; i < l; i++) {
		if (resultCategoryList.indexOf(array[i].category) == -1) {
			resultCategoryList.push(array[i].category);
		}
	}
	return resultCategoryList;
}