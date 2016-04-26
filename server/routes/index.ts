
import express = require('express');
import debug = require('debug');
import httpRequest = require('request');

var routeLogger = debug('routes:index');
var router = express.Router();
routeLogger('Start setting up index route');

//Route order matters
router.all('*', function(req, res, next){
	res.locals = {
		title : 'your title',
		description : 'your description'
	};
	next();
});
router.get('/:path*', function(req, res) {
	console.log(req.params.path + req.params[0]);
});
router.get('/company/:companyName*', function(req, res, next){
	debugger;
	routeLogger(req.params.companyName + ' route');
	// res.render(req.params.companyName, { settings:{ env: 'test'}, title: req.query.title || 'ExpressJS Demo' , author: req.query.author || 'Anthony' });
	res.send('Success, the name of the company is ' + req.params.companyName);
});


router.get('/testbufferdata', function(req, res){
	debugger;
	routeLogger('testbufferdata route');
	res.send(new Buffer('whoop'));

});
router.post('/foo', function(req, res, next){
	res.send(req.body);

});


router.get('/testasyncerrorhandling', function(req, res){
	routeLogger('testasyncerrorhandling route');
	debugger;
	httpRequest
		.get('http://google.com/img.png')
		.on('response', function (response) {


			res.send('Success');

		})
		.on('error', function (error) {

			res.send('Error', error);
		});


});

router.get('/error', function(){

	debugger;
	throw new Error('Error with permissions');

});

/* GET home page. */
router.get('/:viewName', function(req, res, next){
	debugger;
	routeLogger(req.params.viewName);
	//res.sendfile('./public/index.html');
	res.render(req.params.viewName, { settings:{ env: 'test'}, title: req.query.title || 'ExpressJS Demo' , author: req.query.author || 'Anthony' });

});
routeLogger('Finish setting up index route');

export = router;
