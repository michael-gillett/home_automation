var nconf = require('nconf').file('config.json');
var needle = require('needle');

var API_KEY = nconf.get('google-api-key');
var SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
var DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
var LAT = nconf.get('latLng').lat;
var LNG = nconf.get('latLng').lng;


getPlaceDetails = function(placeid, callback) {

}

module.exports.searchNearby = function(name, callback) {
  var qs = {
    key: API_KEY,
    location: LAT+','+LNG,
    types: 'food',
    radius: 5000,
    name: name,
    language: 'en'
  };

  needle.request('get', SEARCH_URL, qs, function(err, res) {
    var restaurant = res.body.results[0];
    callback(null, res.body.results[0]);
  });
}
