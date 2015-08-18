var nconf = require('nconf').file('config.json');
var needle = require('needle');

var API_KEY = nconf.get('google-api-key');
var SEARCH_URL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
var DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';
var LAT = nconf.get('latLng').lat;
var LNG = nconf.get('latLng').lng;


getPlaceDetails = function(placeid, callback) {

}

module.exports.searchNearby = function(query, callback) {
  var qs = {
    key: API_KEY,
    location: LAT+','+LNG,
    types: 'food',
    radius: 5000,
    name: query,
    language: 'en'
  };

  needle.request('get', SEARCH_URL, qs, function(err, res) {
    var place = res.body.results[0];
    if (typeof place == 'undefined') {
      callback(new Error('Could not find ' + query + '.'))
    } else {
      callback(null, res.body.results[0]);
    }
  });
}
