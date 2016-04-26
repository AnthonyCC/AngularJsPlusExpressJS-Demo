var gulp = require('gulp');
var path = require('path');
var spawn = require('child_process').spawn;
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var rm = require('rimraf');
var concat = require('gulp-concat')
var runSequence = require('run-sequence');
var concat = require('gulp-concat-sourcemap');
var uglify = require('gulp-uglify');

var node;

function isDevEnv(){

	return !process.env.NODE_ENV || process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'dev'
}

gulp.task('clean', function(){
    return rm('build',['rmdir'], function(error){
		if(error) {
			console.log('An error has occured during the cleaning process.')
			console.log(error);
		}
	});
});


// Server, ExpressJS

gulp.task('build:server-js', function () {
	
	var tsProject = ts.createProject('server/tsconfig.json');
	var tsResult;
    var gulpSources = gulp.src(['server/**/*.ts','!server/typings/browser.d.ts','!server/typings/{browser,browser/**}']);

	if(!isDevEnv()){
		tsResult  = gulpSources.pipe(sourcemaps.init())
			.pipe(ts(tsProject));
		tsResult.js.pipe(uglify());
	}else{
		tsResult = gulpSources.pipe(ts(tsProject));
	}
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'));

});

// Server, Jade templates
gulp.task('build:server-view', function () {
	return gulp.src(['server/**/*.jade'], {base:'server'})
		.pipe(gulp.dest('build'));
});

// Client, libs.js
/*
  jsNPMDependencies, sometimes order matters here! so be careful!
*/
var jsNPMDependenciesDev = [
	'es6-shim/es6-shim.min.js',
	'systemjs/dist/system-polyfills.js',
	'angular2/es6/dev/src/testing/shims_for_IE.js',
	'angular2/bundles/angular2-polyfills.js',
	'systemjs/dist/system.src.js',
	'rxjs/bundles/Rx.js',
	'angular2/bundles/angular2.dev.js'
]
var jsNPMDependenciesProd = [
	'angular2/bundles/angular2-all.umd.minjs',
	'systemjs/dist/system.js'
]
gulp.task('build:client-libs', function(){
	var mappedPaths;
	if(isDevEnv()) {
		mappedPaths = jsNPMDependenciesDev.map(file => {return path.resolve('node_modules', file)});

	}else{
		mappedPaths = jsNPMDependenciesProd.map(file => {return path.resolve('node_modules', file)});

	}

    //Let's copy our head dependencies into a build/libs
    var copyJsNPMDependencies = gulp.src(mappedPaths, {base:'node_modules'})
		.pipe(concat('libs.js'))
        .pipe(gulp.dest('build/client/libs'));

    return copyJsNPMDependencies;
});
// Client, html files

gulp.task('build:client-html', function () {
	return gulp.src(['client/**.html', 'client/**/**.css'], {base:'client'})
		.pipe(gulp.dest('build/client'));
});

// Client, AngularJS


gulp.task('build:client-app', function(){
    var tsProject = ts.createProject('client/app/tsconfig.json');
    var tsResult = gulp.src('client/app/**/*.ts')
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject));

	return tsResult.js
        .pipe(sourcemaps.write()) 
		.pipe(gulp.dest('build/client/app'))
});


gulp.task('build', function(callback){
	console.log('Env: '+ process.env.NODE_ENV);
	runSequence('clean', 'build:server-js', 'build:server-view', 'build:client-libs', 'build:client-html', 'build:client-app', callback);
});

gulp.task('build:server', function(){
	console.log('Env: '+ process.env.NODE_ENV);
    runSequence('build:server-js', 'build:server-view');
});
gulp.task('start', function(){
	console.log('Env: '+ process.env.NODE_ENV);
	if (node) {
		node.kill();
	}

	node = spawn('node', ['build/server.js'], {stdio: 'inherit'});
	node.on('close', function (code) {
		if (code === 8) {
			gulp.log('Error detected, waiting for changes...');
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('server/**/*.ts', function(){
		runSequence('build:server-js', 'start')
	});
	gulp.watch('server/**/*.jade', function(){
		runSequence('build:server-view', 'start')
	});

	// watch({glob: 'server/**/*.ts'}, function() {
	// 	gulp.start("build:server-js");
	// });
	// watch({glob: 'server/**/*.jade'}, function() {
	// 	gulp.start("build:server-view");
	// });

});

gulp.task('default', function() {
	console.log('Env: '+ process.env.NODE_ENV);
	runSequence('build', 'watch', 'start');

});