var express = require('express');
var router = express.Router();
var nconf = require('nconf').file('config.json');
var Photon = require('../lib/photon');
var photon = new Photon(nconf.get('photon-id'));

/* GET home page. */
router.post('/', function(req, res, next) {
  photon.execute('method', req.body.data, function(err, data) {
     res.send(data);
  });
});

module.exports = router;
