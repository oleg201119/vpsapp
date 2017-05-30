(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Device', Device);

    Device.$inject = ['$http', '$q', 'Config', 'Utils', 'SecureStorage'];

    function Device($http, $q, Config, Utils, SecureStorage) {

      var service = {};

      // Get Devices
      service.getDevices = function() {
        var deferred = $q.defer();

        var oid = '';
        var token = '';
        var signature = '';

        SecureStorage.get('oid')
        .then(function(oidVal) {
          oid = oidVal;
          return SecureStorage.get('token');
        })
        .then(function(tokenVal) {
          token = tokenVal;
          signature = Utils.getVPSSignature(oid, token, Config.API_KEY);

          var url = Config.BASE_URL + 'requestDevice';
          var config = {
            headers: {
              'X-VPS-OID': oid,
              'X-VPS-Signature': signature,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          };

          $http.get(url, config)
            .success(function(response) {
              console.log(response);

              // Store devices into secure storage
              var strForDevices = JSON.stringify(response.Devices);

              SecureStorage.init()
              .then(function() {
                return SecureStorage.set('devices', strForDevices);
              })
              .then(function() {
                deferred.resolve(response);
              })
              .catch(function(error) {
                deferred.resolve(response);
              });
            })
            .error(function(err) {
              console.log(err);
              deferred.reject(err);
          });
        })
        .catch(function(err) {
          console.log(err);
          deferred.reject(err);
        });

        return deferred.promise;
      }

      // Remove Device Access
      service.removeDeviceAccess = function(device_id, owner_id) {

        var deferred = $q.defer();

        var oid = '';
        var token = '';
        var signature = '';

        SecureStorage.get('oid')
        .then(function(oidVal) {
          oid = oidVal;
          return SecureStorage.get('token');
        })
        .then(function(tokenVal) {
          token = tokenVal;
          signature = Utils.getVPSSignature(oid, token, Config.API_KEY);

          var url = Config.BASE_URL + 'removeDeviceAccess';
          var headers = {
            'X-VPS-OID': oid,
            'X-VPS-Signature': signature,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          };

          var data = {
            DeviceID: device_id,
            OwnerID: owner_id
          };

          $http({
              url: url,
              method: 'DELETE',
              data: data,
              headers: headers
          })
          .then(function(response) {
              console.log(response.data);
              deferred.resolve(response);
          }, function(err) {
              console.log(err);
              deferred.reject(err);
          });
        })
        .catch(function(err) {
          console.log(err);
          deferred.reject(err);
        });

        return deferred.promise;
      }

      // Grant Device Access
      service.grantDeviceAccess = function(device_id, owner_id, expires, pin, otp, grant) {

        var deferred = $q.defer();

        var oid = '';
        var token = '';
        var signature = '';

        SecureStorage.get('oid')
        .then(function(oidVal) {
          oid = oidVal;
          return SecureStorage.get('token');
        })
        .then(function(tokenVal) {
          token = tokenVal;
          signature = Utils.getVPSSignature(oid, token, Config.API_KEY);

          var url = Config.BASE_URL + 'grantDeviceAccess';
          var config = {
            headers: {
              'X-VPS-OID': oid,
              'X-VPS-Signature': signature,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          };

          var data = {
            DeviceID: device_id,
            OwnerID: owner_id,
            Expires: expires,
            PIN: pin,
            OTPCode: otp,
            CanGrantAccess: grant
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
        })
        .catch(function(err) {
          console.log(err);
          deferred.reject(err);
        });

        return deferred.promise;
      }

      // Change Device Owner
      service.changeDeviceOwner = function(device_id, owner_id, pin, otp) {

        var deferred = $q.defer();

        var oid = '';
        var token = '';
        var signature = '';

        SecureStorage.get('oid')
        .then(function(oidVal) {
          oid = oidVal;
          return SecureStorage.get('token');
        })
        .then(function(tokenVal) {
          token = tokenVal;
          signature = Utils.getVPSSignature(oid, token, Config.API_KEY);

          var url = Config.BASE_URL + 'changeDeviceOwner';
          var config = {
            headers: {
              'X-VPS-OID': oid,
              'X-VPS-Signature': signature,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          };

          var data = {
            DeviceID: device_id,
            OwnerID: owner_id,
            PIN: pin,
            OTPCode: otp
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
        })
        .catch(function(err) {
          console.log(err);
          deferred.reject(err);
        });

        return deferred.promise;
      }

      // Get Device Image
      service.getDeviceIamge = function(makeId) {

        var imageUrl = '';

        switch(makeId) {
          case 1:
            imageUrl = 'img/car-bmw.png';
            break;
          case 2:
            imageUrl = 'img/car-chevrolet.png';
            break;
          case 3:
            imageUrl = 'img/car-ford.png';
            break;
          case 4:
            imageUrl = 'img/car-gmc.png';
            break;
          case 5:
            imageUrl = 'img/car-toyota.png';
            break;
          case 6:
            imageUrl = 'img/car-benz.jpg';
            break;
          default:
            imageUrl = 'img/car-benz.jpg';
            break;
        }

        return imageUrl;
      }

      return service;
    }
})();
