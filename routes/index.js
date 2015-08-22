var express = require('express');
var router = express.Router();
var witai = require('../lib/witai');
var record = require('node-record-lpcm16');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Dorm Automation' });
});

router.get('/debug', function(req, res, next) {
  res.render('debug', { title: 'Dorm Automation' });
});

router.post('/query', function(req, res) {
  witai.getTextIntent(req.body.query.toLowerCase(), function(err, data) {
    res.send(data);
  });
});

router.post('/record-start', function(req, res) {
  record.start({verbose: true});
});

router.post('/record-stop', function(req, res) {
  var recording = record.stop();
  witai.getSpeechIntent(recording, function(err, data) {
    res.send(data);
  });
});

module.exports = router;
