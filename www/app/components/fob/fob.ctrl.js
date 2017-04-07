(function() {
    'use strict';

    angular
        .module('vpsapp.fob')
        .controller('FobCtrl', FobCtrl);

    FobCtrl.$inject = ['$rootScope', '$scope', '$state', 'Cars'];

    function FobCtrl($rootScope, $scope, $state, Cars) {

      $rootScope.isHome = false;
      $scope.car = $rootScope.car;

      $scope.state = {
        lock: true,
        boot: false,
        engine: false,
        roof: false
      };

      $scope.revertState = function(property) {
        if (property == 'lock') {
          $scope.state.lock = !$scope.state.lock;
        }

        if (property == 'boot') {
          $scope.state.boot = !$scope.state.boot;
        }

        if (property == 'engine') {
          $scope.state.engine = !$scope.state.engine;
        }

        if (property == 'roof') {
          $scope.state.roof = !$scope.state.roof;
        }
      }

      $scope.panic = function() {

      }

      $scope.mode = function () {
        
      }

      $scope.goBack = function() {
        $state.go('app.home');
      }
    }
})();
