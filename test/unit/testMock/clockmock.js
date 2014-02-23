// relies on sinon.js and angular mock $interval service
//
define([],function(){

  var elapseMillis = function(intervalMock,sinonClock,millis){
       sinonClock.tick(millis);
       intervalMock.flush(millis);
  };

  return {
      elapseMillis : elapseMillis
  };

});

