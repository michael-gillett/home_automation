var express = require('express');
var router = express.Router();
var wit = require('node-wit');
var nconf = require('nconf').file('config.json');
var Photon = require('../lib/photon');
var photon = new Photon(nconf.get('photon-id'));

var ACCESS_TOKEN = nconf.get('witai-access-token')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dorm Automation' });
});

router.post('/query', function(req, res, next) {
  wit.captureTextIntent(ACCESS_TOKEN, req.body.query, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      if (data.outcomes[0].entities.on_off[0].value == 'on') {
        photon.execute('toggle', 'on')
      } else {
        photon.execute('toggle', 'off')
       }
      res.json(data);
    }
  });
});

module.exports = router;
