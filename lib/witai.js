var nconf = require('nconf').file('config.json');
var wit = require('node-wit');

var ACCESS_TOKEN = nconf.get('witai-access-token');

module.exports.getTextIntent = function(query, callback) {
  wit.captureTextIntent(ACCESS_TOKEN, query, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      callback(err, data);
      processIntent(data);
    }
  })
}


processIntent = function(data, callback) {
  var outcome = data.outcomes[0];
  var intent = require('./intents/'+outcome.intent);
  intent.execute(outcome);
}
