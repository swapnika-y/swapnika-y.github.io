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

    /*this.articles = [];
    $http.get('./resources/data/articles.data.json').
    success(function (data) {
        this.articles = data.articles;
        console.log("articleService: ", data.articles);
    }).
    error(function (error) {
        console.log("Error reading articles.json: " + error);
    });

    this.getArticles = function () {
        return this.articles;
    };

    //this.setArticles = function (articlesList) {
	//	this.articles = articlesList;
	//};

    this.addNewArticles = function (newArticlesList) {
        this.articles = this.articles.concat(newArticlesList);
    };*/

});

myApp.controller("CategoryController", function ($scope, articleService) {
    console.log("CategoryController");
    articleService.getArticlesAsync()
        .then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            $scope.categories = fetchCategories(response.data.articles);
            console.log($scope.categories);
            $scope.onCategoryChange = function (item) {
                console.dir("item");
                console.dir(item);
                console.dir($scope.item);
            };
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("errorCallback");
        });

    /*console.log("CategoryController: ");
    $scope.categories = fetchCategories(articleService.getArticles());
    console.log($scope.categories);
    $scope.onCategoryChange = function (item) {
        console.dir("item");
        console.dir(item);
        console.dir($scope.item);
    };*/
});

myApp.controller("ArticleController", function ($scope, $http, articleService) {
    console.log("ArticleController");
    articleService.getArticlesAsync()
        .then(function (response) {
            $scope.articles = categorizeArticles(response.data.articles, "CSS");
            console.log($scope.articles);
        });

    /*$scope.articles = categorizeArticles(articleService.getArticles(), "JS");*/
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
