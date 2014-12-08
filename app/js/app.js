define([
	'angular', //as defined in the requirejs shim config
	'filters', //as defined in the filters.js
	'services', //as defined in services.js
	'directives', //in directives.js
	'controllers', //in controllers.js
	'angularRoute',//as defined in the requirejs config
	],function(angular,filters,services,directives,controllers,angularRoute){

'use strict';
// Declare app level module which depends on filters,services,controllers,directives, and angular globals
var pomodoroModule = angular.module('pomodoro', [
  'ngRoute',
  'pomodoro.filters',
  'pomodoro.services',
  'pomodoro.directives',
  'pomodoro.controllers'
]);

pomodoroModule.config(['$routeProvider', function($routeProvider) {
    console.log('making routes');
  $routeProvider.when('/pomodoro', {templateUrl: 'partials/pomodoro.html', controller: 'pomodoroCtrl'});
  $routeProvider.otherwise({redirectTo: '/pomodoro'});
}]);

return pomodoroModule;
});
