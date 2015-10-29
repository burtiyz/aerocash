/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';

  angular.module('aerocashApp.payment')
    .config(function ($stateProvider) {
      $stateProvider
        .state('template.hstPayment', {
          url: '/payment/history',
          template: '<hst-payment></hst-payment>'
        });
    });
})();
