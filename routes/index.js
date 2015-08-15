var express = require('express');
var router = express.Router();
var witai = require('../lib/witai');
var nconf = require('nconf').file('config.json');
var Photon = require('../lib/photon');
var photon = new Photon(nconf.get('photon-id'));

var ACCESS_TOKEN = nconf.get('witai-access-token');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Dorm Automation' });
});

router.post('/query', function(req, res) {
  witai.getTextIntent(req.body.query.toLowerCase(), function(err, data) {
    res.send(data);
  });
});

module.exports = router;
