
import express = require('express');
import debug = require('debug');

var routeLogger = debug('routes:index');
var router = express.Router();
debug('Start setting up index route');

/* GET home page. */
router.get('/', function(req, res, next){
	routeLogger('root route');
	res.render('index', { settings:{ env: 'test'}, title: req.query.title || 'ExpressJS Demo' , author: req.query.author || 'Anthony' });

});
router.get('/:companyName', function(req, res, next){
	debugger;
	routeLogger(req.params.companyName + ' route');
	res.render(req.params.companyName, { settings:{ env: 'test'}, title: req.query.title || 'ExpressJS Demo' , author: req.query.author || 'Anthony' });

});
routeLogger('Finish setting up index route');

export = router;
