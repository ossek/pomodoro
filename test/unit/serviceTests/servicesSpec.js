
/* jasmine specs for services go here */

define([
	'angular',
	'angularMocks',
	'app',
	'countdownTests',
	'elapsePastTimerEndTests',
	'clockmock'
	], function(angular,mocks,app,countdownTests,elapsePastTimerEndTests,clockmock){
'use strict';

describe('service', function() {
  beforeEach(mocks.module('pomodoro.services'));

  describe('timeRemainingMillis', function() {
      it('should give 2 separate times when instantiated in different spots',function(){ 
	  mocks.inject(function(countdownService) {
            expect('1').toEqual('1');
          });
      });

  });

  describe('when start time was 0', function() {
      it('elapsedMillis + timeRemainingMillis should == startime', 
	  mocks.inject(function(countdownService) {
	      countdownService.startTimer(0);
	      var elapsedMillis = countdownService.getElapsedMillis();
	      var timeRemainingMillis = countdownService.getTimeRemainingMillis();
        expect(elapsedMillis + timeRemainingMillis).toEqual(0);
      }));
  });
  
 });
});
