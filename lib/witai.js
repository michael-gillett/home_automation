var nconf = require('nconf').file('config.json');
var wit = require('node-wit');
var path = require('path');
var fs = require('fs');
var say = require('say');
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
  if (typeof timer == 'undefined' || timer == null) {
    timer = process.hrtime();
  }

  if (err) {
    console.log("Error: ", err);
    console.log("Data:" + data)
  } else {
    processIntent(data, function(err, response) {
      var result = {raw: data, res: response, time: process.hrtime(timer)};
      if (err) {
        result.res = 'I was unable to complete the task because: ' + err;
      }
      timer = null;
      callback(null, result);
    });
  }
}

module.exports.getIntent = getIntent;

processIntent = function(data, callback) {
  try {
    var outcome = data.outcomes[0];
    var intent = outcome.intent;
    var entities = outcome.entities;
    var commands = [];

    commands = require('./intents/'+intent).commands;

    if (typeof commands == 'undefined') {
      return callback(new Error("No intent logic found."));
    }

    var success = commands.some(function(command) {
      try {
        if (command.valid(intent, entities)) {
          command.execute(entities, callback);
          return true;
        }
      } catch (e) {
        console.log(e.stack);
      }
    });

    if (!success) {
      return callback(null, "I don't know what you mean.")
    }
  } catch (e) {
    return callback(e);
  }
}
