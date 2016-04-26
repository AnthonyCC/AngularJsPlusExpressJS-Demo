"use strict";
var express = require('express');
var debug = require('debug');
var routeLogger = debug('routes:index');
var router = express.Router();
debug('Start setting up index route');

/* GET home page. */
router.get('/', function (req, res, next) {
    debugger;
    routeLogger('root route');
    //res.sendfile('./public/index.html');
    res.locals = {
        title : 'your title',
        description : 'your description'
    };
    res.render('index', { settings: { env: 'test' }, title: req.query.title || 'ExpressJS Demo', author: req.query.author || 'Anthony' });
});
router.get('/company/:companyName', function (req, res, next) {
    routeLogger(req.params.companyName + ' route');
    res.render(req.params.companyName, { settings: { env: 'test' }, title: req.query.title || 'ExpressJS Demo', author: req.query.author || 'Anthony' });
});
router.get('/testbufferdata', function (req, res) {
    debugger;
    routeLogger('testbufferdata route');
    res.send(new Buffer('whoop'));
});
routeLogger('Finish setting up index route');
module.exports = router;
