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

      $scope.code = {
        oid: '',
        otp: ''
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

      $ionicModal.fromTemplateUrl('app/components/profile/otpcode.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.otpModal = modal;
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
                $scope.closePinModal();
              }
            },
            function(error) {
              $ionicLoading.hide();
              $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
            }
          );

        })
        .catch(function(error) {
          $ionicLoading.hide();
        });
      }

      // Password modal
      $scope.changePassword = function() {
        $scope.password.current = '';
        $scope.password.new = '';
        $scope.password.confirm = '';

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
                $scope.closePasswordModal();
              }
            },
            function(error) {
              $ionicLoading.hide();
              $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
            }
          );
        })
        .catch(function(error) {
          $ionicLoading.hide();
        });
      }

      // Otp Code
      $scope.showOtpModal = function() {
        $scope.otpModal.show();
      }

      $scope.closeOtpModal = function() {
        $scope.otpModal.hide();
      }

      $scope.getCode = function() {
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

          Profile.getCode(oid, signature).then(
            function(response) {
              $ionicLoading.hide();

              if (response.Code != 0) {
                var message = Error.getDescription(response.Code);
                $rootScope.showAlert('Error', message);
                return;
              } else {
                $scope.code.oid = oid;
                $scope.code.otp = response.OTPCode;
                $scope.showOtpModal();
              }
            },
            function(error) {
              $ionicLoading.hide();
              $rootScope.showAlert('Error', 'The request failed. Please check network connection.');
            }
          );
        })
        .catch(function(error) {
          $ionicLoading.hide();
        });
      }
    }
})();
