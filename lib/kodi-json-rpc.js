var nconf = require('nconf').file('config.json');
var restler = require('restler');

var IP = nconf.get('kodi-server-ip');
var PORT = nconf.get('kodi-server-port');
var URL = 'http://' + IP + ':' + PORT + '/jsonrpc';


var OPTIONS = {
  "headers": {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
};

var username = nconf.get('kodi-http-username');
var password = nconf.get('kodi-http-password');
if (typeof username != 'undefined') {
  OPTIONS.username = username;
  OPTIONS.password = password;
}

module.exports.searchAllShows = function(query, callback) {
  var body = {
    "jsonrpc": "2.0",
    "method": "VideoLibrary.GetTVShows",
    "params": {
        "filter": {
            "field": "title",
            "operator": "contains",
            "value": query
        },
        "limits": {
            "start" : 0,
            "end": 75
        },
        "properties": ["art", "genre", "plot", "title", "originaltitle", "year", "rating", "thumbnail", "playcount", "file", "fanart"],
        "sort": { "order": "ascending", "method": "label" }
    },
    "id": 1
  }

  restler.postJson(URL, body, OPTIONS).on('success', function(data, res) {
    callback(null, data.result.tvshows);
  }).on('error', function(err, response) {
    callback(err);
  });
}

getActivePlayers = function(callback) {
  void body = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "Player.GetActivePlayers"
  };

  restler.postJson(URL, body, OPTIONS).on('success', function(data, res) {
    callback(null, data.result);
  }).on('error', function(err, response) {
    callback(err);
  });
}

displayWindow = function(windowName, path, callback) {
  var body = {
    "id":1,
    "jsonrpc": "2.0",
    "method": "GUI.ActivateWindow",
    "params": {
      "window": windowName,
      "parameters": [path]
    }
  }

  restler.postJson(URL, body, OPTIONS).on('success', function(data, res) {
    callback(null, 'success')
  }).on('error', function(err, response) {
    callback(err);
  });
}

module.exports.displayWindow = displayWindow;

module.exports.getGenreId = function(genre, mediaType, callback) {
  var body = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "VideoLibrary.GetGenres",
    "params": {
      "type": mediaType.replace('-', '')
    }
  }

  restler.postJson(URL, body, OPTIONS).on('success', function(data, res) {
    var success = data.result.genres.some(function(g) {
      if (g.label.toLowerCase() === genre.toLowerCase()) {
        callback(null, g.genreid);
        return true;
      }
    });
    if (!success) {
      callback(new Error('Cannot find ' + genre + ' genre'));
    }
  }).on('error', function(err, response) {
    callback(err);
  });
}

module.exports.filterMediaByGenre = function(genreId, mediaType, callback) {
  var path = "videodb://";
  if (mediaType == 'movie') {
    path += 'movies/'
  } else {
    path += 'tvshows/';
  }
  path += "genres/" + genreId

  displayWindow('video', path, callback);
}

module.exports.getAllEpisodes = function(showId, callback) {
  var body = {
    "jsonrpc":"2.0",
    "method":"VideoLibrary.GetEpisodes",
    "id":1,
    "params":{
      "properties":["season","episode","runtime","resume","playcount","tvshowid","lastplayed","file"],
      "tvshowid": showId,
      "sort": {
        "order": "descending",
        "method": "lastplayed"
      }
    }
  }

  restler.postJson(URL, body, OPTIONS).on('success', function(data, res) {
    callback(null, data.result.episodes);
  }).on('error', function(err, response) {
    callback(err);
  });
}


module.exports.openFile = function(path, callback) {
  var body = {
    "jsonrpc":"2.0",
    "method":"Player.Open",
    "id":1,
    "params": {
      "item": {
        "file": path
      }
    }
  };
  restler.postJson(URL, body, OPTIONS);
}
