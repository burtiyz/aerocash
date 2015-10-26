/**
 * Created by marius on 26/10/15.
 */
(function () {
  'use strict';

  angular.module('aerocashApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('template', {
          abstract: true,
          templateUrl: 'app/pages/template/template.html'
        });
    });
})();
