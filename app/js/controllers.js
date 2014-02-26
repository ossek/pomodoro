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
         console.log('starting');
         $scope.timeRemaining = countdownService.getHourMinuteSecondRemainString(TWENTY_FIVE_IN_MILLIS_EPOCH); 
         countdownService.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.reset = function(){
         //countdownService.reset();
        countdownService.startTimer(0);
      };
    
      $scope.shortBreak = function(){
        $scope.timeRemaining = countdownService.getHourMinuteSecondRemainString(FIVE_IN_MILLIS_EPOCH); 
        countdownService.startTimer(FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.longBreak = function(){
         $scope.timeRemaining = countdownService.getHourMinuteSecondRemainString(TEN_IN_MILLIS_EPOCH); 
        countdownService.startTimer(TEN_IN_MILLIS_EPOCH);
      };

      console.log('timeRemaining ' + $scope.timeRemaining);

      $scope.$watch(countdownService.getTimeRemainingMillis,function(newValue,oldValue){
          console.log('watchin old' + oldValue + " new " + newValue);
          $scope.timeRemaining = countdownService.getHourMinuteSecondRemainString(newValue);
      });

    }]);

    return pomodoroControllers;

});
