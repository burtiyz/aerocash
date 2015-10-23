'use strict';

angular.module('aerocashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('submitPaymentDetails', {
        url: '/submitPaymentDetails',
        templateUrl: 'app/submitPaymentDetails/submitPaymentDetails.html',
        controller: 'SubmitPaymentDetailsCtrl'
      });
  });