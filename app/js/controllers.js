define(['angular','services'],function(angular,services){
  'use strict';
  /* Controllers */
  var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;
  
  var pomodoroControllers = angular.module('pomodoro.controllers', ['pomodoro.services']);
  
  pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams','countdownService'],
     //TODO make this an async function
    function($scope,$routeParams,countdownService){
      //TODO add toggling 
      //try to trigger time check based on time text changing?
      $scope.startPomodoro = function(){
        $scope.timeRemaining = 1500;
        var end = new Date(Date.now() + TWENTY_FIVE_IN_MILLIS_EPOCH);
      };
    
      $scope.reset = function(){
        $scope.timeRemaining = 0;
      };
    
      $scope.shortBreak = function(){
        $scope.timeRemaining = 300;
      };
    
      $scope.longBreak = function(){
        $scope.timeRemaining = 900;
      };
    });

});
