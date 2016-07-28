var myApp = angular.module("myApp", []);

myApp.controller("ArticleController", function ($scope, $http) {
    $http.get('./resources/data/articles.data.json').
    success(function (data) {
        $scope.articles = data.articles;
        console.log($scope.articles);
    }).
    error(function (error) {
        console.log("Error reading articles.json: " + error);
    });
});