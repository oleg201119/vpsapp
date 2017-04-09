(function() {
    'use strict';

    angular
        .module('vpsapp.home')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$scope', '$state', 'Auth', 'Cars', 'SecureStorage'];

    function HomeCtrl($rootScope, $scope, $state, Auth, Cars, SecureStorage) {
      // Get alias
      SecureStorage.get('alias').then(
        function(alias) {
          $scope.alias = alias;
        },
        function(error) {
          //
        }
      );

      // Get cars
      $scope.cars = Cars.getCars();

      $scope.carSelect = function(carId) {
        $rootScope.car = Cars.getCar(carId);
        $state.go('tab.fob');
      }

      $scope.notifications = function() {
        $state.go('app.notifications');
      }

      $scope.refresh = function() {

      }
    }
})();
