/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.navigation', []);

  app.factory('Navigation', ['$state', function ($state) {

    return {
      openMain: function () {
        $state.go('main');
      },
      openMyPayments: function () {
        $state.go('template.hstPayment');
      }
    }
  }]);
})();
