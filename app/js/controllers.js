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

      $scope.startPomodoro = function(){
         timer.startTimer(TWENTY_FIVE_IN_MILLIS_EPOCH);
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
