var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var Server = mongo.Server,
    Db = mongo.Db;

var validcatids = [];

var db = null;

MongoClient.connect("mongodb://localhost:27017/jeopardydb", function(err, conn) {
  if(!err) {
    db = conn;
    console.log("Connected correctly to server.");
    db.collection("clues", {strict:true}, function(err, col) {
      if (err)
        console.log(err);
      col.aggregate([
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
        }
      );
    });
  }
});

exports.findByCatId = function(req, res) {
  var catid = parseInt(req.params.catid);
  db.collection('clues', function(err, collection) {
    collection.find({'catid': catid}).toArray(function(err, items) {
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
    if (err)
      console.log(err);
    var arr = [];
    for (var i = 0; i < 6; i++)
      arr.push(validcatids[Math.floor(Math.random() * validcatids.length)]);
    var items = collection.find({'catid': {$in : arr}}).toArray(function(err, items){
      if (err)
        console.log(err);
      res.send(items);
    });
  });
};

exports.findAll = function(req, res) {
  db.collection('clues', function(err, collection) {
    if (err)
      console.log(err);
    collection.find().toArray(function(err, items) {
      if (err)
        console.log(err);
      res.send(items);
    });
  });
};
