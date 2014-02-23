define(['angularMocks'],function(angularMocks){
  describe('directives', function() {
    beforeEach(angularMocks.module('pomodoro.directives'));
    'use strict';
  /*  describe('app-version', function() {
      it('should print current version', function() {
        module(function($provide) {
          $provide.value('version', 'TEST_VER');
        });
        inject(function($compile, $rootScope) {
          var element = $compile('<span app-version></span>')($rootScope);
          expect(element.text()).toEqual('TEST_VER');
        });
      });
    });
  
    describe('countdown', function() {
    beforeEach(module('pomodoro.directives'));
  
      it('should display 00:00:00 for property set to 0', function() {
        inject(function($compile, $rootScope) {
          var element = $compile('<span countdown=0></span>')($rootScope);
  	$rootScope.$digest();
          expect(element.text()).toEqual('00:00:00');
        });
      });
  
      it('should display 00:25:00 for property set to 1500000', function() {
        inject(function($compile, $rootScope) {
          var element = $compile('<span countdown=1500000></span>')($rootScope);
  	$rootScope.$digest();
  	//1 second to do digest and so forth?
          expect(element.text() === '00:24:59' || element.text() === '00:25:00'  ).toEqual(true);
        });
      });
  
      it('should display 00:15:00 for property set to 900000', function() {
        inject(function($compile, $rootScope) {
          var element = $compile('<span countdown=900000></span>')($rootScope);
  	$rootScope.$digest();
          expect(element.text()).toEqual('00:15:00');
        });
      });
  
      it('should display 00:05:00 for property set to 300000', function() {
        inject(function($compile, $rootScope) {
          var element = $compile('<span countdown=300000></span>')($rootScope);
  	$rootScope.$digest();
          expect(element.text()).toEqual('00:05:00');
        });
      });
  
  
   
    });
  */
  });
});
