(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('SecureStorage', SecureStorage);

    SecureStorage.$inject = ['$q', 'Config'];

    function SecureStorage($q, Config) {

      var service = {};

      service.isInitialized = false;

      service.init = function() {
        var deferred = $q.defer();

        if (service.isInitialized && service.ss) {
          deferred.resolve(service.ss);
        } else {
          if (Config.ENV == 'dev') {
            console.log('SecureStorage init: Success');
            service.isInitialized = true;
            service.ss = [];
            deferred.resolve(service.ss);
          } else {
            var ss = new cordova.plugins.SecureStorage(
              function () {
                console.log('SecureStorage init: Success');
                service.isInitialized = true;
                service.ss = ss;
                deferred.resolve(service.ss);
              },
              function (error) {
                console.log('Error ' + error);
                deferred.reject(error);
              },
              'vpsapp'
            );
          }
        }

        return deferred.promise;
      }

      service.set = function(key, val) {
        var deferred = $q.defer();

        if (Config.ENV == 'dev') {
          console.log('Set ' + key);
          service.ss.push({key: key, value: val});
          deferred.resolve(key);
        } else {
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
        }

        return deferred.promise;
      }

      service.get = function(key) {
        var deferred = $q.defer();

        if (Config.ENV == 'dev') {
          for(var i=0; i<service.ss.length; i++) {
            if (service.ss[i].key == key) {
              var value = service.ss[i].value;

              console.log('Success, got ' + value);
              deferred.resolve(value);
              break;
            }
          }
        } else {
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
        }

        return deferred.promise;
      }

      service.remove = function(key) {
        var deferred = $q.defer();

        if (Config.ENV == 'dev') {
          for(var i=0; i<service.ss.length; i++) {
            if (service.ss[i].key == key) {
              service.ss.splice(i, 1);

              console.log('Removed ' + key);
              deferred.resolve(key);
              break;
            }
          }
        } else {
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
        }

        return deferred.promise;
      }

      return service;
    }
})();
