var myApp = angular.module("myApp", []);
/*angular.module('myApp', [])
.run(function($rootScope) {
    $rootScope.test = new Date();
})*/
myApp.controller("CategoryController", function ($scope, $http) {
    $http.get('./resources/data/articles.data.json').
    success(function (data) {
        $scope.categories = data.articles;
		$scope.categories = fetchCategories(data.articles);
        console.log($scope.categories);
    }).
    error(function (error) {
        console.log("Error reading articles.json: " + error);
    });
});

myApp.controller("ArticleController", function ($scope, $http) {
    $http.get('./resources/data/articles.data.json').
    success(function (data) {
        $scope.articles = data.articles;
        //console.log($scope.articles);
		$scope.articles = categorizeArticles($scope.articles, "JS");
    }).
    error(function (error) {
        console.log("Error reading articles.json: " + error);
    });
});

function categorizeArticles(array, category){
	var filteredList = [];
	if(array.length >0){
		filteredList = array.filter(function(item, idx, array){
			if(item.category === category){
				return true;
			}
			return false;
		}, this);
	}else{
		filteredList = array;
	}
	return filteredList;
}

function fetchCategories(array){
	var resultCategoryList = [];
	var i=0, l = array.length;
	console.dir(array);
	console.dir(l);
	for(i=0;i<l;i++){
		if(resultCategoryList.indexOf(array[i].category) == -1){
			resultCategoryList.push(array[i].category);
		}
	}
	return resultCategoryList;
}