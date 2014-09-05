define(['angular','services','timey'],function(angular,services,timey){
  'use strict';
  /* Controllers */
  var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;
  var FIVE_IN_MILLIS_EPOCH = 300000;
  var TEN_IN_MILLIS_EPOCH = 600000;
  
  console.log("trying to load controller");
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  
  pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams','countdownService',
     //TODO make this an async function
    function($scope,$routeParams,countdownService){
      //TODO add toggling 
      //try to trigger time check based on time text changing?
      console.log("load controller");
      var timer = Object.create(timey);

      $scope.startPomodoro = function(){
         console.log('set timeRemaining');
         $scope.timeRemaining = timer.getHourMinuteSecondString(TWENTY_FIVE_IN_MILLIS_EPOCH); 
	 console.log('it was set to: ' + $scope.timeRemaining);
         console.log('starting');
         timer.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.reset = function(){
         //countdownService.reset();
        console.log('resetting');
        timer.reset();
	$scope.timeRemaining = timer.getHourMinuteSecondRemainString();
      };
    
      $scope.shortBreak = function(){
        $scope.timeRemaining = timer.getHourMinuteSecondString(FIVE_IN_MILLIS_EPOCH); 
        timer.startTimer(FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.longBreak = function(){
         $scope.timeRemaining = timer.getHourMinuteSecondString(TEN_IN_MILLIS_EPOCH); 
        timer.startTimer(TEN_IN_MILLIS_EPOCH);
      };

      console.log('timeRemaining ' + $scope.timeRemaining);

      //$scope.$watch(timer.getTimeRemainingMillis,function(newValue,oldValue){
      //    console.log('watchin old' + oldValue + " new " + newValue);
      //    $scope.timeRemaining = timer.getHourMinuteSecondString(newValue);
      //    console.log('timeRemaining ' + $scope.timeRemaining);
      //});

      $scope.getHourMinuteSecondRemainString = (function(){console.log('getting');return timer.getHourMinuteSecondRemainString;});

      $scope.$watch($scope.getHourMinuteSecondRemainString,function(newv,oldv){});

    }]);

    return pomodoroControllers;

});
