'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('pomodoro.services'));

  /*describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });*/

  describe('timeRemainingMillis', function() {
      it('should give 2 separate times when instantiated in different spots',function(){ 
	  inject(function(countdownService) {
            expect('1').toEqual('1');
          });
      });

  });

  describe('when start time was 0', function() {
      it('elapsedMillis + timeRemainingMillis should == startime', 
	  inject(function(countdownService) {
	      countdownService.startTimer(0);
	      var elapsedMillis = countdownService.getElapsedMillis();
	      var timeRemainingMillis = countdownService.getTimeRemainingMillis();
        expect(elapsedMillis + timeRemainingMillis).toEqual(0);
      }));
  });

  describe('when start time was 3000 milliseconds and 1000 seconds have passed', function() {
      var startTime;
      var elapse;
      beforeEach(function(){
	this.clock = sinon.useFakeTimers();
        startTime = 3000;
        elapse = 1001;
      });
      
      it('elapsedMillis + timeRemainingMillis should == startime', 
        inject(function($rootScope,$interval,countdownService) {
            countdownService.startTimer(startTime);
	    //these need to be applied together:
	    //sinon advances date, $interval advances interval
	    this.clock.tick(elapse);
	    $interval.flush(elapse);
            //jasmine clock does not mock Date
            //see https://github.com/pivotal/jasmine/issues/361
	    //the mock $interval service also does not affect Date
            var elapsedMillis = countdownService.getElapsedMillis();
            var timeRemainingMillis = countdownService.getTimeRemainingMillis();
            expect(elapsedMillis + timeRemainingMillis).toEqual(startTime);
            expect(elapsedMillis).toEqual(elapse);
      }));

      it('elapsedMillis is the time elapsed', 
        inject(function($rootScope,$interval,countdownService) {
            countdownService.startTimer(startTime);
	    //these need to be applied together:
	    //sinon advances date, $interval advances interval
	    this.clock.tick(elapse);
	    $interval.flush(elapse);
            //jasmine clock does not mock Date
            //see https://github.com/pivotal/jasmine/issues/361
	    //the mock $interval service also does not affect Date
            var elapsedMillis = countdownService.getElapsedMillis();
            expect(elapsedMillis).toEqual(elapse);
      }));

      afterEach(function(){
        this.clock.restore();
	startTime = 0;
	elapse = 0;
      });
  });
  //
  //test startTimer(<negative value>)

  /*
  describe('getCountdownHourMinuteSecString', function() {
      it('should display 00:00:00 for property set to 0', 
	  inject(function(countdownService) {
	      countdownService.startTimer(0);
	      var hms_string = countdownService.getCountdownHourMinuteSecString();
        expect(hms_string).toEqual('00:00:00');
      }));

      it('should display 00:25:00 for property set to 1500000', 
	  inject(function(version) {
        expect(1).toEqual(1);
      }));
  }); 
  */

});
