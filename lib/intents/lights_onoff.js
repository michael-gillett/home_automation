var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

module.exports.commands = [
  {
    text: 'turn off the lights',
    valid: function(intent, entities) {
      return entities.on_off[0].value == 'off';
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
      return entities.on_off[0].value == 'on';
    },
    execute: function(entities, callback) {
      photon.execute('toggle', 'on')
      var reponse = 'The lights are now on.';
      return callback(null, response);
    }
  }
]
