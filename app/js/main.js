//thx to https://github.com/tnajdek/angular-requirejs-seed/blob/master/test/main-test.js
//
require.config({
    paths: {
	angular : '../lib/angular/angular',
	angularRoute : '../lib/angular/angular-route',
	timey: '../../bower_components/timeywimey/js/timey'
	//angularMocks
	//text
    },

//once loaded, use global 'angular' as the module value
shim:{
      'angular' : {
  	  'exports' : 'angular'
      }, 
      //doesn't need to export?, just needs array of deps
      'angularRoute' : {
  	  'exports' : 'angularRoute',
	  deps: ['angular']
      }
    },

priority: ['angular']

});

window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'angular',
    'angularRoute',
    'app',
    'parameterCheck'
], function(angular,routes,app,parameterCheck) {
    'use strict';
    console.log(angular);
    console.log(routes);
    console.log(app);
    console.log(parameterCheck);
    var $html = angular.element(document.getElementsByTagName('html')[0]);

    angular.element().ready(function() {
        angular.resumeBootstrap([app['name']]);
    });
});
	 
