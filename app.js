var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var PocketSphinx = require('pocketsphinx');

// var ps = new PocketSphinx({
//   dict: "4753.dict",
//   lm: "4753.lm",
//   samprate: 16000,
//   nfft: 512
// });

// ps.start();
// ps.on('utterance', function(hyp, utt, score) {
//     console.log( 'Guessed phrase: ' + hyp);
//     console.log( 'Confidence score: ' + score);
//     console.log( 'Unique utterance id: ' + utt);
// });

// var mic = require('microphone');

// mic.startCapture();

// mic.audioStream.on('data', function(data) {
//   ps.write(data);
// });



var routes = require('./routes/index');
var photon = require('./routes/photon');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/photon', photon);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
