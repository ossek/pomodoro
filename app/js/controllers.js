define(['angular','services'],function(angular,services){
  'use strict';
  /* Controllers */
  var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;
  var FIVE_IN_MILLIS_EPOCH = 300000;
  var TEN_IN_MILLIS_EPOCH = 600000;
  
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  
  pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams','countdownService',
     //TODO make this an async function
    function($scope,$routeParams,countdownService){
      //TODO add toggling 
      //try to trigger time check based on time text changing?
      $scope.startPomodoro = function(){
         countdownService.reset();
         countdownService.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.reset = function(){
         countdownService.reset();
      };
    
      $scope.shortBreak = function(){
        countdownService.reset();
        countdownService.startTimer(FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.longBreak = function(){
        countdownService.reset();
        countdownService.startTimer(TEN_IN_MILLIS_EPOCH);
      };

      $scope.timeRemaining = countdownService.timeRemaining; 

    }]);

});
