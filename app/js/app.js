'use strict';


// Declare app level module which depends on filters, and services
var pomodoroModule = angular.module('pomodoro', [
  'ngRoute',
//  'Pomodoro.filters',
//  'Pomodoro.services',
  'pomodoro.directives',
  'pomodoro.controllers'
]);

pomodoroModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/pomodoro', {templateUrl: 'partials/pomodoro.html', controller: 'pomodoroCtrl'});
  //$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  //TODO query url to set pomodoro time
  $routeProvider.otherwise({redirectTo: '/pomodoro'});
}]);
