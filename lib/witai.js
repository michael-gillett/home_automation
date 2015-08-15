var nconf = require('nconf').file('config.json');
var wit = require('node-wit');
var path = require('path');

var ACCESS_TOKEN = nconf.get('witai-access-token');

commands = [];
intents = path.join(__dirname, 'intents');
require('fs').readdirSync(intents).forEach(function(file) {
  commands.push.apply(commands, require(path.join(intents, file)).commands);
});

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
  var intent = outcome.intent;
  var entities = outcome.entities;

  commands.some(function(command) {
    if (command.valid(intent, entities)) {
      console.log(command.text);
      command.method();
      return true;
    }
  });
}
