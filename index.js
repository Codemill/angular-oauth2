'use strict';

angular.module('codemill.oauth2', [])
  .service('cmOauth2PasswordService', ['Oauth2', '$http', '$log', function (config, $http, $log) {
    this.login = function (username, password) {
      var data = 'grant_type=password&client_id=' + config.password.clientId + '&username=' + username + '&password=' + password;
      return $http.post(config.password.uri, data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          $log.error('Failed auth request', response);
          if (response.data === null || response.data === undefined) {
            throw 'Failed contacting authentication server';
          }
          switch (response.data.error_description) {
            case 'NotFound' :
              throw 'User not found';
            case 'BadRequest':
              throw 'Wrong password';
            default :
              throw 'Login failed for unknown reason';
          }
        });
    };
  }]);
