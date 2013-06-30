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
        $scope.categories   = [];
        $scope.openLoading();
        DataService.get().then(function(response){
            $scope.questions    = response.data;
            //console.log($scope.questions);
            /*
            for (var i = 0; i < $scope.questions.length; i++)
            {
                if ($scope.categories.indexOf($scope.questions[i]['category']) < 0)
                {
                    $scope.categories.push($scope.questions[i]['category']);
                }
            }
            */
            console.log("loaded");
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
        dialogFade:true,
        backdropClick: false,
        keyboard: false
    };

    $scope.openAnswer = function ($index) {
        if ($("td[qid='" + $index + "']").hasClass("disabledQuestion") == false)
        {
            $scope.answerModal = true;
            $scope.answer = "";
            $scope.setQuestion($index);
        }
    };

    $scope.closeAnswer = function () {
        $scope.answerModal = false;
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
                "input" : $scope.answer, 
                "answer" : $scope.question.answer
        }).then(function(response){
            $scope.answerdistances = response.data;
            console.log($scope.answerdistances);
            $scope.answercorrect = ($scope.answerdistances.dice > .51 || $scope.answerdistances.jaro > .8);
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
        //backdropClick: false,
        //keyboard: false
        backdropClick: true,
        keyboard: true
    };

    $scope.openLoading = function () {
        $scope.loadingModal = true;
    };

    $scope.closeLoading = function () {
        $scope.loadingModal = false;
    };


    /* CorrectIncorrect Modal */
    $scope.CIModalOpts = { // load modal
        backdropFade: true,
        dialogFade: true,
        backdropClick: true,
        keyboard: true
    };

    $scope.openCIModal = function (correct, $time) {
        $scope.CIModalAnswer = $scope.question.answer;
        $scope.CIModal = true;
        if (correct)
            $scope.CIModalText = "Correct!";
        else
            $scope.CIModalText = "Incorrect";
        $scope.closeCIModal($time);
    };

    $scope.closeCIModal = function ($time) {
        $timeout(function() {
            $scope.CIModal = false;
            $scope.closeAnswer();
            $('div.modal-backdrop').remove();
            $scope.clearModals();
        }, $time);
    };

    $scope.clearModals = function () {
        $scope.closeAnswer();
        $scope.closeLoading();
        $scope.closeRegister();
        $scope.closeLogin();
        $scope.closeQuestion();
        $('div.modal-backdrop').remove();
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