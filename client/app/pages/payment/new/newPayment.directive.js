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
      scope: {},
      controller: ['$state', 'Navigation', 'Payment', function ($state, Navigation, Payment) {
        var _ctrl = this;
        this.model = null;

        this.save = function(){
          this.model.save(function(){
            console.log('new payment successfully created');
            Navigation.openMain();
          });
        };

        var _init = function () {
          _ctrl.model = Payment.createModel();
        };

        _init();
      }],
      controllerAs: 'payment'
    }
  });
})();
