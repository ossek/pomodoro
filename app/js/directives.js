define(['angular','services'],function(angular,services){
'use strict';
/* Directives */
angular.module('pomodoro.directives', [])
	//this directive seemed to cause a problem on load.  possibly not shimmed in requirejs
  //.directive('appVersion', ['version', function(version) {
  //  return function(scope, elm, attrs) {
  //    elm.text(version);
  //  };
  //}])
  
//note that the declaration below  of $interval in a string
//is to deal with potential minification
//see http://thegreenpizza.github.io/2013/05/25/building-minification-safe-angular.js-applications/
//this directive based closely on the one at http://docs.angularjs.org/guide/directive
  .directive('countdown', ['$interval','dateFilter', 'countdown_service',function($interval,dateFilter,countdown_service) {

    function link(scope,element,attrs) {
	    var startDate = Date.now();
	    var timerMillis = attrs.countdown;
            var timeoutId;
	    var elapsedMillis;
	    var remain;

	    function getHourMinuteSecondRemainString(millis) {
		//this constructor is milliseconds with respect to UTC epoch start
		// so showing its value with non-UTC methods will adjust for 
		// browser's timezone (i think that's what's happening?)
		    var remain= new Date(millis); 
		    var utcString = remain.toUTCString();
                    var outputString = utcString.slice(-12,utcString.length - 4);
		    return outputString;
	    }

	    //update DOM / UI
	    function setTimeRemaining(millis){
		    var timeString = getHourMinuteSecondRemainString(millis);
		    element.text(timeString);
	    }

	    function updateTimeRemaining() {
		    elapsedMillis = Date.now() - startDate
		    if (elapsedMillis >= timerMillis){
			    $interval.cancel(timeoutId);
		    }
		    else{
	              //if this calculation is delayed, could still be negative
                      setTimeRemaining(timerMillis - elapsedMillis);
		    }
	    }

	    //from angular example
	    //"updates the UI when a user changes the time formatting string our 
	    //directive binds to."
	    scope.$watch(attrs.countdown, function() {
		    updateTimeRemaining();
	    });

	    element.on('$destroy',function(){
		    $interval.cancel(timeoutId);
	    });

	    // start the UI update process; save the timeoutId for canceling
	    // updates UI every 1 second or 1000 ms
	    timeoutId = $interval(function(){
		   updateTimeRemaining();
		   }, 1000);
    }

    return {
	    link : link
    };
  }])

.directive('currentTime', ['$interval','dateFilter', function($interval,dateFilter) {

    function link(scope,element,attrs) {
            var timeoutId;
            var REMAIN_FORMAT='EEEE MMM. d yyyy h:mm:ss';

	    function updateTime() {
		    element.text(dateFilter(new Date(), REMAIN_FORMAT));
	    }

	    scope.$watch(attrs.timeRemaining, function() {
		    updateTime();
	    });

	    element.on('$destroy',function(){
		    $interval.cancel(timeoutId);
	    });

	    // start the UI update process; save the timeoutId for canceling
	    timeoutId = $interval(function(){
		   updateTime();
		   }, 1000);
    }

    return {
	    link : link
    };


  }]);

});
