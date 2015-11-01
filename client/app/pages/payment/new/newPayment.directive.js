/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.payment');

  app.directive('newPayment', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/pages/payment/new/newPayment.html',
      scope: {},
      controller: ['Auth', 'Navigation', 'Payment', 'Customer', function (Auth, Navigation, Payment, Customer) {
        var _ctrl = this;
        this.model = null;
        this.accounts = [];

        this.save = function () {
          this.model.save(function () {
            console.log('new payment successfully created');
            Navigation.openMyPayments();
          });
        };

        function _init() {
          _ctrl.model = Payment.create(Auth.getCurrentUser()._id);
          Customer.getByUserId(Auth.getCurrentUser()._id, function (customer) {
            _.forEach(customer.accountInfo, function (account) {
              _ctrl.accounts.push(account);
            });
          });
        }

        _init();
      }],
      controllerAs: 'payment'
    }
  });
})();
