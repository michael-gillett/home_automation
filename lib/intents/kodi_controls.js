var kodi = require('../kodi-json-rpc');
var waterfall = require('async-waterfall');

module.exports.commands = [
  {
    example: "Play season 5 episode 4 of Community.",
    valid: function(intent, entities) {
      return entities.episode.length == 1
          && entities.season.length == 1
          && entities.kodi_title.length == 1;
    },
    execute: function(entities, callback) {
      var title = entities.kodi_title[0].value;
      var season = entities.season[0].value;
      var episode = entities.episode[0].value;

      waterfall([
        function(callback) {
          kodi.searchAllShows(title, callback);
        },
        function(shows, callback) {
          var showId = shows[0].tvshowid;
          kodi.getAllEpisodes(showId, callback);
        },
        function(episodes, callback) {
          console.log(episodes.length);
          var success = episodes.some(function(e) {
            console.log("e: " + e.episode + "  s: " + e.season);
            console.log();
            if (e.episode == episode && e.season == season) {
              kodi.openFile(e.file);
              return true;
            }
          });

          callback(null, success);
        }
      ], function(err, result) {
        console.log(result);
        if (err) {
          callback(null, err.message);
        } else {
          if (result) {
            callback(null, 'Your show will now begin');
          } else {
            callback(null, 'I could not find the episode you requested.');
          }
        }
      });
    }
  },
  {
    example: "Display all seasons of Friends.",
    valid: function(intent, entities) {
      return entities.kodi_method[0].value == 'display'
          && entities.kodi_media_type[0].value == 'season'
          && typeof entities.season == 'undefined'
          && entities.kodi_title.length == 1
    },
    execute: function(entities, callback) {
      var title = entities.kodi_title[0].value;

      waterfall([
        function(callback) {
          kodi.searchAllShows(title, callback);
        },
        function(shows, callback) {

          // Update the show title with the formatted version
          title = shows[0].title

          // Construct the path to the season location
          var showId = shows[0].tvshowid;
          var windowPath = 'videodb://tvshows/titles/' + showId;

          // Display the desired season
          kodi.displayWindow('videos', windowPath, callback);
        }
      ], function(err, result) {
        if (err) {
          callback(err.message);
        } else {
          callback(null, 'Here are all seasons of ' + title + '.');
        }
      });
    }
  },
  {
    example: "Display season 1 of Game of Thrones.",
    valid: function(intent, entities) {
      return entities.kodi_method[0].value == 'display'
          && entities.kodi_media_type[0].value == 'season'
          && entities.season.length == 1
          && entities.kodi_title.length == 1
    },
    execute: function(entities, callback) {
      var title = entities.kodi_title[0].value;
      var season = entities.season[0].value;

      waterfall([
        function(callback) {
          kodi.searchAllShows(title, callback);
        },
        function(shows, callback) {

          // Update the show title with the formatted version
          title = shows[0].title

          // Construct the path to the season location
          var showId = shows[0].tvshowid;
          var windowPath = 'videodb://tvshows/titles/' + showId + '/' + season;

          // Display the desired season
          kodi.displayWindow('videos', windowPath, callback);
        }
      ], function(err, result) {
        if (err) {
          callback(err.message);
        } else {
          callback(null, 'Here is season ' + season + ' of ' + title + '.');
        }
      });
    }
  },
  {
    example: "Display all comedy movies.",
    valid: function(intent, entities) {
      return entities.kodi_method[0].value == 'display'
          && entities.kodi_media_type.length == 1
          && entities.kodi_genre.length == 1
    },
    execute: function(entities, callback) {
      var mediaType = entities.kodi_media_type[0].value;
      var genre = entities.kodi_genre[0].value;

      waterfall([
        // Get the genre's id
        function(callback) {
          kodi.getGenreId(genre, mediaType, callback);
        },
        // Filter all movies that have the genre id
        function(genreId, callback) {
          kodi.filterMediaByGenre(genreId, mediaType, callback);
        }
      ],
      function(err, result) {
        if (err) {
          callback(null, err.message);
        } else {
          var response = 'Here are all your ' + genre + ' ' + mediaType + 's.';
          callback(null, response);
        }
      });
    }
  },
  {
    example: "Display all movies.",
    valid: function(intent, entities) {
      return entities.kodi_method[0].value == 'display'
          && entities.kodi_media_type.length == 1
          && typeof entities.kodi_genre == 'undefined'
    },
    execute: function(entities, callback) {
      var mediaType = entities.kodi_media_type[0].value;
      var windowPath;
      if (mediaType == 'movie') {
        windowPath = 'videodb://movies/titles/';
      } else {
        windowPath = 'videodb://tvshows/titles/';
      }

      kodi.displayWindow('videos', windowPath, function(err, data) {
        callback(null, 'Displaying all of your ' + mediaType + 's.');
      });
    }
  },
  {
    example: "Pause the TV.",
    valid: function(intent, entities) {
      return entities.kodi_method[0].value == 'pause'
    },
    execute: function(entities, callback) {

    }
  }
];
