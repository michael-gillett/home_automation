var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

var commands = [
  {
    text: 'turn off the lights',
    valid: function(intent, entities) {
      return intent == 'lights_onoff' && entities.on_off[0].value == 'off';
    },
    method: function() { return photon.execute('toggle', 'off') }
  },
  {
    text: 'turn on the lights',
    valid: function(intent, entities) {
      return intent == 'lights_onoff' && entities.on_off[0].value == 'on';
    },
    method: function() { return photon.execute('toggle', 'on') }
  }
];

module.exports.commands = commands;
