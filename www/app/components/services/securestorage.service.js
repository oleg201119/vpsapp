(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('SecureStorage', SecureStorage);

    SecureStorage.$inject = ['$q'];

    function SecureStorage($q) {

      var service = {};

      service.init = function() {
        var deferred = $q.defer();

        var ss = new cordova.plugins.SecureStorage(
          function () {
            console.log('SecureStorage init: Success');
            service.ss = ss;
            deferred.resolve(ss);
          },
          function (error) {
            console.log('Error ' + error);
            deferred.reject(error);
          },
          'vpsapp'
        );

        return deferred.promise;
      }

      service.set = function(key, val) {
        var deferred = $q.defer();

        service.ss.set(
          function (key) {
            console.log('Set ' + key);
            deferred.resolve(key);
          },
          function (error) {
            console.log('Error ' + error);
            deferred.reject(error);
          },
          key, val
        );

        return deferred.promise;
      }

      service.get = function(key) {
        var deferred = $q.defer();

        service.ss.get(
          function (value) {
            console.log('Success, got ' + value);
            deferred.resolve(value);
          },
          function (error) {
            console.log('Error ' + error);
            deferred.reject(error);
          },
          key
        );

        return deferred.promise;
      }

      service.remove = function(key) {
        var deferred = $q.defer();

        service.ss.remove(
          function (key) {
            console.log('Removed ' + key);
            deferred.resolve(key);
          },
          function (error) {
            console.log('Error, ' + error);
            deferred.reject(error);
          },
          key
        );

        return deferred.promise;
      }

      return service;
    }
})();
