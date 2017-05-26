(function() {
    'use strict';

    angular
        .module('vpsapp.access')
        .controller('AccessCtrl', AccessCtrl);

    AccessCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicModal', '$ionicLoading', 'SecureStorage', 'Device'];

    function AccessCtrl($rootScope, $scope, $state, $ionicModal, $ionicLoading, SecureStorage, Device) {

      $rootScope.isHome = false;
      $scope.device = $rootScope.device;
      $scope.owner_access = null;
      $scope.user_access = null;
      $scope.oid = 0;

      $scope.access_model = {
        owner_id: '',
        otp: '',
        pin: '',
        expires: '',
        grant: false
      };

      $scope.initAccessModel = function() {
        $scope.access_model.owner_id = '';
        $scope.access_model.otp = '';
        $scope.access_model.pin = '';
        $scope.access_model.expires = '';
        $scope.access_model.grant = false;
      }

      $scope.init = function() {
        $scope.owner_access = $scope.getAccessForOwner();

        SecureStorage.get('oid')
        .then(function(oidVal) {
          $scope.oid = oidVal;
          $scope.user_access = $scope.getAccessForUser();
        })
        .catch(function(error) {
        });
      }

      $scope.getAccessForOwner = function() {
        var i = 0;

        for(i=0; i<$scope.device.Access.length; i++) {
          var access = $scope.device.Access[i];

          if (access.IsOwner) {
            return access;
          }
        }

        return null;
      }

      $scope.getAccessForUser = function() {
        var i = 0;

        for(i=0; i<$scope.device.Access.length; i++) {
          var access = $scope.device.Access[i];

          if (access.OID == $scope.oid) {
            return access;
          }
        }

        return null;
      }

      $ionicModal.fromTemplateUrl('app/components/access/owner-change.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.ownerModal = modal;
      });

      $ionicModal.fromTemplateUrl('app/components/access/access-add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.accessModal = modal;
      });

      $scope.goBack = function() {
        $state.go('app.home');
      }

      // Change owner modal
      $scope.openOwnerModal = function() {
        $scope.initAccessModel();
        $scope.ownerModal.show();
      }

      $scope.closeOwnerModal = function() {
        $scope.ownerModal.hide();
      }

      $scope.transfer = function() {
        $scope.ownerModal.hide();

        $ionicLoading.show();

        Device.changeDeviceOwner($scope.device.DID, $scope.access_model.owner_id, $scope.access_model.pin, $scope.access_model.otp).then(
          function(response) {
            $ionicLoading.hide();

            // TODO refresh list
          },
          function(error) {
            $ionicLoading.hide();
          }
        );
      }

      // Add access modal
      $scope.openAddModal = function() {
        $scope.initAccessModel();
        $scope.accessModal.show();
      }

      $scope.closeAddModal = function() {
        $scope.accessModal.hide();
      }

      $scope.save = function() {
        $scope.accessModal.hide();

        $ionicLoading.show();

        Device.grantDeviceAccess($scope.device.DID, $scope.access_model.owner_id, $scope.access_model.expires, $scope.access_model.pin, $scope.access_model.otp, $scope.access_model.grant).then(        
          function(response) {
            $ionicLoading.hide();

            // TODO refresh list
          },
          function(error) {
            $ionicLoading.hide();
          }
        );
      }

      // Remove access
      $scope.removeAccess = function(access) {
        $rootScope.showConfirm('Confirm', 'You are going to delete the access.', function() {

          $ionicLoading.show();

          Device.removeDeviceAccess($scope.device.DID, access.OID).then(
            function(response) {
              $ionicLoading.hide();
              //$scope.devices = response.Devices;
            },
            function(error) {
              $ionicLoading.hide();
            }
          );

        });
      }

      $scope.init();
    }
})();
