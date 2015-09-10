var mongo = require('mongodb');

var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true, safe: false});
db = new Db('jeopardydb', server);

console.log("clues loaded");

var validcatids = [];

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'jeopardydb' database");
      db.collection('clues', {strict:true}, function(err, collection) {
        collection.aggregate([
          {$group : {
                "_id" : {
                    "catid" : "$catid",
                },
                "numClues" : {$sum: 1}
          }},
          {$match: {"numClues" : 5}}
          ], function(err, result) {
            for (var i = 0; i < result.length; i++) {
              validcatids.push(result[i]['_id']['catid']);
            }
          });
  });
}});

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
    collection.find({'catid': validcatids[Math.floor(Math.random() * validcatids.length)]}).toArray(function(err, items) {
      res.send(items);
    });
  });
};

exports.findRandomGame = function(req, res) {
  db.collection('clues', function(err, collection) {
    var arr = [];
    for (var i = 0; i < 6; i++)
      arr.push(validcatids[Math.floor(Math.random() * validcatids.length)]);
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
