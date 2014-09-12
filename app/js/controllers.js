define(['angular','services','timey','parameterCheck'],function(angular,services,timey,parameterCheck){
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
         var inputMillis = getMillisFromInput($scope.inputHours,$scope.inputMinutes,$scope.inputSeconds);
	 if(inputMillis === null){
           timer.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
	   return;
	 }
	 timer.startTimer(inputMillis);
      };

      $scope.startTimerFromEditor = function(){
	      //$scope.reset();
	      $scope.startTimer();
	      setEditorInactive();
      };

      var getMillisFromInput = function(inputHours,inputMins,inputSecs){
	      console.log(' hours ' + inputHours + ' mins ' + inputMins + ' secs ' + inputSecs);
	      var hoursMillis = 0;
	      if(!(inputHours === null || inputHours === undefined)){
		      hoursMillis = inputHours*60*60*1000;
	      }

	      var minuteMillis = 0;
	      if(!(inputMins === null || inputMins === undefined)){
		      minuteMillis = inputMins*60*1000;
	      }

	      var secMillis = 0;
	      if(!(inputSecs === null || inputSecs === undefined)){
		      secMillis = inputSecs*1000;
	      }
	      return hoursMillis + minuteMillis + secMillis;
      };

      $scope.hourMask = function(){
	      if(!nullOrUndefined($scope.inputHours)){
		      if(!parameterCheck.isInteger($scope.inputHours)){
			      $scope.inputHours = "";
			      return;
		      }
		      if($scope.inputHours.toString().length > 2)
		      {
			      $scope.inputHours = twoDigits($scope.inputHours);
		      }
	      }
      };

      $scope.minuteMask = function(){
	      if(!nullOrUndefined($scope.inputMinutes)){
		      if(!parameterCheck.isInteger($scope.inputMinutes)){
			      $scope.inputMinutes = "";
			      return;
		      }
		      if($scope.inputMinutes.toString().length > 2)
		      {
			      $scope.inputMinutes = twoDigits($scope.inputMinutes);
		      }
	      }
      };

      $scope.secondMask = function(){
	      if(!nullOrUndefined($scope.inputSeconds)){
		      if(!parameterCheck.isInteger($scope.inputSeconds)){
			      $scope.inputSeconds = "";
			      return;
		      }
		      if($scope.inputSeconds.toString().length > 2)
		      {
			      $scope.inputSeconds = twoDigits($scope.inputSeconds);
		      }
	      }
      };

      $scope.editorActive = false;

      $scope.setEditorActive = function(){
	      $scope.editorActive = true;
      };

      var setEditorInactive = function(){
	      console.log("set editor inactive");
	      $scope.editorActive = false;
	      //todo set timer value to input
      };

      var twoDigits = function(inputDigits){
          return parseInt(inputDigits.toString().substring(0,2));
      };

      var nullOrUndefined = function(value){
	      return value === null || value === undefined;
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
      },20,0,true);

    }]);

    return pomodoroControllers;

});
