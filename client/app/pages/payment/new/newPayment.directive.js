/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.payment', []);

  app.directive('newPayment', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/payment/new/newPayment.html',
      scope: {}
    }
  });
})();
