(function() {
    'use strict';

    angular
        .module('vpsapp.auth')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicLoading', 'Auth', 'SecureStorage', 'Error'];

    function LoginCtrl($rootScope, $scope, $state, $ionicLoading, Auth, SecureStorage, Error) {

      $scope.auth = {
        email: 'oleg201119@yandex.com',
        password: '123456789'
      };

      $scope.login = function() {
        $ionicLoading.show();

        Auth.login($scope.auth.email, $scope.auth.password).then(function(response) {

          if (response.Code != 0) {
            $ionicLoading.hide();

            var message = Error.getDescription(response.Code);
            $rootScope.showAlert('Error', message);
            return;
          }

          // Store token, oid and alias to secure SecureStorage
          SecureStorage.init()
          .then(function() {
            return SecureStorage.set('token', response.Token);
          })
          .then(function() {
            return SecureStorage.set('oid', response.OID);
          })
          .then(function() {
            return SecureStorage.set('alias', response.Alias);
          })
          .then(function() {
            $ionicLoading.hide();
            $state.go('app.home');
          })
          .catch(function(error) {
            $ionicLoading.hide();
          });

        }).catch(function(error) {
          $ionicLoading.hide();
        });
      }

      $scope.signup = function() {
        $state.go('signup-step-1');
      }
    }
})();
