'use strict';

describe('Controller: SubmitPaymentDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('aerocashApp'));

  var SubmitPaymentDetailsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitPaymentDetailsCtrl = $controller('SubmitPaymentDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
