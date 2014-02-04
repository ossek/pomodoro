module.exports = function(config){
    config.set({
    basePath : '../',

    //files to load in the browser
    files : [
      'app/lib/angular/angular.js',
      'app/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js',
      'node_modules/sinon/pkg/sinon-timers-1.8.1.js'
    ],

    exclude : [
      'app/lib/angular/angular-loader.js',
      'app/lib/angular/*.min.js',
      'app/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    logLevel : config.LOG_DEBUG,

    frameworks: ['jasmine'],

    /*angular 1.2.10 fixes error related to using PhantomJS */
    //https://github.com/angular/angular.js/commit/7e916455b36dc9ca4d4afc1e44cade90006d00e30
    //browsers : ['PhantomJS'],
    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-html-reporter'
            ],
    /*reporters : ['progress','junit'],
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }*/
    
    reporters : ['progress','html'],
    htmlReporter : {
	outputDir : 'test_out',
	templatePath : __dirname + '/../node_modules/karma-html-reporter/jasmine_template.html'
    }

  });
};
