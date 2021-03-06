var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

module.exports.commands = [
  {
    example: 'Turn off the lights.',
    valid: function(intent, entities) {
      return entities.on_off.length == 1;
    },
    execute: function(entities, callback) {
      var state = entities.on_off[0].value;
      photon.execute('switch', state, function(err, data) {
        if (err) {
          return callback(null, err.message);
        } else {
          var response = 'The lights are now ' + state + '.';
          return callback(null, response);
        }
      });
    }
  }
]
