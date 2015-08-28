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

module.exports.getAllShows = function() {

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

module.exports.getAllMovies = function() {

}

module.exports.getAllEpisodes = function(showID, callback) {
  var body = {
    "jsonrpc":"2.0",
    "method":"VideoLibrary.GetEpisodes",
    "id":1,
    "params":{
        "filter":{"field":"playcount", "operator":"is","value":"0"},
        "properties":["season","episode","runtime","resume","playcount","tvshowid","lastplayed","file"],
        "tvshowid": showID,
        "sort":{"order":"descending","method":"lastplayed"}
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

  restler.postJson(URL, body, OPTIONS).on('success', function(data, res) {
    // callback(null, 'success');
  }).on('error', function(err, response) {
    // callback(err);
  });
}
