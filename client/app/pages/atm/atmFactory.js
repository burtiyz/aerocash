/**
 * Created by marius on 14/11/15.
 */
(function () {
  'use strict';
  var app = angular.module('aerocashApp.atm');

  app.factory('Atm', ['$resource', 'restBasePath', function ($resource, restBasePath) {

    var atmResource = $resource(restBasePath + 'atm/:action/:phoneNumber/:authorizationCode');

    return {
      checkPhoneNumber: function (phoneNumber, callback) {
        return atmResource.get({action: 'check', phoneNumber: phoneNumber}, callback);
      },
      checkAuthorizationCode: function (phoneNumber, authorizationCode, callback) {
        return atmResource.get({action: 'check', phoneNumber: phoneNumber, authorizationCode: authorizationCode},
          callback);
      },
      getPaymentDetails: function (phoneNumber, authorizationCode, callback) {
        return atmResource.get({action: 'details', phoneNumber: phoneNumber, authorizationCode: authorizationCode},
          callback);
      },
      withdraw: function (phoneNumber, authorizationCode, callback) {
        return atmResource.post({action: 'withdraw', phoneNumber: phoneNumber, authorizationCode: authorizationCode},
          callback);
      }
    }
  }]);
})();
