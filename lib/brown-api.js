var request = require('request');
var nconf = require('nconf').file('config.json');

var CLIENT_ID = nconf.get('brown-client-id');
var URL_BASE = 'https://api.students.brown.edu';


module.exports.countUsersAtLocation = function(location, callback) {
  qs = {client_id: CLIENT_ID, location: location};
  request.get({url: URL_BASE+'/wifi/count', qs: qs}, function(err, res, body) {
    var data = JSON.parse(body);
    if (data.error)
      callback(new Error(data.error));
    else
      callback(null, data.count);
  })
}
