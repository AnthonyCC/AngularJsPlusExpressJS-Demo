"use strict";
var express = require('express');
var debug = require('debug');
var httpRequest = require('request');
var routeLogger = debug('routes:index');
var router = express.Router();
routeLogger('Start setting up index route');
//Route order matters
router.all('*', function (req, res, next) {
    res.locals = {
        title: 'your title',
        description: 'your description'
    };
    next();
});
router.get('/company/:companyName*', function (req, res, next) {
    debugger;
    routeLogger(req.params.companyName + ' route');
    // res.render(req.params.companyName, { settings:{ env: 'test'}, title: req.query.title || 'ExpressJS Demo' , author: req.query.author || 'Anthony' });
    res.send('Success, the name of the company is ' + req.params.companyName);
});
router.get('/ang1', function (req, res, next) {
    debugger;
    routeLogger(' angular 1 route');
    res.render('angular1');
    // res.send('Success, the name of the company is ' + req.params.companyName);
});
router.get('/testbufferdata', function (req, res) {
    debugger;
    routeLogger('testbufferdata route');
    res.send(new Buffer('whoop'));
});
router.post('/foo', function (req, res, next) {
    res.send(req.body);
});
router.get('/testcookie', function (req, res, next) {
    res.cookie('test', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJfaWQiOiJ2VXNlci8xNDA5M‌​jc0OTYwODc4NCIsImlhdCI6MTQ2MTUxNDc4MCwiZXhwIjoxNDYyOTc2Mjk1Njc2fQ.G46f18mjZgvIQwC‌​w-uUr6wuF8mkoH-SgzNW5UyyTCUbI6PDiDhkZbBMkvIzUofRfRqNnxKmKWzyhQ79zjClocdzB6JH2niDL‌​FMAMSxE36zqUOcc5C0z6FY5gu9z3dyT0zqnvTxR1DX1mijl-r-K_UOOc5Pf2D-8dwiN-V3ELTIObWnuP6‌​5KLDgR6kqRvCXU5_DGamroIlwiAfGEiPU-NeIDWK0yJTB1NNpBLBh9SuEtq38oSZ9n6pRCcrBGfCYuErk‌​DvgT5p_-GWk8_IWr0U3UsXtsE89F5lVdkSRJpdQDH-psDP7n8jjCDd-hrBusIoRtl_JjEtU5wV4cmcaEa‌​kPQ', { expires: new Date(Date.now() + 9999999), httpOnly: true });
    res.send('test cookie');
});
router.get('/testasyncerrorhandling', function (req, res) {
    routeLogger('testasyncerrorhandling route');
    debugger;
    httpRequest
        .get('http://google.com/img.png')
        .on('response', function (response) {
        res.send('Success');
    })
        .on('error', function (error) {
        res.send('Error');
    });
});
router.get('/error', function () {
    debugger;
    throw new Error('Error with permissions');
});
/* GET home page. */
router.get('/:viewName', function (req, res, next) {
    debugger;
    routeLogger(req.params.viewName);
    //res.sendfile('./public/index.html');
    res.render(req.params.viewName, { settings: { env: 'test' }, title: req.query.title || 'ExpressJS Demo', author: req.query.author || 'Anthony' });
});
routeLogger('Finish setting up index route');
module.exports = router;
