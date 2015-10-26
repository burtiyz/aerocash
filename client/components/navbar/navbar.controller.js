'use strict';

angular.module('aerocashApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
      {
        'title': 'Home',
        'link': '/'
      },
      {
        'title': 'Payment',
        'loggedIn': true,
        'link': '/payment',
        'submenu': [
          {
            title: 'New',
            'link': '/payment/new',
            'loggedIn': true
          }
        ]
      }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function (route) {
      if (route === '/') {
        return $location.path() === '/';
      }
      return $location.path().slice(1).indexOf(route.slice(1)) == 0;
    };

    $scope.isAuthorized = function (link) {
      if (link.admin && !$scope.isAdmin()) {
        return false;
      }
      if (link.loggedIn && !$scope.isLoggedIn()) {
        return false;
      }
      return true;
    }
  });
