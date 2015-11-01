/**
 * Created by marius on 30/10/15.
 */
angular.module('aerocashApp')
  .factory('Customer', ['restBasePath', '$resource', function (restBasePath, $resource) {
    var customerResource = $resource(restBasePath + 'customerInfos/:path/:id');

    return {
      getByUserId: function (userId, callback) {
        customerResource.get({path: 'user', id: userId}, callback);
      }
    }
  }]);
