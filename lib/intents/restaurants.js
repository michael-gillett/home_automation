var places = require('../google-places');

module.exports.commands = [
  {
    text: "is chipotle open?",
    valid: function(intent, entities) {
      console.log(JSON.stringify(entities))
      console.log(entities.local_search_query.length)
      return entities.local_search_query.length == 1;
    },
    execute: function(entities, callback) {
      var place = entities.local_search_query[0].value;
      return places.searchNearby(place, callback);
    }
  }
]
