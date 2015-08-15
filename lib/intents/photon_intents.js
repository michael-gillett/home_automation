var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

var commands = [
  {
    text: 'turn off the lights',
    valid: function(intent, entities) {
      return intent == 'lights_onoff' && entities.on_off[0].value == 'off';
    },
    method: function(entities) { return photon.execute('toggle', 'off') }
  },
  {
    text: 'turn on the lights',
    valid: function(intent, entities) {
      return intent == 'lights_onoff' && entities.on_off[0].value == 'on';
    },
    method: function(entities) { return photon.execute('toggle', 'on') }
  },
  {
    text: 'set the color to red',
    valid: function(intent, entities) {
      return intent == 'lights_color'
             && entities.color.length == 1
             && entities.color_method[0].value == 'set';
    },
    method: function(entities) {
      var method = entities.color_method[0].value;
      var c1 = colorToRGB(entities.color[0].value);
      var command = {method: method, c1: c1};
      return photon.execute('method', JSON.stringify(command));
    }
  },
  {
    text: 'fade between red and blue',
    valid: function(intent, entities) {
      return intent == 'lights_color'
             && entities.color.length == 2
             && entities.color_method[0].value == 'fade';
    },
    method: function(entities) {
      var method = entities.color_method[0].value;
      var c1 = colorToRGB(entities.color[0].value);
      var c2 = colorToRGB(entities.color[1].value);
      var command = {method: method, c1: c1, c2: c2};
      return photon.execute('method', JSON.stringify(command));
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
