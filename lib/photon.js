var request = require('request');
var nconf = require('nconf').file('config.json');

var ACCESS_TOKEN = nconf.get('particle-access-token');

var Photon = function(id) {
  this.id = id;
  this.url = 'https://api.particle.io/v1/devices/';
};

Photon.prototype.execute = function(method, content) {
  request.post(this.url+this.id+'/'+method, {form: {content: content}})
         .auth(null, null, true, ACCESS_TOKEN);
};

module.exports = Photon;
