var forecast = require('../forecast-api');

module.exports.commands = [
  {
    text: 'what is the temperature',
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'temperature';
    },
    execute: function(entities, callback) {
      forecast.currentWeather(function(err, data) {
        var c = data.currently;
        var response = 'The current temperature is ' + c.temperature;
        if (c.temperature != c.apparentTemperature) {
          response += ', but it feels like ' + c.apparentTemperature;
        }
        callback(null, response + '.');
      });
    }
  },
  {
    text: 'what is the weather like tomorrow',
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
  {
    text: 'what will the moon phase be tonight',
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
          var moonPhase = forecast.moonPhase(lunationNum);
          var response = 'The moon will be in a ' + moonPhase + ' phase.';
          callback(null, response);
        }
      });
    }
  }
]
