/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.payment', []);

  app.directive('hstPayment', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/payment/history/hstPayment.html',
      scope: {},
      controller: ['Auth', 'Payment', function (Auth, Payment) {
        var _ctrl = this;
        this.payments = null;

        function _init() {
          Payment.history(Auth.getCurrentUser()._id, function(hst){
            _ctrl.payments = [];
            _.forEach(hst, function(payment){
              _ctrl.payments.push(Payment.load(payment));
            });
          });
        }

        _init();
      }],
      controllerAs: 'history'
    }
  });
})();
