var express = require('express');
var app = express();

var clue = require('./routes/clues');
var nat = require('./routes/natural');

app.configure(function () {
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
});

app.use('/', express.static(__dirname + "/static"));

app.get('/api/clues', clue.findAll);
app.get('/api/clues/cat/:catid', clue.findByCatId);
app.get('/api/cats/random', clue.findRandomCategory);
app.get('/api/games', clue.findRandomGame);

app.get('/api/distance', nat.jaroWinkler);

app.listen(8001);
console.log('Listening on port 8001...');

