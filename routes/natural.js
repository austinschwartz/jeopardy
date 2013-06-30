var nat = require('natural');

console.log("nat loaded");

exports.jaroWinkler = function(req, res) {
    var input = req['query'];
    if (input['input'])
    {
        res.send({
            "jaro": nat.JaroWinklerDistance(input['input'], input['answer']),
            "leven": nat.LevenshteinDistance(input['input'], input['answer']),
            "dice": nat.DiceCoefficient(input['input'], input['answer'])
        });        
    }
    else
    {
        res.send({});
    }
};