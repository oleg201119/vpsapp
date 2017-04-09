(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Profile', Profile);

    Profile.$inject = ['$http', '$q', 'Config'];

    function Profile($http, $q, Config) {

      var service = {};

      service.changePin = function(currentPin, newPin, oid, signature) {
        var deferred = $q.defer();

        var url = Config.BASE_URL + 'changePIN';
        var config = {
          headers: {
            'X-VPS-OID': oid,
            'X-VPS-Signature': signature,
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

      service.changePassword = function(currentPassword, newPassword, oid, signature) {
        var deferred = $q.defer();

        var url = Config.BASE_URL + 'changePassword';
        var config = {
          headers: {
            'X-VPS-OID': oid,
            'X-VPS-Signature': signature,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

        var data = {
          CurrentPassword: currentPassword,
          NewPassword: newPassword
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

      return service;
    }
})();
