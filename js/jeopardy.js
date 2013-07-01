var jeopardy = angular.module('myJeopardy', ['ui.bootstrap']);

/* factories */

jeopardy.factory('DataService', function($http){
    var getRandom = function($params){
        console.log("params");
        console.log($params);
        return $http.get('./games', {match: 'GET'}).
        success(function(data, status, headers, config) {
            return data;
        });
    };
    var getDistance = function($params){
        console.log($params);
        return $http.get('./distance', {match: 'GET', params: $params}).
        success(function(data, status, headers, config) {
            return data;
        });
    };
    return {
        get : getRandom,
        nat : getDistance
    };
});

/* controllers */

jeopardy.controller('BoardController', function($scope, DataService, $timeout) {
    $scope.session = {};
    $scope.modal = {};
    $scope.session.currentscore = 0;
    $scope.session.gamecount = 0;
    $scope.collapsedHeader = false;
    $scope.collapsedOptions = true;
    $scope.collapsedScoring = false;

    $scope.loadGame = function () {
        for (var j = 0; j < 30; j++) {
            $("td[qid='" + j + "']").removeClass("disabledQuestion");
        }
        $scope.session.gamecount++;
        $scope.openLoading();
        DataService.get().then(function(response){
            $scope.questions    = response.data;
        });
        $scope.closeLoading();
    };

    $scope.setQuestion = function ($id) {
        $scope.question = $scope.questions[$id];
        $scope.question.index = $id;
    };

    /* Answer Modal */
    $scope.answerOpts = { // answer modal
        backdropFade: true,
        dialogFade: true,
        backdropClick: true,
        keyboard: true
    };

    $scope.openAnswer = function ($index) {
        $scope.clearModals();
        if ($("td[qid='" + $index + "']").hasClass("disabledQuestion") == false)
        {
            $scope.modal.answerModal = true;
            $scope.answerinput = "";
            $scope.setQuestion($index);
        }
    };

    $scope.closeAnswer = function () {
        $scope.modal.answerModal = false;
    };
    $scope.closeAnswerCorrect = function () {
        console.log("correct");
        $scope.session.currentscore += parseInt($scope.question.value);
        $scope.closeQuestion($scope.question.index);
        $scope.openCIModal(1, 2000);
    };
    $scope.closeAnswerFalse = function () {
        console.log("false");
        $scope.session.currentscore -= parseInt($scope.question.value);
        $scope.closeQuestion($scope.question.index);
        $scope.openCIModal(0, 2000);
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
            $scope.answercorrect = (
                                    ($scope.answerdistances.dice > .51 && 
                                     $scope.answerdistances.jaro > .21) || 
                                    $scope.answerdistances.jaro > .8);
            if ($scope.answercorrect)
                $scope.closeAnswerCorrect();
            else
                $scope.closeAnswerFalse();
        });

    }

    /* Login Modal */
    $scope.loginOpts = { // login modal
        backdropFade: true,
        dialogFade:true
    };

    $scope.openLogin = function () {
        $scope.modal.loginModal = true;
    };

    $scope.closeLogin = function () {
        $scope.modal.loginModal = false;
    };


    /* Register Modal */
    $scope.registerOpts = { // login modal
        backdropFade: true,
        dialogFade:true
    };

    $scope.openRegister = function () {
        $scope.modal.registerModal = true;
    };

    $scope.closeRegister = function () {
        $scope.modal.registerModal = false;
    };


    /* Loading Modal */
    $scope.loadOpts = { // load modal
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


    /* CorrectIncorrect Modal */
    $scope.CIModalOpts = { // load modal
        backdropFade: false,
        dialogFade:false,
        backdropClick: false,
        keyboard: false,
        dialogClass : "modal ciModalOuter"
    };

    $scope.openCIModal = function (correct, $time) {
        $scope.CIModalAnswer = $scope.question.answer;
        $scope.modal.CIModal = true;
        if (correct)
        {
            $scope.CIModalClass = "greenModal";
            $scope.CIModalText = "Correct!";
        }
        else
        {
            $scope.CIModalClass = "redModal";
            $scope.CIModalText = "Incorrect";
        }
        $scope.closeCIModal($time);
    };

    $scope.closeCIModal = function ($time) {
        $timeout(function() {
            $scope.modal.CIModal = false;
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
        $scope.modal.CIModal = false;
        $('div.modal-backdrop').remove();
    };
});

/* filters */

jeopardy.filter('valuefilter', function()
{
    return function(value)
    {
        return '$' + value;
    };
});