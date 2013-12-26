'use strict';

/* Controllers */
var TWENTY_FIVE_IN_MILLIS_EPOCH = 1500000;

var pomodoroControllers = angular.module('pomodoro.controllers', []);

pomodoroControllers.controller('pomodoroCtrl', ['$scope','$routeParams',
		  //TODO make this an async function
		  function($scope,$routeParams){

			  //TODO add toggling 
			  //try to trigger time check based on time text changing?
                          $scope.startPomodoro = function(){
			    $scope.timeRemaining = 1500
			    var end = new Date(Date.now() + TWENTY_FIVE_IN_MILLIS_EPOCH);
                            //this needs to be async so that this function does not block?
			    //also need to disable the button until it's finished
			    /*while(Date.now() < end){
			            $scope.timeRemaining = millisecondsToSeconds(end - Date.now());
			            //TODO some sort of duplex connection to time server?
			    }*/
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

                         var millisecondsToMinutes = function(millis){
                           return millis / 1000 / 60;
                         };
                         
                         var millisecondsToSeconds = function(millis){
                           return millis / 1000;
                         };
		  }

  ]);

