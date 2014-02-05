'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('pomodoro.services'));

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

  var testRunFor3000_1001 = serviceTests.countdownTests.doStartElapseTests(3000,1001,"00:00:01");
  testRunFor3000_1001();
  //start at 15 min, elapse 6 min, 27 s
  var testRun900000_387000 = serviceTests.countdownTests.doStartElapseTests(900000,387000,"00:08:33");
  testRun900000_387000();

  /*describe('when start time was 3000 milliseconds and 1001 seconds have passed', function() {
      var startTime;
      var elapse;
      beforeEach(function(){
	this.clock = sinon.useFakeTimers();
        startTime = 3000;
        elapse = 1001;
      });

      var elapseMillis = function(intervalMock,sinonClock,millis){
          sinonClock.tick(millis);
          intervalMock.flush(millis);
      };
      
      it('elapsedMillis + timeRemainingMillis should == startime', 
        inject(function($rootScope,$interval,countdownService) {
            countdownService.startTimer(startTime);
	    //these need to be applied together:
	    //sinon advances date, $interval advances interval
	    elapseMillis($interval,this.clock,elapse);
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
            elapseMillis($interval,this.clock,elapse);
            var elapsedMillis = countdownService.getElapsedMillis();
            expect(elapsedMillis).toEqual(elapse);
      }));

      it('getHourMinuteSecondRemainString shows 00:00:01', 
        inject(function($rootScope,$interval,countdownService) {
            countdownService.startTimer(startTime);
            elapseMillis($interval,this.clock,elapse);
            var result = countdownService.getHourMinuteSecondRemainString();
            expect(result).toEqual("00:00:01");
      }));

      afterEach(function(){
        this.clock.restore();
	startTime = 0;
	elapse = 0;
      });
  });*/

  //
  //test startTimer(<negative value>)
  
});
