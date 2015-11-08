'use strict';

angular.module('aerocashApp')
  .controller('SettingsCtrl', function ($scope, $state, User, Auth) {
    $scope.errors = {};

    $scope.ingToken = Auth.getCurrentUser().ingToken;

    $scope.changeSettings = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        if ($scope.user.oldPassword || $scope.user.newPassword) {
          Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
            .then(function () {
              $scope.message = 'Settings successfully changed.';
            })
            .catch(function () {
              form.password.$setValidity('password', false);
              $scope.errors.other = 'Incorrect password';
              $scope.message = '';
            });
        }
        if ($scope.user.ingToken) {
          Auth.linkUser($scope.user.ingToken)
            .then(function () {
              $state.reload();
            })
            .catch(function () {
              form.ingToken.$setValidity('ingToken', false);
              $scope.errors.other = 'Invalid token';
              $scope.message = '';
            })
        }
      }
    };
  });
