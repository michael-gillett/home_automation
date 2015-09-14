var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

module.exports.commands = [
 {
    example: 'Lock the door.',
    valid: function(intent, entities) {
      return entities.lock_state.length == 1;
    },
    execute: function(entities, callback) {
      var state = entities.lock_state[0].value;
      var command = {arg: state};
      photon.execute('lock', state, function(err, data) {
        if (err) {
          return callback(null, err.message);
        } else {
          var response = 'The door is now ' + state + 'ed.';
          return callback(null, response);
        }
      });
    }
  }
];
