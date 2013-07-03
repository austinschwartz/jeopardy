var express = require('express'),

clue = require('./routes/clues');
nat = require('./routes/natural');

var app = express();

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.use(express.static(__dirname, 'jeopardy'));

app.use('/jeopardy', express.static(__dirname));


app.get('/jeopardy', function(req, res) {
        res.redirect('/jeopardy/index.htm');
        });

app.get('/jeopardy/api/clues', clue.findAll);
app.get('/jeopardy/api/clues/cat/:catid', clue.findByCatId);
app.get('/jeopardy/api/cats/random', clue.findRandomCategory);
app.get('/jeopardy/api/games', clue.findRandomGame);

app.get('/jeopardy/api/distance', nat.jaroWinkler);


app.listen(8000);
console.log('Listening on port 8000...');

console.log(__dirname);