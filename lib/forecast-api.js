var nconf = require('nconf').file('config.json');
var needle = require('needle');

var API_KEY = nconf.get('forecast-api-key')
var URL = 'https://api.forecast.io/forecast/' + API_KEY + '/';
var LAT = nconf.get('latLng').lat;
var LNG = nconf.get('latLng').lng;

module.exports.currentWeather = function(callback) {
  needle.get(URL+LAT+','+LNG, function(err, res) {
    console.log(err);
    console.log(JSON.stringify(res.body));
    callback(null, res.body);
  })
};

module.exports.futureWeather = function(timestamp, callback) {
  needle.get(URL+LAT+','+LNG+','+timestamp, function(err, res) {
    if (typeof res.body.error != 'undefined') {
      callback(new Error(res.body.error));
    } else {
      callback(null, res.body);
    }
  })
}
