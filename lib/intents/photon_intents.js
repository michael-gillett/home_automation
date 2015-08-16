var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

var commands = [
  {
    text: 'turn off the lights',
    valid: function(intent, entities) {
      return intent == 'lights_onoff' && entities.on_off[0].value == 'off';
    },
    method: function(entities, callback) {
      photon.execute('toggle', 'off');
      var response = 'The lights are now off.';
      return callback(null, response);
    }
  },
  {
    text: 'turn on the lights',
    valid: function(intent, entities) {
      return intent == 'lights_onoff' && entities.on_off[0].value == 'on';
    },
    execute: function(entities, callback) {
      photon.execute('toggle', 'on')
      var reponse = 'The lights are now on.';
      return callback(null, response);
    }
  },
  {
    text: 'set the color to red',
    valid: function(intent, entities) {
      return intent == 'lights_color'
             && entities.color.length == 1
             && entities.color_method[0].value == 'set';
    },
    execute: function(entities, callback) {
      var method = entities.color_method[0].value;
      var colorName = entities.color[0].value;
      var command = {method: method, c1: colorToRGB(colorName)};
      photon.execute('method', JSON.stringify(command));
      var response = 'The lights are now ' + colorName + '.';
      return callback(null, response);
    }
  },
  {
    text: 'fade between red and blue',
    valid: function(intent, entities) {
      return intent == 'lights_color'
             && entities.color.length == 2
             && entities.color_method[0].value == 'fade';
    },
    execute: function(entities) {
      var method = entities.color_method[0].value;
      var c1Name = entities.color[0].value;
      var c2Name = entities.color[1].value;
      var command = {
        method: method,
        c1: colorToRGB(c1Name),
        c2: colorToRGB(c2Name)
      };
      photon.execute('method', JSON.stringify(command));
      var response = 'The lights will now fade between ' + c1Name + ' and ' + c2Name + '.';
      return callback(null, reponse);
    }
  }
];

function colorToRGB(color) {
  switch(color.toLowerCase()) {
    case "red": return [255, 0, 0];
    case "orange": return [255, 140, 0];
    case "green": return [0, 255, 0];
    case "blue": return [0, 0, 255];
    case "magenta": return [255, 0, 255];
    case "yellow": return [255, 255, 0];
    case "cyan": return [0, 255, 255];
    case "white": return [255, 255, 255];
  }
}

module.exports.commands = commands;
