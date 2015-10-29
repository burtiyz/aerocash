'use strict';

angular.module('aerocashApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myroute', {
        url: 'y',
        templateUrl: '../y/myroute/myroute.html',
        controller: 'MyrouteCtrl'
      });
  });