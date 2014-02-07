var serviceTests = serviceTests || {};
serviceTests.countdownTestsPastTimer = (function(){

  var elapseMillis = clockmock.elapseMillis;

  var doStartElapseTests = function(startTime,timeElapsed,expectedDisplay){
      var runTests = function(){
        describe('when start time was ' +  startTime + ' milliseconds and ' + timeElapsed + ' seconds have passed and timer has not been reset', function() {
              var _startTime;
              var _elapse;
              beforeEach(function(){
                this.clock = sinon.useFakeTimers();
                _startTime = startTime;
                _elapse = timeElapsed;
              });
              
              it('elapsedMillis + timeRemainingMillis should == startime', 
                inject(function($rootScope,$interval,countdownService) {
                    countdownService.startTimer(_startTime);
                    elapseMillis($interval,this.clock,_elapse);
                    var elapsedMillis = countdownService.getElapsedMillis();
                    var timeRemainingMillis = countdownService.getTimeRemainingMillis();
		    expect(timeRemainingMillis).toEqual(0);
                    expect(elapsedMillis + timeRemainingMillis).toEqual(elapseMillis);
                    expect(elapsedMillis).toEqual(_elapse);
              }));
	      
	      //expect that time continues elapsing until a reset
              it('elapsedMillis is the time elapsed', 
                inject(function($rootScope,$interval,countdownService) {
                    countdownService.startTimer(_startTime);
        	    elapseMillis($interval,this.clock,_elapse);
                    var timeRemainingMillis = countdownService.getTimeRemainingMillis();
                    var elapsedMillis = countdownService.getElapsedMillis();
		    expect(timeRemainingMillis).toEqual(0);
                    expect(elapsedMillis).toEqual(_elapse);
              }));
        
              it('getHourMinuteSecondRemainString shows ' +  expectedDisplay, 
                inject(function($rootScope,$interval,countdownService) {
                    countdownService.startTimer(_startTime);
                    elapseMillis($interval,this.clock,_elapse);
                    var timeRemainingMillis = countdownService.getTimeRemainingMillis();
		    expect(timeRemainingMillis).toEqual(0);
                    var result = countdownService.getHourMinuteSecondRemainString();
                    expect(result).toEqual(expectedDisplay);
              }));
        
              afterEach(function(){
                this.clock.restore();
        	_startTime = 0;
        	_elapse = 0;
              });
          });
      };
      return runTests;
  };

  return {
      doStartElapseTests : doStartElapseTests
  };
})();
