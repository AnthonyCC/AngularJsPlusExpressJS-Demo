
/**
 * Module dependencies
 */

import express = require('express');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import indexRoutes = require('./routes/index');

import http = require('http');

import path = require('path');
import debug = require('debug');
var app = module.exports = express();
var errorLogger = debug('error');


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(express.static(path.resolve(__dirname, 'client')));

var env = process.env.NODE_ENV || 'development';
process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}`);
});
/**
 * Routes
 */

// serve index
app.use('/', indexRoutes);

// Error handling
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// Handle 404
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

function logErrors(err, req, res, next) {
  debugger;
  errorLogger(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
	debugger;
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!', status: 500 });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
	debugger;
  res.status(500);
  res.render('error', { error: err, status: 500 });
}