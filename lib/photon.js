var needle = require('needle');
var nconf = require('nconf').file('config.json');

var ACCESS_TOKEN = nconf.get('particle-access-token');

var Photon = function(id) {
  this.id = id;
  this.url = 'https://api.particle.io/v1/devices/';
};

Photon.prototype.execute = function(method, content, callback) {
  var data = {arg: content};
  var options = {
    headers: { 'Authorization': 'Bearer ' + ACCESS_TOKEN }
  };
  needle.post(this.url+this.id+'/'+method, data, options, function(err, res) {
    if (err) {
      callback(new Error('The photon board is not online.'));
    } else {
      callback(null, res.body);
    }
  });
};

module.exports = Photon;
