var places = require('../google-places');

module.exports.commands = [
  {
    text: "is chipotle open?",
    valid: function(intent, entities) {
      return entities.local_search_query.length == 1
             && entities.place_field[0].value === 'open';
    },
    execute: function(entities, callback) {
      var query = entities.local_search_query[0].value;
      places.searchNearby(query, function(err, place) {
        if (err) {
          callback(null, err.message)
        } else {
          var name = place.name;
          var open = place.opening_hours.open_now;
          var response = name + ' is currently ';
          if (open)
            response += 'open.';
          else
            response += 'closed.';
          callback(null, response);
        }
      });
    }
  },
  {
    text: "what is the address of chipotle?",
    valid: function(intent, entities) {
      return entities.local_search_query.length == 1
             && entities.place_field[0].value === 'address'
    },
    execute: function(entities, callback) {
      var query = entities.local_search_query[0].value;
      places.searchNearby(query, function(err, place) {
        if (err) {
          callback(null, err.message)
        } else {
          var name = place.name;
          var address = place.vicinity;
          var response = name + ' is located at ' + address + '.';
          callback(null, response);
        }
      });
    }
  }
]
