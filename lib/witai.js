var nconf = require('nconf').file('config.json');
var wit = require('node-wit');
var path = require('path');
var fs = require('fs');
var timer;

var ACCESS_TOKEN = nconf.get('witai-access-token');

module.exports.getTextIntent = function(query, callback) {
  timer = process.hrtime();
  wit.captureTextIntent(ACCESS_TOKEN, query, function (err, data) {
    getIntent(err, data, callback);
  });
}

module.exports.getSpeechIntent = function(stream, callback) {
  timer = process.hrtime();
  wit.captureSpeechIntent(ACCESS_TOKEN, stream, "audio/wav", function (err, data) {
    getIntent(err, data, callback);
  });
}


getIntent = function(err, data, callback) {
  if (err) {
    console.log("Error: ", err);
    console.log("Data:" + data)
  } else {
    processIntent(data, function(err, response) {
      var result = {raw: data, res: response, time: process.hrtime(timer)};
      if (err) {
        result.res = 'I was unable to complete the task because: ' + err;
      }
      callback(null, result);
    });
  }
}

processIntent = function(data, callback) {
  var outcome = data.outcomes[0];
  var intent = outcome.intent;
  var entities = outcome.entities;
  var commands = require('./intents/'+intent).commands;

  var success = commands.some(function(command) {
    try {
      if (command.valid(intent, entities)) {
        command.execute(entities, callback);
        return true;
      }
    } catch (e) {}
  });

  if (!success) {
    return callback(null, "I don't know what you mean.")
  }
}
