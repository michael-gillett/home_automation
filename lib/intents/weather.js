var forecast = require('../forecast-api');
var moment = require('moment');

module.exports.commands = [
  {
    example: 'What is the temperature?',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'temperature';
    },
    execute: function(entities, callback) {
      forecast.currentWeather(function(err, data) {
        var c = data.currently;
        var temp = parseFloat(c.temperature.toFixed(0));
        var apperentTemp = parseFloat(c.apparentTemperature.toFixed(0));
        var response = 'The current temperature is ' + temp + ' °F';
        if (temp != apperentTemp) {
          response += ', but it feels like ' + apperentTemp + ' °F';
        }
        callback(null, response + '.');
      });
    }
  },
  {
    example: 'What is the weather going to be like tomorrow?',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'summary'
             && entities.datetime.length == 1
             && entities.datetime[0].grain == 'day';
    },
    execute: function(entities, callback) {
      // Convert the datetime string to a UNIX timestamp
      var timestamp = Date.parse(entities.datetime[0].value) / 1000;
      forecast.futureWeather(timestamp, function(err, data) {
        if (err) {
          callback(null, err.message);
        } else {
          var summary = data.hourly.summary;
          callback(null, summary);
        }
      });
    }
  },
  {
    example: 'Is it going to rain today?',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'precipitation'
             && entities.datetime.length == 1
             && entities.datetime[0].grain == 'day';
    },
    execute: function(entities, callback) {
      var timestamp = Date.parse(entities.datetime[0].value) / 1000;
      forecast.futureWeather(timestamp, function(err, data) {
        if (err) {
          callback(null, err.message);
        } else {
          var probability = data.daily.data[0].precipProbability * 100;
          if (probability > 0) {
            var intensity = data.daily.data[0].precipIntensity;
            var type = data.daily.data[0].precipType;
            var intensityLevel = forecast.precipIntensity(intensity, type);
            var response = 'There is a ' + probability + '% chance of ' + intensityLevel + '.';
            callback(null, response);
          } else {
            callback(null, 'There is no precipitation forecasted.');
          }
        }
      });
    }
  },
  {
    example: 'When is the Sunrise today?',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'sunrise'
             && entities.datetime.length == 1
             && entities.datetime[0].grain == 'day';
    },
    execute: function(entities, callback) {
      var timestamp = Date.parse(entities.datetime[0].value) / 1000;
      forecast.futureWeather(timestamp, function(err, data) {
        if (err) {
          callback(null, err.message);
        } else {
          var sunriseTime = data.daily.data[0].sunriseTime;
          var time = new moment(sunriseTime * 1000).format('h:mm A');
          var response = 'Sunrise is at ' + time + '.';
          callback(null, response);
        }
      });
    }
  },
  {
    example: 'When is the Sunset today?',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'sunset'
             && entities.datetime.length == 1
             && entities.datetime[0].grain == 'day';
    },
    execute: function(entities, callback) {
      var timestamp = Date.parse(entities.datetime[0].value) / 1000;
      forecast.futureWeather(timestamp, function(err, data) {
        if (err) {
          callback(null, err.message);
        } else {
          var sunsetTime = data.daily.data[0].sunsetTime;
          var time = new moment(sunsetTime * 1000).format('h:mm A');
          var response = 'Sunset is at ' + time + '.';
          callback(null, response);
        }
      });
    }
  },
  {
    example: 'What will the moon phase be tonight?',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'moon_phase'
             && entities.datetime.length == 1
             && entities.datetime[0].grain == 'day';
    },
    execute: function(entities, callback) {
      // Convert the datetime string to a UNIX timestamp
      var timestamp = Date.parse(entities.datetime[0].value) / 1000;
      forecast.futureWeather(timestamp, function(err, data) {
        if (err) {
          callback(null, err.message);
        } else {
          var lunationNum = data.daily.data[0].moonPhase;
          var illumination = (lunationNum > 0.5) ? (1 - lunationNum) * 200 : lunationNum * 200;
          var moonPhase = forecast.moonPhase(lunationNum);
          var response = 'The moon will be in a ' + moonPhase + ' phase with an illumination of ' + illumination.toFixed(0) + '%.';
          callback(null, response);
        }
      });
    }
  }
]
