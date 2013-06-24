var jeopardy = angular.module('myJeopardy', ['ui.bootstrap']);

/* factories */

jeopardy.factory('DataService', function($http){
	var get = function($params){
<<<<<<< HEAD
		return $http.get('./api.php', {match: 'GET', params: $params}).
=======
		return $http.get('http://www.austinschwartz.com/jeopardy/angular2/api.php', {match: 'GET', params: $params}).
>>>>>>> 02c402e302860ab4a30399b60794b59ac1f0d1ed
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
<<<<<<< HEAD
		$scope.openLoading();
=======
		$scope.startLoading();
>>>>>>> 02c402e302860ab4a30399b60794b59ac1f0d1ed
		DataService.get({category:''}).then(function(response){
			$scope.questions 	= response.data;
			$scope.gamenum 		= $scope.questions[1]['game'];
			$scope.categories 	= {};
			$scope.roundcount 	= 0;
			$scope.airdate = $scope.questions[1]['airdate'];

			console.log($scope.questions);

			console.log("loaded");
<<<<<<< HEAD
			$scope.closeLoading();
=======
			$scope.endLoading();
>>>>>>> 02c402e302860ab4a30399b60794b59ac1f0d1ed
		});
	};

	$scope.setQuestion = function ($id) {
		$scope.question = $scope.questions[$id];
	}

<<<<<<< HEAD
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
=======
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
>>>>>>> 02c402e302860ab4a30399b60794b59ac1f0d1ed
		backdropFade: true,
		dialogFade:true
	};

<<<<<<< HEAD
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



=======
	$scope.loadopts = { // load modal
		backdropFade: true,
		dialogFade:true
	};
>>>>>>> 02c402e302860ab4a30399b60794b59ac1f0d1ed
});

/* filters */

jeopardy.filter('valuefilter', function()
{
	return function(value)
	{
    	return '$' + value;
    }
});