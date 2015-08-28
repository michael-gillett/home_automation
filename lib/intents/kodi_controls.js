var kodi = require('../kodi-json-rpc');


module.exports.commands = [
  {
    example: "Play season 5 episode 4 of Community.",
    valid: function(intent, entities) {
      console.log('here')
      return entities.episode.length == 1
          && entities.season.length == 1
          && entities.search_query.length == 1;
    },
    execute: function(entities, callback) {
      var show = entities.search_query[0].value;
      var season = entities.season[0].value;
      var episode = entities.episode[0].value;

      var showID = kodi.searchAllShows(show, function(err, shows) {
        var show = shows[0].tvshowid;
        kodi.getAllEpisodes(showID, function(err, episodes) {
          var success = episodes.some(function(e) {
            if (e.episode == episode && e.season == season) {
              kodi.openFile(e.file);
              return true;
            }
          });
          if (success) {
            callback(null, 'Your show will now begin.');
          } else {
            callback(null, 'Could not find the file.');
          }
        });
      });
    }
  }
];
