var forecast = require('../forecast-api');

module.exports.commands = [
  {
    text: "what is the temperature",
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
    text: "what is the weather like tomorrow",
    valid: function(intent, entities) {
      return entities.weather_field[0].value == 'summary'
             && entities.datetime.length == 1;
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
  }
]