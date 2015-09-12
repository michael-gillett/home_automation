var express = require('express');
var router = express.Router();
var nconf = require('nconf').file('config.json');
var Photon = require('../lib/photon');
var photon = new Photon(nconf.get('photon-id'));

router.post('/lights', function(req, res, next) {
  photon.execute('method', req.body.data, function(err, data) {
     res.send(data);
  });
});

router.post('/switch', function(req, res, next) {
  photon.execute('switch', req.body.data, function(err, data) {
     res.send(data);
  });
});

router.post('/lock', function(req, res, next) {
  photon.execute('lock', req.body.data, function(err, data) {
     res.send(data);
  });
});

module.exports = router;
