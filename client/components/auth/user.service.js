'use strict';

angular.module('aerocashApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      sync:{
        method: 'PUT',
        params: {
          controller:'link'
        }
      }
	  });
  });
