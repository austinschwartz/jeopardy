var jeopardy = angular.module('myJeopardy', ['ui.bootstrap']);

/* factories */

jeopardy.factory('DataService', function($http){
	var get = function($params){
		return $http.get('http://www.austinschwartz.com/jeopardy/angular2/api.php', {match: 'GET', params: $params}).
		success(function(data, status, headers, config) {
			return data;
		});
	};
	return {
		get : get
	};
});

/* controllers */

jeopardy.controller('BoardController', function($scope, DataService) {
	$scope.num = 1;
	$scope.airdate = '';
	$scope.roundnum = 1;

	$scope.loadGame = function () {
		$scope.startLoading();
		DataService.get({category:''}).then(function(response){
			$scope.questions 	= response.data;
			$scope.gamenum 		= $scope.questions[1]['game'];
			$scope.categories 	= {};
			$scope.roundcount 	= 0;
			$scope.airdate = $scope.questions[1]['airdate'];

			console.log($scope.questions);

			console.log("loaded");
			$scope.endLoading();
		});
	};

	$scope.setQuestion = function ($id) {
		$scope.question = $scope.questions[$id];
	}

	$scope.open = function ($id) {
		$scope.shouldBeOpen = true;
		$scope.setQuestion($id);
	};

	$scope.close = function () {
		$scope.shouldBeOpen = false;
	};

	$scope.startLoading = function () {
		$scope.loading = true;
	};

	$scope.endLoading = function () {
		$scope.loading = false;
	};

	$scope.opts = { // answer modal
		backdropFade: true,
		dialogFade:true
	};

	$scope.loadopts = { // load modal
		backdropFade: true,
		dialogFade:true
	};
});

/* filters */

jeopardy.filter('valuefilter', function()
{
	return function(value)
	{
    	return '$' + value;
    }
});