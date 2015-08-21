var nconf = require('nconf').file('config.json');
var needle = require('needle');

var API_KEY = nconf.get('forecast-api-key')
var URL = 'https://api.forecast.io/forecast/' + API_KEY + '/';
var LAT = nconf.get('latLng').lat;
var LNG = nconf.get('latLng').lng;

module.exports.currentWeather = function(callback) {
  needle.get(URL+LAT+','+LNG, function(err, res) {
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


module.exports.precipIntensity = function(intensity, type) {
  if (intensity < 0.002) {
    return 'no ' + type;
  } else if (intensity < 0.017) {
    return 'very light ' + type;
  } else if (intensity < 0.1) {
    return 'light ' + type;
  } else if (intensity < 0.4) {
    return 'moderate ' + type;
  } else {
    return 'heavy ' + type;
  }
}

module.exports.moonPhase = function(lunationNum) {
  // https://en.wikipedia.org/wiki/New_moon#Lunation_Number
  const THRESHOLD = 0.020; // +/- 4% lumination
  if (lunationNum < THRESHOLD) {
    return 'new moon';
  } else if (lunationNum < 0.250 - THRESHOLD) {
    return 'waxing crescent';
  } else if (lunationNum <= 0.250 + THRESHOLD) {
    return 'first quarter';
  } else if (lunationNum < 0.500 - THRESHOLD) {
    return 'waxing gibbous';
  } else if (lunationNum <= 0.500 + THRESHOLD) {
    return 'full moon';
  } else if (lunationNum < 0.750 - THRESHOLD) {
    return 'waning gibbous';
  } else if (lunationNum <= 0.750 + THRESHOLD) {
    return 'third quarter';
  } else if (lunationNum < 1.0 - THRESHOLD) {
    return 'waning crescent';
  } else if (lunationNum <= 1.0) {
    return 'new moon';
  }
}
