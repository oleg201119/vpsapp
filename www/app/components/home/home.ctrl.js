(function() {
    'use strict';

    angular
        .module('vpsapp.home')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicLoading', '$ionicModal', '$ionicPopup', 'Auth', 'Device', 'Config', 'Utils', 'SecureStorage'];

    function HomeCtrl($rootScope, $scope, $state, $ionicLoading, $ionicModal, $ionicPopup, Auth, Device, Config, Utils, SecureStorage) {

      $scope.alias = '';
      $scope.pin = {
        current: ''
      };

      $scope.pinModal = null;

      // PIN modal
      $ionicModal.fromTemplateUrl('app/components/home/pin-input.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.pinModal = modal;
      });

      $scope.showPinModal = function() {
        $scope.pinModal.show();
      }

      $scope.closePinModal = function() {
        $scope.pinModal.hide();
      }

      $scope.enterPin = function() {
        var json_obj = null;

        SecureStorage.get('token').then(function(tokenVal) {

          console.log('Token: ' + tokenVal);
          console.log('PIN: ' + $scope.pin.current);

          // Cert1
          json_obj = Utils.decryptCert($scope.device.Cert1, tokenVal, $scope.pin.current);

          if (json_obj === false) {
            console.log('Decryption faild for Cert1');

            // Cert2
            json_obj = Utils.decryptCert($scope.device.Cert2, tokenVal, $scope.pin.current);

            if (json_obj === false) {
              console.log('Decryption faild for Cert2');

              // Error pin
              var alertPopup = $ionicPopup.alert({
                title: 'Incorrect PIN!',
                template: 'Enter another PIN'
              });

              alertPopup.then(function(res) {
                $scope.pin.current = '';
              });

              return;
            }
          }

          // Got json
          $scope.closePinModal();

          console.log(json_obj);

          var current_date = new Date();
          var year = current_date.getFullYear();
          var month = current_date.getMonth() + 1;
          var day = current_date.getDate();

          var date_str = year + '-' +  (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
          console.log(date_str);

          var key_for_date = json_obj[date_str];
          console.log(key_for_date);

          $rootScope.key = key_for_date;
          $state.go('tab.fob');

        }).catch(function(error) {

        });
      }

      $scope.init = function() {
        // Get alias
        SecureStorage.get('alias').then(
          function(alias) {
            $scope.alias = alias;
            $rootScope.devices = [];
            $scope.getDevices();
          },
          function(error) {
          }
        );
      }

      $scope.selectDevice = function(index) {
        $rootScope.device = $rootScope.devices[index];
        $scope.showPinModal();
      }

      $scope.notifications = function() {
        $state.go('app.notifications');
      }

      $scope.getDevices = function() {
        $ionicLoading.show();

        Device.getDevices().then(
          function(response) {
            $ionicLoading.hide();
            $rootScope.devices = response.Devices;
          },
          function(error) {
            $ionicLoading.hide();
          }
        );
      }

      $scope.getDeviceImage = function(device) {
        return Device.getDeviceIamge(device.MakeId);
      }

      $scope.refresh = function() {
        $scope.getDevices();
      }

      // Init
      $scope.init();
    }
})();
