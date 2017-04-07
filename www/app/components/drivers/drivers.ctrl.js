(function() {
    'use strict';

    angular
        .module('vpsapp.drivers')
        .controller('DriversCtrl', DriversCtrl);

    DriversCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicModal'];

    function DriversCtrl($rootScope, $scope, $state, $ionicModal) {

      $rootScope.isHome = false;
      $scope.car = $rootScope.car;

      $scope.owner = {
        id: 1,
        name: 'Oleg Cherkasskiy',
        key: '',
        password: ''
      };

      $scope.drivers = [
        {
          id: 2,
          expires: '03/01/2017',
          name: 'Alex Kolonistky'
        },
        {
          id: 3,
          expires: '01/03/2017',
          name: 'Boris Aksyonov'
        }
      ];

      $ionicModal.fromTemplateUrl('app/components/drivers/owner-change.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.ownerModal = modal;
      });

      $ionicModal.fromTemplateUrl('app/components/drivers/driver-add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.driverModal = modal;
      });

      $scope.goBack = function() {
        $state.go('app.home');
      }

      // Owner modal
      $scope.changeOwner = function() {
        $scope.ownerModal.show();
      }

      $scope.closeOwner = function() {
        $scope.ownerModal.hide();
      }

      $scope.transfer = function() {
        $scope.ownerModal.hide();
      }

      // Driver modal
      $scope.addDriver = function() {
        $scope.driverModal.show();
      }

      $scope.closeDriver = function() {
        $scope.driverModal.hide();
      }

      $scope.save = function() {
        $scope.driverModal.hide();
      }

      $scope.deleteDriver = function() {
        $rootScope.showConfirm('Confirm', 'You are going to delete the driver.', function() {
          console.log('showConfirm -- callback');
        });
      }
    }
})();
