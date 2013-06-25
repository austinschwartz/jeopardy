var express = require('express'),
clue = require('./routes/clues');

var app = express();

app.configure(function () {
	app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
	app.use(express.bodyParser());
});

app.use(express.static(__dirname));

app.get('/clues', clue.findAll);
app.get('/clues/cat/:catid', clue.findByCatId);
app.get('/games/random', clue.findRandomGame);

app.listen(3000);
console.log('Listening on port 3000...');
