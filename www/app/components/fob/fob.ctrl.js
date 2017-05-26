(function() {
    'use strict';

    angular
        .module('vpsapp.fob')
        .controller('FobCtrl', FobCtrl);

    FobCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicModal', '$ionicPopup', 'Utils', 'SecureStorage'];

    function FobCtrl($rootScope, $scope, $state, $ionicModal, $ionicPopup, Utils, SecureStorage) {

      $rootScope.isHome = false;
      $scope.device = $rootScope.device;

      $scope.state = {
        lock: true,
        boot: false,
        engine: false,
        roof: false
      };

      // Initialize
      $scope.init = function() {

      }

      // Show / Hide buttons
      $scope.shButton = function(optionNumber) {
        for(var i=0; i<$scope.device.Options.length; i++) {
          if ($scope.device.Options[i] === optionNumber)
            return true;
        }

        return false;
      }

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

      // Init
      $scope.init();
    }
})();
