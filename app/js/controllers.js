define(['angular','services','timey','parameterCheck'],function(angular,services,timey,parameterCheck,timbre){
  'use strict';
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  pomodoroControllers.controller('pomodoroCtrl', [
      '$scope',
      '$routeParams',
      '$interval',
      'timeConvertService',
      'soundService',
    function($scope,$routeParams,$interval,timeConvertService,soundService){
      var timer = Object.create(timey);
      var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;

      $scope.timerDisplay = {
              pauseAvailable : false,
              resumeAvailable : false,
              editorActive : false, //start is available when this value is true, set is available when it is false
              timeRemaining : {
		      hour:'00',
		      minute:'00',
		      second:'00',
	      }
      };

      $scope.clickStart = function(){
	      startTimer();
	      setPauseAvailable();
	      setResumeUnavailable();
	      setEditorInactive();
      };

      $scope.clickSet = function(){
	      timer.reset();
	      setPauseUnavailable();
	      setResumeUnavailable();
	      setEditorActive();
      };

      $scope.clickPause = function(){
	      timer.pause();
	      setPauseUnavailable();
	      setResumeAvailable();
	      setEditorInactive();
      };

      $scope.clickResume = function(){
	      timer.resume();
	      setPauseAvailable();
	      setResumeUnavailable();
	      setEditorInactive();
      };

      $scope.completedTimes = [];

      $scope.showCompletedTimes = function(){
	      return (!($scope.completedTimes.length === null || 
			      $scope.completedTimes === undefined) && 
			      $scope.completedTimes.length > 0);
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

      function setEditorInactive(){
	      $scope.timerDisplay.editorActive = false;
      }

      function setEditorActive(){
	      $scope.timerDisplay.editorActive = true;
      }

      function setPauseAvailable(){
	      $scope.timerDisplay.pauseAvailable = true;
      }

      function setPauseUnavailable(){
	      $scope.timerDisplay.pauseAvailable = false;
      }

      function setResumeAvailable(){
	      $scope.timerDisplay.resumeAvailable = true;
      }

      function setResumeUnavailable(){
	      $scope.timerDisplay.resumeAvailable = false;
      }
      
      function twoDigits(inputDigits){
          return parseInt(inputDigits.toString().substring(0,2));
      }

      function nullOrUndefined(value){
	      return value === null || value === undefined;
      }

      function addCompleted(timerFinishedEventObj){
	      if(timerFinishedEventObj.completedCountdownMillis >= 1000){
	        $scope.completedTimes.push({
	                time : timer.getHourMinuteSecondString(timerFinishedEventObj.completedCountdownMillis),
	                at : timer.getLocalTimeString(timerFinishedEventObj.finishedAt),
	        });
                soundService.playTimerFinishedSound();
	      }
	      setPauseUnavailable();
	      setResumeUnavailable();
	      setEditorInactive();
      }

      timer.registerObserver(addCompleted);

      //update the display frequently
      $interval(function(){
      	$scope.timerDisplay.timeRemaining = timer.getPaddedHourMinuteSecondObj(timer.getTimeRemainingMillis());
      },20,0,true);

      function startTimer(){
         var inputMillis = timeConvertService.getMillisFromInput($scope.timerDisplay.inputHours,
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
      }
      
    }]);

    return pomodoroControllers;

});
