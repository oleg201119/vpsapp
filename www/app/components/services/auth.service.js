(function() {
    'use strict';

    angular
        .module('vpsapp.services')
        .factory('Auth', Auth);

    Auth.$inject = ['$http', '$q', 'Config'];

    function Auth($http, $q, Config) {

      var service = {};

      service.data = {
        // Step-1
        email: '',
        birth: new Date(),
        alias: '',
        licenseNo: '',
        country: '',

        // Step-2
        securityQuestion1: 0,
        securityAnswer1: '',
        securityQuestion2: 0,
        securityAnswer2: '',
        securityQuestion3: 0,
        securityAnswer3: '',

        // Step-3
        password: '',
        normalPin: '',
        blockPin: ''
      };

      service.setStep1 = function(email, birth, alias, licenseNo, country) {
        service.data.email = email;
        service.data.birth = birth;
        service.data.alias = alias;
        service.data.licenseNo = licenseNo;
        service.data.country = country;
      }

      service.setStep2 = function(question1, answer1, question2, answer2, question3, answer3) {
        service.data.securityQuestion1 = question1;
        service.data.securityAnswer1 = answer1;
        service.data.securityQuestion2 = question2;
        service.data.securityAnswer2 = answer2;
        service.data.securityQuestion3 = question3;
        service.data.securityAnswer3 = answer3;
      }

      service.setStep3 = function(password, normalPin, blockPin) {
        service.data.password = password;
        service.data.normalPin = normalPin;
        service.data.blockPin = blockPin;
      }

      service.get = function() {
        return service.data;
      }

      service.register = function() {
        var deferred = $q.defer();

        var url = Config.BASE_URL + 'register';
        var config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

        var data = {
          Email: service.data.email,
          Alias: service.data.alias,
          DateOfBirth: service.data.birth,
          DriverLicenseNo: service.data.licenseNo,
          CountryOfIssue: service.data.country,
          SecurityQuestion1: service.data.securityQuestion1,
          SecurityAnswer1: service.data.securityAnswer1,
          SecurityQuestion2: service.data.securityQuestion2,
          SecurityAnswer2: service.data.securityAnswer2,
          SecurityQuestion3: service.data.securityQuestion3,
          SecurityAnswer3: service.data.securityAnswer3,
          Password: service.data.password,
          NormalPIN: service.data.normalPin,
          BlockingPIN: service.data.blockPin
        };

        console.log(data);

        $http.post(url, data, config)
          .success(function(response) {
            console.log(response);
            deferred.resolve(response);
          })
          .error(function(error) {
            console.log(error);
            deferred.reject(error);
          });

        return deferred.promise;
      }

      service.login = function(email, password) {
        var deferred = $q.defer();

        var url = Config.BASE_URL + 'login';
        var urlParams = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);

        url = url + '?' + urlParams;

        var config = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        };

        $http.get(url, config)
          .success(function(response) {
            console.log(response);
            deferred.resolve(response);
          })
          .error(function(error) {
            console.log(error);
            deferred.reject(error);
        });

        return deferred.promise;
      }

      return service;
    }
})();
