var jeopardy = angular.module('myJeopardy', ['ui.bootstrap']);

jeopardy.factory('DataService', function($http){
  var getRandom = function($params){
    return $http.get('./api/games', {match: 'GET'}).
      success(function(data, status, headers, config) {
        return data;
      });
  };
  var getDistance = function($params){
    console.log($params);
    return $http.get('./api/distance', {match: 'GET', params: $params}).
      success(function(data, status, headers, config) {
        return data;
      });
  };
  return {
    get : getRandom,
    nat : getDistance
  };
});

jeopardy.controller('BoardController', function($scope, DataService, $timeout) {
  $scope.session = {};
  $scope.modal = {};
  $scope.session.currentscore = 0;
  $scope.session.gamecount = 0;
  $scope.collapsedHeader = false;
  $scope.collapsedOptions = true;
  $scope.collapsedScoring = false;
  $scope.values = false;

  $scope.loadGame = function () {
    for (var j = 0; j < 30; j++) {
      $("td[qid='" + j + "']").removeClass("disabledQuestion");
    }
    $scope.session.gamecount++;
    $scope.openLoading();
    DataService.get().then(function(response){
      $scope.questions = response.data;
    });
    $scope.closeLoading();
  };

  $scope.flipValues = function () {
    var url = window.location.href;    
    if (url.indexOf('values') > -1){
      url = '/';
    } else {
      url += '?values'
    }
    window.location.href = url;
  }

  $scope.setQuestion = function ($id) {
    $scope.question = $scope.questions[$id];
    $scope.question.index = $id;
  };

  $scope.answerOpts = {
    backdropFade: true,
    dialogFade: true,
    backdropClick: true,
    keyboard: true
  };

  $scope.openAnswer = function ($index) {
    $scope.clearModals();
    if ($("td[qid='" + $index + "']").hasClass("disabledQuestion") === false) {
      $scope.modal.answerModal = true;
      $scope.answerinput = "";
      var timer = setTimeout(function() {
        $("#answerInput").focus(); 
      }, 0);
      $scope.setQuestion($index);
    }
  };

  $scope.closeAnswer = function () {
    $scope.modal.answerModal = false;
  };

  $scope.closeAnswerCorrect = function () {
    console.log("correct");
    $scope.session.currentscore += parseInt($scope.question.value, 10);
    $scope.closeQuestion($scope.question.index);
    $scope.openCIPopout(1, 2000);
  };

  $scope.closeAnswerFalse = function () {
    console.log("false");
    $scope.session.currentscore -= parseInt($scope.question.value, 10);
    $scope.closeQuestion($scope.question.index);
    $scope.openCIPopout(0, 2000);
  };

  $scope.closeQuestion = function($index) {
    $("td[qid='" + $index + "']").addClass("disabledQuestion");
    $scope.answerdistances = {};
    $scope.answercorrect = false;
  };

  $scope.submitAnswer = function() {
    DataService.nat({
      "input" : $scope.answerinput, 
      "answer" : $scope.question.answer
    }).then(function(response){
      $scope.answerdistances = response.data;
      console.log($scope.answerdistances);
      // old scheme
      //$scope.answercorrect = (($scope.answerdistances.dice > .51 &&
            //$scope.answerdistances.jaro > .21) ||
          //$scope.answerdistances.jaro > .8);

      // new scheme, yes i realize this code is bad.
      let w1 = 4.42728467;
      let w2 = 6.21669149;
      let w3 = 5.05926221;
      let t = 5.11831322;
      let dice = $scope.answerdistances.dice;
      let jaro = $scope.answerdistances.jaro;
      let levNorm = 1 - $scope.answerdistances.leven / Math.max($scope.answerinput.length, $scope.question.answer.length);
      console.log(dice + " " + jaro + " " + levNorm);
      console.log((w1 * jaro + w2 * levNorm + w3 * dice) + " > " + t);
      $scope.answercorrect = w1 * jaro + w2 * levNorm + w3 * dice > t;
      if ($scope.answercorrect)
        $scope.closeAnswerCorrect();
      else
        $scope.closeAnswerFalse();
    });
  }

  $scope.loginOpts = {
    backdropFade: true,
    dialogFade:true
  };

  $scope.openLogin = function () {
    $scope.modal.loginModal = true;
  };

  $scope.closeLogin = function () {
    $scope.modal.loginModal = false;
  };

  $scope.registerOpts = {
    backdropFade: true,
    dialogFade:true
  };

  $scope.openRegister = function () {
    $scope.modal.registerModal = true;
  };

  $scope.closeRegister = function () {
    $scope.modal.registerModal = false;
  };

  $scope.loadOpts = {
    backdropFade: true,
    dialogFade:true,
    backdropClick: true,
    keyboard: true
  };

  $scope.openLoading = function () {
    $scope.modal.loadingModal = true;
  };

  $scope.closeLoading = function () {
    $scope.modal.loadingModal = false;
  };

  $scope.openCIPopout = function (correct, $time) {
    $scope.CIPopoutAnswer = $scope.question.answer;
    $scope.modal.CIPopout = true;
    if (correct) {
      $scope.CIPopoutClass = "greenPopout";
      $scope.CIPopoutText = "Correct!";
    }
    else {
      $scope.CIPopoutClass = "redPopout";
      $scope.CIPopoutText = "Incorrect";
    }
    $scope.closeCIPopout($time);
  };

  $scope.closeCIPopout = function ($time) {
    $timeout(function() {
      $scope.modal.CIPopout = false;
      $scope.clearModals();
    }, $time);
  };

  $scope.clearModals = function () {
    $scope.closeAnswer();
    $scope.closeLoading();
    $scope.closeRegister();
    $scope.closeLogin();
    $scope.closeQuestion();
    $scope.modal.answerModal = false;
    $scope.modal.CIPopout = false;
    $('div.modal-backdrop').remove();
  };
});

jeopardy.filter('valuefilter', function() {
  return function(value) {
    return '$' + value;
  };
});
