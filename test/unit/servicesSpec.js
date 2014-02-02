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

  describe('when start time was 576 and 231 seconds have passed', function() {
      beforeEach(function(){
        jasmine.Clock.useMock();
      });
      
      it('elapsedMillis + timeRemainingMillis should == startime', 
	  inject(function(countdownService) {
	      var startTime = 576;
	      countdownService.startTimer(startTime);
              jasmine.Clock.tick(231);
	      var elapsedMillis = countdownService.getElapsedMillis();
	      var timeRemainingMillis = countdownService.getTimeRemainingMillis();
        expect(elapsedMillis + timeRemainingMillis).toEqual(startTime);
      }));
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
