(function() {
    'use strict';

    angular
        .module('vpsapp.auth')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state', '$ionicLoading', 'Auth'];

    function LoginCtrl($scope, $state, $ionicLoading, Auth) {

      $scope.auth = {
        email: 'oleg201119@yandex.com',
        password: '123456789'
      };

      $scope.login = function() {
        $ionicLoading.show();
        Auth.login($scope.auth.email, $scope.auth.password).then(
          function(response) {
            $ionicLoading.hide();
            $state.go('app.home');
          },
          function(error) {
            $ionicLoading.hide();
            console.log(error);
            $state.go('app.home');
          }
        );
      }

      $scope.signup = function() {
        $state.go('signup-step-1');
      }
    }
})();
