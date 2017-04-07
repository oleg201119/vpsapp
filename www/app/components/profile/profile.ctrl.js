(function() {
    'use strict';

    angular
        .module('vpsapp.profile')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$state', '$ionicModal', '$ionicLoading', 'Profile'];

    function ProfileCtrl($scope, $state, $ionicModal, $ionicLoading, Profile) {
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
        Profile.changePin($scope.pin.current, $scope.pin.new).then(
          function(response) {
            $ionicLoading.hide();
            $scope.pinModal.hide();
          },
          function(error) {
            $ionicLoading.hide();
            $scope.pinModal.hide();
          }
        );
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
        Profile.changePassword($scope.password.current, $scope.password.new).then(
          function(response) {
            $ionicLoading.hide();
            $scope.passwordModal.hide();
          },
          function(error) {
            $ionicLoading.hide();
            $scope.passwordModal.hide();
          }
        );        
      }
    }
})();
