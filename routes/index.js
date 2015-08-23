var express = require('express');
var router = express.Router();
var witai = require('../lib/witai');
var record = require('node-record-lpcm16');
var fs = require('fs');
var path = require('path');
var shuffle = require('array-shuffle');

var examples = [];

intents = path.join(__dirname, '../lib/intents');
require('fs').readdirSync(intents).forEach(function(file) {
  // Make sure we only read javascript files
  if(file.indexOf('.js') != -1) {
    var commands = require(path.join(intents, file)).commands;
    commands.forEach(function(command) {
      examples.push(command.example);
    });
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Dorm Automation', examples: shuffle(examples).slice(0, 8)});
});

router.get('/lights', function(req, res, next) {
  res.render('lights', { title: 'Dorm Automation' });
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
