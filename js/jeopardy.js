var currentGame=1;
function testhtm() {
	console.log("testhtm");
	$(document).ready(function() {
		loadEverything();
		$("#btn-gameright").click(function() {
			nextGame();
		});
		$("#btn-gameleft").click(function() {
			previousGame();
		});
		function nextGame(){
			currentGame++;
			loadEverything();
		}
		function previousGame(){
			currentGame--;
			loadEverything();
		}
	});
}

function board() {
	console.log("generating board");
	$(document).ready(function() {
		loadBoard();
		$("#btn-gameright").click(function() {
			nextGame();
		});
		$("#btn-gameleft").click(function() {
			previousGame();
		});
		function nextGame(){
			currentGame++;
			loadBoard();
		}
		function previousGame(){
			currentGame--;
			loadBoard();
		}
	});
}

function loadBoard() {
	getQuestions(function(questions) {
		$('span#game').text("GameID: " + questions[0].game + 
					"    Airdate: " + questions[0].airdate);
		console.log("asd");
		for (i = 0; i < 6; i++)
		{
			$('th').eq(i).text(questions[i*6].category);
		}
		for (j = 1; j <= 6; j++)
		{
			for (k = 1; k <= 6; k++)
			{
				var q = questions[j + (k-1)*6];
				$td = $('td').eq(k + 6*(j-1) - 1);
				$td.text(q.clue)
				makeHover($td, q);
			}

		}
	});

	function makeHover($element, question){
		$element.hover(function () {
			    	$(this).text(question.answer);
			    	$(this).addClass('answerText');
		  		},
			  	function () {
			    	$(this).text(question.clue);
			    	$(this).removeClass('answerText');
			  	});

	}

	function getQuestions(cb){
		$.getJSON('api.php', {game : ''}, function(data) {	
			var questions = [];
			$.each(data, function(index, value) {
				questions.push(data[index]);
			});
			cb(questions);
		});
	}
}

function loadEverything() {

	getQuestions(function(questions) {
		var num = 1;
		current = questions[num-1];
		$('span#game').text("GameID: " + current.game + 
					"    Airdate: " + current.airdate);
		$('span#showing').text(num + " / " + questions.length);
		$('span#question').text(current.clue);
		$('span#category').text(current.category);
		$('span#answer').text("");

		$("#btn-answer").click(function() {
			$('span#answer').text(current.answer);
		});
		function next(){
			num++;
			current = questions[num-1];
			$('span#showing').text(num + " / " + questions.length);
			$('span#question').text(current.clue);
			$('span#category').text(current.category);
			$('span#answer').text("");
		}
		function previous(){
			num--;
			current = questions[num-1];
			$('span#showing').text(num + " / " + questions.length);
			$('span#question').text(current.clue);
			$('span#category').text(current.category);
			$('span#answer').text("");
		}
		$("#btn-left").unbind().click(function() {
			previous();
		});
		$("#btn-right").unbind().click(function() {
			next();
		});
	});

	function getQuestions(cb){
		$.getJSON('api.php', {game : ''}, function(data) {	
			var questions = [];
			$.each(data, function(index, value) {
				questions.push(data[index]);
			});
			cb(questions);
		});
	}
}