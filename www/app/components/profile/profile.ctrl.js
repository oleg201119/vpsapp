(function() {
    'use strict';

    angular
        .module('vpsapp.profile')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicModal', '$ionicLoading', 'Profile', 'SecureStorage', 'Config', 'Utils', 'Error'];

    function ProfileCtrl($rootScope, $scope, $state, $ionicModal, $ionicLoading, Profile, SecureStorage, Config, Utils, Error) {
      $scope.password = {
        current: '',
        new: '',
        confirm: ''
      };

      $scope.pin = {
        current: '',
        new: '',
        confirm: ''
      };

      $ionicModal.fromTemplateUrl('app/components/profile/password-change.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.passwordModal = modal;
      });

      $ionicModal.fromTemplateUrl('app/components/profile/pin-change.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.pinModal = modal;
      });

      // Pin modal
      $scope.changePin = function() {
        $scope.pinModal.show();
      }

      $scope.closePinModal = function() {
        $scope.pinModal.hide();
      }

      $scope.savePin = function() {
        $ionicLoading.show();

        var oid = '';
        var token = '';
        var signature = '';

        SecureStorage.get('oid')
        .then(function(oidVal) {
          oid = oidVal;
          return SecureStorage.get('token');
        })
        .then(function(tokenVal) {
          token = tokenVal;
          signature = Utils.getVPSSignature(oid, token, Config.API_KEY);

          Profile.changePin($scope.pin.current, $scope.pin.new, oid, signature).then(
            function(response) {
              $ionicLoading.hide();

              if (response.Code != 0) {
                var message = Error.getDescription(response.Code);
                $rootScope.showAlert('Error', message);
                return;
              } else {
                $scope.pinModal.hide();
              }
            },
            function(error) {
              $ionicLoading.hide();
            }
          );

        })
        .catch(function(error) {
          $ionicLoading.hide();
        });
      }

      // Password modal
      $scope.changePassword = function() {
        $scope.passwordModal.show();
      }

      $scope.closePasswordModal = function() {
        $scope.passwordModal.hide();
      }

      $scope.savePassword = function() {
        $ionicLoading.show();

        var oid = '';
        var token = '';
        var signature = '';

        SecureStorage.get('oid')
        .then(function(oidVal) {
          oid = oidVal;
          return SecureStorage.get('token');
        })
        .then(function(tokenVal) {
          token = tokenVal;
          signature = Utils.getVPSSignature(oid, token, Config.API_KEY);

          Profile.changePassword($scope.password.current, $scope.password.new, oid, signature).then(
            function(response) {
              $ionicLoading.hide();

              if (response.Code != 0) {
                var message = Error.getDescription(response.Code);
                $rootScope.showAlert('Error', message);
                return;
              } else {
                $scope.pinModal.hide();
              }
            },
            function(error) {
              $ionicLoading.hide();
            }
          );
        })
        .catch(function(error) {
          $ionicLoading.hide();
        });
      }
    }
})();
