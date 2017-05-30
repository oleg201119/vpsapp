(function() {
    'use strict';

    angular
        .module('vpsapp.access')
        .controller('AccessCtrl', AccessCtrl);

    AccessCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicModal', '$ionicLoading', 'SecureStorage', 'Device'];

    function AccessCtrl($rootScope, $scope, $state, $ionicModal, $ionicLoading, SecureStorage, Device) {

      $rootScope.isHome = false;
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

      $scope.filterOwner = function(access) {
        if (access.IsOwner) {
          return false;
        }
        else {
          return true;
        }
      }

      $scope.getAccessForOwner = function() {
        var i = 0;

        for(i=0; i<$rootScope.device.Access.length; i++) {
          var access = $rootScope.device.Access[i];

          if (access.IsOwner) {
            return access;
          }
        }

        return null;
      }

      $scope.getAccessForUser = function() {
        var i = 0;

        for(i=0; i<$rootScope.device.Access.length; i++) {
          var access = $rootScope.device.Access[i];

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

            // Get devices
            Device.getDevices().then(
              function(response) {
                // Update device list
                $rootScope.devices = response.Devices;

                // Update selected device
                var i = 0;
                for(i=0; i<$rootScope.devices.length; i++) {
                  if ($rootScope.device.DID == $rootScope.devices[i].DID) {
                    $rootScope.device = $rootScope.devices[i];
                  }
                }

                $ionicLoading.hide();

                // Go to home
                $state.go('app.home');
              },
              function(error) {
                $ionicLoading.hide();
                $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
              }
            );
          },
          function(error) {
            $ionicLoading.hide();
            $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
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
            // Get devices
            Device.getDevices().then(
              function(response) {
                // Update device list
                $rootScope.devices = response.Devices;

                // Update selected device
                var i = 0;
                for(i=0; i<$rootScope.devices.length; i++) {
                  if ($rootScope.device.DID == $rootScope.devices[i].DID) {
                    $rootScope.device = $rootScope.devices[i];
                  }
                }

                $ionicLoading.hide();
              },
              function(error) {
                $ionicLoading.hide();
                $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
              }
            );
          },
          function(error) {
            $ionicLoading.hide();
            $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
          }
        );
      }

      // Remove access
      $scope.removeAccess = function(access) {
        $rootScope.showConfirm('Confirm', 'You are going to delete the access.', function() {

          $ionicLoading.show();

          Device.removeDeviceAccess($rootScope.device.DID, access.OID).then(
            function(response) {

              // Get devices
              Device.getDevices().then(
                function(response) {
                  // Update device list
                  $rootScope.devices = response.Devices;

                  // Update selected device
                  var i = 0;
                  for(i=0; i<$rootScope.devices.length; i++) {
                    if ($rootScope.device.DID == $rootScope.devices[i].DID) {
                      $rootScope.device = $rootScope.devices[i];
                    }
                  }

                  $ionicLoading.hide();
                },
                function(error) {
                  $ionicLoading.hide();
                  $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
                }
              );
            },
            function(error) {
              $ionicLoading.hide();
              $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
            }
          );

        });
      }

      $scope.init();
    }
})();
