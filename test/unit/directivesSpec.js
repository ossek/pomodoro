'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('pomodoro.directives'));

  describe('app-version', function() {
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
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span countdown=0></span>')($rootScope);
	$rootScope.$digest();
	console.log(element);
        expect(element.text()).toEqual('00:00:00');
      });
    });
    it('should display 00:25:00 for property set to 1500000', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span countdown=1500000></span>')($rootScope);
	$rootScope.$digest();
	console.log(element);
        expect(element.text()).toEqual('00:25:00');
      });
    });
 
  });

});
