/**
 * Module dependencies
 */
"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var indexRoutes = require('./routes/index');
var http = require('http');
var path = require('path');
var debug = require('debug');
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
app.use(express.static(path.join(__dirname, 'client')));
var env = process.env.NODE_ENV || 'development';
/**
 * Routes
 */
// serve index
app.use('/', indexRoutes);
// Error handling
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
function logErrors(err, req, res, next) {
    errorLogger(err.stack);
    next(err);
}
function clientErrorHandler(err, req, res, next) {
    debugger;
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!', status: 500 });
    }
    else {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    debugger;
    res.status(500);
    res.render('error', { error: err, status: 500 });
}
