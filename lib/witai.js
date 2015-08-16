var nconf = require('nconf').file('config.json');
var wit = require('node-wit');
var path = require('path');
var fs = require('fs');

var ACCESS_TOKEN = nconf.get('witai-access-token');

commands = [];
intents = path.join(__dirname, 'intents');
require('fs').readdirSync(intents).forEach(function(file) {
  commands.push.apply(commands, require(path.join(intents, file)).commands);
});

module.exports.getTextIntent = function(query, callback) {
  wit.captureTextIntent(ACCESS_TOKEN, query, function (err, data) {
    getIntent(err, data, callback);
  });
}

module.exports.getSpeechIntent = function(stream, callback) {
  wit.captureSpeechIntent(ACCESS_TOKEN, stream, "audio/wav", function (err, data) {
    getIntent(err, data, callback);
  });
}


getIntent = function(err, data, callback) {
  if (err) {
    console.log("Error: ", err);
    console.log("Data:" + data)
  } else {
    processIntent(data, callback);
  }
}

processIntent = function(data, callback) {
  var outcome = data.outcomes[0];
  var intent = outcome.intent;
  var entities = outcome.entities;

  commands.some(function(command) {
    try {
      if (command.valid(intent, entities)) {
        console.log(command.text);
        command.execute(entities, callback);
        return true;
      }
    } catch (e) {}
  });
}
