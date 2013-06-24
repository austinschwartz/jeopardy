var jeopardy = angular.module('myJeopardy', ['ui.bootstrap']);

/* factories */

jeopardy.factory('DataService', function($http){
	var get = function($params){
		return $http.get('./api.php', {match: 'GET', params: $params}).
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
		$scope.openLoading();
		DataService.get({category:''}).then(function(response){
			$scope.questions 	= response.data;
			$scope.gamenum 		= $scope.questions[1]['game'];
			$scope.categories 	= {};
			$scope.roundcount 	= 0;
			$scope.airdate = $scope.questions[1]['airdate'];

			console.log($scope.questions);

			console.log("loaded");
			$scope.closeLoading();
		});
	};

	$scope.setQuestion = function ($id) {
		$scope.question = $scope.questions[$id];
	}

	/* Answer Modal */
	$scope.answerOpts = { // answer modal
		backdropFade: true,
		dialogFade:true
	};

	$scope.openAnswer = function ($id) {
		$scope.answerModal = true;
		$scope.setQuestion($id);
	};

	$scope.closeAnswer = function () {
		$scope.answerModal = false;
	};



	/* Login Modal */
	$scope.loginOpts = { // login modal
		backdropFade: true,
		dialogFade:true
	};

	$scope.openLogin = function () {
		$scope.loginModal = true;
	};

	$scope.closeLogin = function () {
		$scope.loginModal = false;
	};


	/* Register Modal */
	$scope.registerOpts = { // login modal
		backdropFade: true,
		dialogFade:true
	};

	$scope.openRegister = function () {
		$scope.registerModal = true;
	};

	$scope.closeRegister = function () {
		$scope.registerModal = false;
	};


	/* Loading Modal */
	$scope.loadOpts = { // load modal
		backdropFade: true,
		dialogFade:true,
		backdropClick: false,
		keyboard: false
	};

	$scope.openLoading = function () {
		$scope.loadingModal = true;
	};

	$scope.closeLoading = function () {
		$scope.loadingModal = false;
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