define(['angular','services','timey'],function(angular,services,timey){
  'use strict';
  /* Controllers */
  var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;
  var FIVE_IN_MILLIS_EPOCH = 300000;
  var TEN_IN_MILLIS_EPOCH = 600000;
  
  console.log("trying to load controller");
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  
  pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams','countdownService','$interval',
     //TODO make this an async function
    function($scope,$routeParams,countdownService,$interval){
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

      //if the timey object updates its current time every second
      //then checking the time more than every second here should
      //catch its updates.  this boils down to periodically (via setInterval)
      //checking something that's also updated periodically (via setInterval).
      //due to js being single threaded in browser, this (as any step taken while the timer is going) will further reduce the accuracy of the timer

      //this is only here to invoke apply / do dirty checking every 
      //half second so that the current time is updated.
      //not pretty.
      $interval(function(){
	      $scope.timeRemaining = timer.getHourMinuteSecondRemainString();
      },500,0,true);

    }]);

    return pomodoroControllers;

});
