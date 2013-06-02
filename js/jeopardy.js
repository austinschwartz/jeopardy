'use strict';

var jeopardy = angular.module('myJeopardy', []);

/* factories */

jeopardy.factory('DataService', function($http){
	var get = function($params){
		return $http.get('http://localhost/spa-jeopardy/api.php', {match: 'GET', params: $params}).
		success(function(data, status, headers, config) {
			return data;
		});
	};
	return {
		get : get
	};
});



/* controllers */

jeopardy.controller('JeopardyController', function($scope, DataService) {
	$scope.gameid = 1;
	$scope.questionid = 0;
	$scope.question = {};
	$scope.questionindex = 0;
	$scope.questioncount = '#';

	$scope.doSearch = function () {
		DataService.get({game:'', id:$scope.gameid}).then(function(response){
			$scope.questionindex = 0;
			$scope.questions = response.data;
			$scope.populate();
			console.log($scope.questions);
		});
	};

	$scope.populate = function() {
		console.log($scope.questionid);
		console.log($scope.questions[$scope.questionid]);
		$scope.gameid = $scope.questions[$scope.questionindex]['id'];
		$scope.question.question = $scope.questions[$scope.questionindex]['clue'];
		$scope.question.answer = $scope.questions[$scope.questionindex]['answer'];
		$scope.questioncount = $scope.questions.length;
	}

	$scope.nextQuestion = function() {
		$scope.questionid++;
		$scope.populate();
	}

	$scope.nextGame = function() {
		$scope.gameid++;
		$scope.doSearch();
	}

	$scope.prevGame = function() {
		$scope.gameid--;
		$scope.doSearch();
	}

	//$scope.$watch($scope.populate);
	//$scope.$watch('gameid', populate());
});