var brown = require('../brown-api');
var lang = require('../language');

var commands = [
  {
    text: 'how many people are at the ratty?',
    valid: function(intent, entities) {
      return intent == 'user_count' && entities.dinning_hall.length == 1;
    },
    execute: function(entities, callback) {
      var location = entities.dinning_hall[0].value;
      brown.countUsersAtLocation(location, function(err, count) {
        if (err) {
          callback(err);
        } else {
          var response = 'There {are|is} [num] {people|person} at the ' + location.titleize() + '.';
          callback(null, lang.plural(response, count));
        }
      });
    }
  }
]

module.exports.commands = commands;