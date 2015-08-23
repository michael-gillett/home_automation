var qty = require('js-quantities');

module.exports.commands = [
  {
    text: "how many feet is 10 meters?",
    valid: function(intent, entities) {
      return entities.from[0].entities.units.length == 1
            && entities.to[0].entities.units.length == 1;
    },
    execute: function(entities, callback) {
      var number = entities.from[0].entities.number;
      number = (typeof number == 'undefined') ? 1 : number[0].value;
      var from = entities.from[0].entities.units[0].value;
      var to = entities.to[0].entities.units[0].value;

      var conversion = qty(number + sanitizeUnit(from)).to(sanitizeUnit(to));

      var response = number + ' ' + from + ' is ' + parseFloat(conversion.scalar.toFixed(3)) + ' ' + to;
      callback(null, response);
    }
  }
];


// Due to how js-quantities works, all temperature units need to be converted
function sanitizeUnit(unit) {
  unit = unit.toLowerCase();
  if (unit === 'fahrenheit') {
    return 'tempF';
  } else if (unit === 'celsius') {
    return 'tempC';
  } else if (unit === 'kelvin') {
    return 'tempK';
  } else {
    return unit;
  }
}
