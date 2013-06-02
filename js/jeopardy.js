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
	$scope.question = {};
	$scope.question.count = '#';
	$scope.question.id = 1;
	$scope.questionindex = 0;

	$scope.loadGame = function () {
		DataService.get({game:'', id:$scope.gameid}).then(function(response){
			$scope.questionindex = 0;
			$scope.questions = response.data;
			$scope.populate();
		});
	};

	$scope.populate = function() {
		/*
		console.log($scope.question.id);
		console.log($scope.questionindex);
		console.log($scope.questions[$scope.questionindex]);
		*/
		$scope.question.id			= $scope.questions[$scope.questionindex]['id'];
		$scope.question.category 	= $scope.questions[$scope.questionindex]['category'];
		$scope.question.question 	= $scope.questions[$scope.questionindex]['clue'];
		$scope.question.answer 		= $scope.questions[$scope.questionindex]['answer'];
		$scope.question.value 		= $scope.questions[$scope.questionindex]['value'];
		$scope.question.round 		= $scope.questions[$scope.questionindex]['round'];
		$scope.question.count 		= $scope.questions.length;
		$scope.gameid 				= $scope.questions[$scope.questionindex]['game'];
	}

	$scope.nextQuestion = function() {
		$scope.question.id++;
		$scope.questionindex++;
		$scope.populate();
	}

	$scope.prevQuestion = function() {
		$scope.question.id--;
		$scope.questionindex--;
		$scope.populate();
	}

	$scope.gotoGame = function($num) {
		$scope.gameid = $num;
		$scope.loadGame();
	}

	$scope.nextGame = function() {
		$scope.gameid++;
		$scope.loadGame();
	}

	$scope.prevGame = function() {
		$scope.gameid--;
		$scope.loadGame();
	}

		$scope.loadGame();

});

/* filters */

jeopardy.filter('valuefilter', function()
{
    return function(value)
    {
    	/*
    	if (typeof(value) == 'string') 
    	{
    		console.log(value + ' ' + typeof(value));
    	} else 
    	{
    		if (value > 999) 
    		{
    			value = value + '';
    			value = value.splice(0,1); // + ',' + value.splice(1)
    			console.log(value);
    		}
    	}
    	*/
        return '$' + value;
    }
});