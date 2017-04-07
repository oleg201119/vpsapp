(function() {
    'use strict';

    angular
        .module('vpsapp.home')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$scope', '$state', 'Auth', 'Cars'];

    function HomeCtrl($rootScope, $scope, $state, Auth, Cars) {
      $scope.alias = Auth.getAlias();
      $rootScope.isHome = true;
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
