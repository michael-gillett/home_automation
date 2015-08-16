var brown = require('../brown-api');

var commands = [
  {
    text: 'how many people are at the ratty?',
    valid: function(intent, entities) {
      return intent == 'user_count' && entities.dinning_hall.length == 1;
    },
    method: function(entities) {
      var location = entities.dinning_hall[0].value;
      var count = brown.countUsersAtLocation(location);
      return count;
    }
  }
]

module.exports.commands = commands;
