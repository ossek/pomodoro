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

  //start at 3 s, elapse 1s 1 ms
  var testRunFor3000_1001 = serviceTests.countdownTests.doStartElapseTests(3000,1001,"00:00:01");
  testRunFor3000_1001();
  //start at 15 min, elapse 6 min, 27 s
  var testRun900000_387000 = serviceTests.countdownTests.doStartElapseTests(900000,387000,"00:08:33");
  testRun900000_387000();
  //elapse the time past the end of the startTime
  var testRun900000_1000000 = serviceTests.countdownTests.doStartElapseTests(900000,1000000,"00:00:00");
  testRun900000_1000000();
  
  describe('when start time is -1', function(){
      it('exception is thrown',
        inject(function(countdownService){
	    var test = function(){
              countdownService.startTimer(-1);
        };
            expect(test).toThrow();
          }));
  });

  //try with a string
  describe('when start time is "dale"', function(){
      it('exception is thrown',
        inject(function(countdownService){
	    var test = function(){
              countdownService.startTimer("dale");
        };
            expect(test).toThrow();
          }));
  });
  
  describe('when start time is -1', function(){
      it('exception is thrown',
        inject(function(countdownService){
	    var test = function(){
              countdownService.startTimer(-1);
        };
            expect(test).toThrow();
          }));
  });

  //try with -0 because javascript is weird and that seems like something it would do
  var testRunForneg0_1001 = serviceTests.countdownTests.doStartElapseTests(-0,1001,"00:00:00");
  testRunForneg0_1001();
  //try with input larger than 99 hours
  //
  //try with a non-integer parameter
  describe('when start time is 3000.07', function(){
      it('exception is thrown',
        inject(function(countdownService){
	    var test = function(){
              countdownService.startTimer("3000.07");
        };
            expect(test).toThrow();
          }));
  });

  var testRunFor3000pt0_1001 = serviceTests.countdownTests.doStartElapseTests(3000.0,1001,"00:00:01");
  testRunFor3000pt0_1001();

  //try getting the string when there's not time set
  //
  //try reset

});
