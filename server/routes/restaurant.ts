
import express = require('express');
import debug = require('debug');
import httpRequest = require('request');
import restaurantService = require('../services/restaurants');

let restaurantLogger = debug('routes:restaurant');
let router = express.Router();

restaurantLogger('Start setting up restaurant route');

//Route order matters

router.get('/testusers', function(req, res, next){
	debugger;
	restaurantService.users.find({}, function(err, restaurants) {
		debugger;
		if(err){
			res.send(err);
		}else{
			res.send(restaurants);

		}
	});
});

router.get('/list/:max', function(req, res){
	debugger;
	// restaurantService.restaurants.find({}).stream().pipe(res);
	var query = restaurantService.restaurants.find({}).lean().stream();
	let resArray = [];
	let count = 0;
	let max = parseInt(req.params.max);
	if(isNaN(max) || max < 0){
		res.send(req.params.max + 'is not a valid number');
	}

	query.on('data', function(doc){
		resArray.push(doc);
		count++;

		if(max != 0 && count >= max){
			// Mongoose documentation is wrong. calling destroy WILL trigger the close event.
			this.destroy();
		}
	})
	.on('error', function(err){
		res.send(err);
	})
	.on('close', function(){
		res.render('angular1', resArray);
	});
});

export = router;
