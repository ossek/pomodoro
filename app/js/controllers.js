define(['angular','services','timey','parameterCheck'],function(angular,services,timey,parameterCheck){
  'use strict';
  /* Controllers */
  var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;
  var FIVE_IN_MILLIS_EPOCH = 300000;
  var TEN_IN_MILLIS_EPOCH = 600000;
  
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  
  pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams','$interval',
     //TODO make this an async function
    function($scope,$routeParams,$interval){
      var timer = Object.create(timey);
      console.log(timer);

      $scope.timerDisplay = {
              editorActive : false,
              timeRemaining : {
		      hour:'00',
		      minute:'00',
		      second:'00',
	      }
      };

      $scope.completedTimes = [];

      //controller interface internals
      var getMillisFromInput = function(inputHours,inputMins,inputSecs){
	      var hoursMillis = 0;
	      var minuteMillis = 0;
	      var secMillis = 0;
	      if(!(inputHours === null || inputHours === undefined)){
		      hoursMillis = inputHours*60*60*1000;
	      }
	      if(!(inputMins === null || inputMins === undefined)){
		      minuteMillis = inputMins*60*1000;
	      }
	      if(!(inputSecs === null || inputSecs === undefined)){
		      secMillis = inputSecs*1000;
	      }
	      return hoursMillis + minuteMillis + secMillis;
      };

      var setEditorInactive = function(){
	      $scope.timerDisplay.editorActive = false;
      };

      var twoDigits = function(inputDigits){
          return parseInt(inputDigits.toString().substring(0,2));
      };

      var nullOrUndefined = function(value){
	      return value === null || value === undefined;
      };

      var addCompleted = function(timerFinishedEventObj){
	      if(timerFinishedEventObj.completedCountdownMillis >= 1000){
	        $scope.completedTimes.push({
	                time : timer.getHourMinuteSecondString(timerFinishedEventObj.completedCountdownMillis),
	                at : timer.getLocalTimeString(timerFinishedEventObj.finishedAt),
	        });
	      }
      };
      timer.registerObserver(addCompleted);

      //update the display frequently
      $interval(function(){
      	//$scope.timerDisplay.timeRemaining = timer.getHourMinuteSecondRemainString();
	var t = timer.getPaddedHourMinuteSecondObj(timer.getTimeRemainingMillis());
	console.log('t ' + t);
      	$scope.timerDisplay.timeRemaining = timer.getPaddedHourMinuteSecondObj(timer.getTimeRemainingMillis());
      },20,0,true);


      //controller interface
      $scope.startTimer = function(){
         var inputMillis = getMillisFromInput($scope.timerDisplay.inputHours,
			 $scope.timerDisplay.inputMinutes,
			 $scope.timerDisplay.inputSeconds);
	 if(inputMillis === null){
           timer.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
	   return;
	 }
	 //clear inputs
	 $scope.timerDisplay.inputHours = "00";
	 $scope.timerDisplay.inputMinutes = "00";
	 $scope.timerDisplay.inputSeconds = "00";
	 timer.startTimer(inputMillis);
      };

      $scope.startTimerFromEditor = function(){
	      $scope.startTimer();
	      setEditorInactive();
      };

      $scope.hourMask = function(){
	      if(!nullOrUndefined($scope.timerDisplay.inputHours)){
		      if(!parameterCheck.isInteger($scope.timerDisplay.inputHours)){
			      $scope.timerDisplay.inputHours = "";
			      return;
		      }
		      if($scope.timerDisplay.inputHours.toString().length > 2)
		      {
			      $scope.timerDisplay.inputHours = twoDigits($scope.timerDisplay.inputHours);
		      }
	      }
      };

      $scope.minuteMask = function(){
	      if(!nullOrUndefined($scope.timerDisplay.inputMinutes)){
		      if(!parameterCheck.isInteger($scope.timerDisplay.inputMinutes)){
			      $scope.timerDisplay.inputMinutes = "";
			      return;
		      }
		      if($scope.timerDisplay.inputMinutes.toString().length > 2)
		      {
			      $scope.timerDisplay.inputMinutes = twoDigits($scope.timerDisplay.inputMinutes);
		      }
	      }
      };

      $scope.secondMask = function(){
	      if(!nullOrUndefined($scope.timerDisplay.inputSeconds)){
		      if(!parameterCheck.isInteger($scope.timerDisplay.inputSeconds)){
			      $scope.timerDisplay.inputSeconds = "";
			      return;
		      }
		      if($scope.timerDisplay.inputSeconds.toString().length > 2)
		      {
			      $scope.timerDisplay.inputSeconds = twoDigits($scope.timerDisplay.inputSeconds);
		      }
	      }
      };

      $scope.setEditorActive = function(){
	      $scope.timerDisplay.editorActive = true;
      };

      $scope.reset = function(){
        timer.reset();
      };

      $scope.pause = function(){
	      timer.pause();
      };

      $scope.resume = function(){
	      timer.resume();
      };
    
      $scope.shortBreak = function(){
        timer.startTimer(FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.longBreak = function(){
        timer.startTimer(TEN_IN_MILLIS_EPOCH);
      };

    }]);

    return pomodoroControllers;

});
