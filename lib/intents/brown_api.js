var brown = require('../brown-api');

var commands = [
  {
    text: 'how many people are at the ratty?',
    valid: function(intent, entities) {
      return intent == 'user_count' && entities.dinning_hall.length == 1;
    },
    execute: function(entities, callback) {
      var location = entities.dinning_hall[0].value;
      brown.countUsersAtLocation(location, function(err, count) {
        var response = 'There are ' + count + ' people at the ' + location + '.';
        callback(null, response);
      });
    }
  }
]

module.exports.commands = commands;
