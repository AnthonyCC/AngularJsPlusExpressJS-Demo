var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var rm = require('rimraf');
var concat = require('gulp-concat')
var runSequence = require('run-sequence');
var concat = require('gulp-concat-sourcemap');
var uglify = require('gulp-uglify');


gulp.task('clean', function(){
    return rm('build',['rmdir'], function(error){
		if(error)
			console.log(error);
	});
});


// SERVER

gulp.task('build:server-js', function () {
	
	var tsProject = ts.createProject('server/tsconfig.json');
    var tsResult = gulp.src(['server/**/*.ts', 'server/**/*.jade','!server/typings/browser.d.ts','!server/typings/{browser,browser/**}'])
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject))
	return tsResult.js
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build'));

});
gulp.task('build:server-view', function () {
	return gulp.src(['server/**/*.jade'])
		.pipe(gulp.dest('build'));
});

// CLIENT

/*
  jsNPMDependencies, sometimes order matters here! so be careful!
*/
var jsNPMDependencies = [
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js'
] 

gulp.task('build:index', function(){
    var mappedPaths = jsNPMDependencies.map(file => {return path.resolve('node_modules', file)}) 
    
    //Let's copy our head dependencies into a dist/libs
    var copyJsNPMDependencies = gulp.src(mappedPaths, {base:'node_modules'})
        .pipe(gulp.dest('build/libs'))
     
    //Let's copy our index into dist   
    var copyIndex = gulp.src('client/index.html')
        .pipe(gulp.dest('build'))
    return [copyJsNPMDependencies, copyIndex];
});

gulp.task('build:app', function(){
    var tsProject = ts.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/**/*.ts')
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject))
	return tsResult.js
        .pipe(sourcemaps.write()) 
		.pipe(gulp.dest('build'))
});


gulp.task('build', function(callback){
    runSequence('clean', 'build:server', 'build:index', 'build:app', callback);
});

gulp.task('build:server', function(callback){
    runSequence('clean', 'build:server-js', 'build:server-view');
});
gulp.task('default', ['build']);