define(['angular','timbre'],function(angular,timbre){
  'use strict';
  
  var services_module = angular.module('pomodoro.services',[]);
  
  services_module.factory('timeConvertService',[function(){
      function getMillisFromInput(inputHours,inputMins,inputSecs){
	      var hoursMillis = 0;
	      var minuteMillis = 0;
	      var secMillis = 0;
	      if(!(inputHours === null || inputHours === undefined)){
		      hoursMillis = inputHours*60*60*1000;
	      }
	      if(!(inputMins === null || inputMins === undefined)){
		      minuteMillis = inputMins*60*1000;
	      }
	      if(!(inputSecs === null || inputSecs === undefined)){
		      secMillis = inputSecs*1000;
	      }
	      return hoursMillis + minuteMillis + secMillis;
      }
      return {
          getMillisFromInput : getMillisFromInput
      };
    }
  ]);
  
  services_module.factory('soundService',[function(){
      var pluckC = timbre('pluck',{freq:261.626,mul:1.0});
      var pluckE = timbre('pluck',{freq:391.995,mul:1.0});
      var pluckG = timbre('pluck',{freq:329.628,mul:1.0});
      function playTimerFinishedSound(){
                pluckC.bang().play();
                pluckE.bang().play();
                pluckG.bang().play();
      }
      return {
          playTimerFinishedSound : playTimerFinishedSound
      };
    }
  ]);


});

