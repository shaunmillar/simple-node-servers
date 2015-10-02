/**
 * New node file
 */
var app = angular.module('myApp', []);
app.controller('bookListController', function($scope, $http) {
	$scope.name='shaun';
	$scope.books=[];
	// see restserver.js for the source of this RESTful service. 
	$http.get('http://localhost:4730/books/api').
    success(function(data) {
        $scope.books = data;
    });
});