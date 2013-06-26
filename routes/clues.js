var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('jeopardydb', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'jeopardydb' database");
    db.collection('clues', {strict:true}, function(err, collection) {
    });
  }
});

exports.findByCatId = function(req, res) {
  var catid = parseInt(req.params.catid);
  console.log('Retrieving clue for cat ' + catid);
  db.collection('clues', function(err, collection) {
    collection.find({'catid': catid}).toArray(function(err, items) {
      console.log(items);
      res.send(items);
    });
  });
};

exports.findRandomCategory = function(req, res) {
  db.collection('clues', function(err, collection) {
    var catid = Math.floor(Math.random()*60);
    collection.find({'catid': catid}).toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.findRandomGame = function(req, res) {
  db.collection('clues', function(err, collection) {
    var arr = [];
    for (var i = 0; i < 5; i++)
    {
      arr.push(Math.floor(Math.random()*60))
    }
    var items = collection.find({'catid': {$in : arr}}).toArray(function(err, items){
      res.send(items);
    });
  });
};

exports.findAll = function(req, res) {
  db.collection('clues', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};
