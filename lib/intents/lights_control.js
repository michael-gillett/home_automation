var nconf = require('nconf').file('config.json');
var Photon = require('../photon');
var photon = new Photon(nconf.get('photon-id'));

var commands = [
  {
    text: 'turn off the lights',
    method: function() { return photon.execute('toggle', 'off') }
  },
  {
    text: 'turn on the lights',
    method: function() { return photon.execute('toggle', 'on') }
  }
];

module.exports.execute = function(outcome) {

  commands.forEach(function(command) {
    if (outcome._text == command.text) {
      command.method()
    }
  })
}
