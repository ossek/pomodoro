define(['angular','services','timey'],function(angular,services,timey){
  'use strict';
  /* Controllers */
  var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;
  var FIVE_IN_MILLIS_EPOCH = 300000;
  var TEN_IN_MILLIS_EPOCH = 600000;
  
  console.log("trying to load controller");
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  
  pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams','$interval',
     //TODO make this an async function
    function($scope,$routeParams,$interval){
      //TODO add toggling 
      console.log("load controller");
      var timer = Object.create(timey);

      $scope.timeRemaining = timer.getHourMinuteSecondString(0);

      $scope.startTimer = function(){
         var inputMillis = getMillisFromInput($scope.inputMins,$scope.inputSecs);
	 if(inputMillis === null){
           timer.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
	   return;
	 }
	 timer.startTimer(inputMillis);
      };

      var getMillisFromInput = function(inputMins,inputSecs){
	      var millis = null;
	      if(inputMins === null || inputMins === undefined){
		      if(inputSecs === null || inputMins === undefined){
			      return millis;
		      }
		      return inputSecs * 1000;
	      }
	      millis = 60*1000* inputMins; 
	      var secs = (inputSecs === null || inputSecs === undefined) ? 0 : inputSecs;
	      return millis + (secs * 1000);
      };
    
      $scope.reset = function(){
        timer.reset();
      };
    
      $scope.shortBreak = function(){
        timer.startTimer(FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.longBreak = function(){
        timer.startTimer(TEN_IN_MILLIS_EPOCH);
      };

      $interval(function(){
      	$scope.timeRemaining = timey.getHourMinuteSecondRemainString();
      },250,0,true);

    }]);

    return pomodoroControllers;

});
