(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Profile', Profile);

    Profile.$inject = ['$http', '$q', 'BASE_URL', 'API_KEY'];

    function Profile($http, $q, BASE_URL, API_KEY) {

      var service = {};

      service.changePin = function(currentPin, newPin) {
        var deferred = $q.defer();
        var url = BASE_URL + 'changePIN';
        var config = {
          headers: {
            'X-VPS-OID': oid,
            'X-VPS-Signature': getVPSSignature(oid, token, API_KEY),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

        var data = {
          CurrentPIN: currentPin,
          NewPIN: newPin
        };

        $http.post(url, data, config)
          .success(function(response) {
            console.log(response);
            deferred.resolve(response);
          })
          .error(function(err) {
            console.log(err);
            deferred.reject(err);
        });

        return deferred.promise;
      }

      service.changePassword = function(currentPassword, newPassword) {
        var deferred = $q.defer();
        var url = BASE_URL + 'changePassword';
        var config = {
          headers: {
            'X-VPS-OID': oid,
            'X-VPS-Signature': getVPSSignature(oid, token, API_KEY),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

        var data = {
          CurrentPassword: currentPassword,
          NewPassword: newPassword
        };

        console.log(config);
        console.log(data);
        console.log(oid);
        console.log(token);
        console.log(API_KEY);

        $http.post(url, data, config)
          .success(function(response) {
            console.log(response);
            deferred.resolve(response);
          })
          .error(function(err) {
            console.log(err);
            deferred.reject(err);
        });

        return deferred.promise;
      }

      return service;
    }
})();
