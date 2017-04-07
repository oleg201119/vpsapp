(function() {
    'use strict';

    angular.module('vpsapp.auth').controller('SignupStep1Ctrl', SignupStep1Ctrl);
    angular.module('vpsapp.auth').controller('SignupStep2Ctrl', SignupStep2Ctrl);
    angular.module('vpsapp.auth').controller('SignupStep3Ctrl', SignupStep3Ctrl);
    angular.module('vpsapp.auth').controller('SignupStep4Ctrl', SignupStep4Ctrl);

    SignupStep1Ctrl.$inject = ['$scope', '$state', '$ionicPopup', 'Countries', 'Questions', 'Auth'];
    SignupStep2Ctrl.$inject = ['$scope', '$state', '$ionicPopup', 'Countries', 'Questions', 'Auth'];
    SignupStep3Ctrl.$inject = ['$scope', '$state', '$ionicPopup', 'Countries', 'Questions', 'Auth'];
    SignupStep4Ctrl.$inject = ['$scope', '$state', 'Auth'];

    function SignupStep1Ctrl($scope, $state, $ionicPopup, Countries, Questions, Auth) {

      $scope.countries = Countries.data;
      $scope.questions = Questions.data;
      $scope.questionTitle = "Random question";

      $scope.auth = {
        // Step-1
        email: 'test@test.com',
        email2: 'test@test.com',
        alias: 'myalias',
        birth: new Date(),
        licenseNo: '1234567890',
        licenseNo2: '1234567890',
        country: ''
      }

      $scope.signup_step_1 = function() {
        if ($scope.checkValidation('step-1')) {
          Auth.setStep1($scope.auth.email, $scope.auth.birth, $scope.auth.alias, $scope.auth.licenseNo, $scope.auth.country);
          $state.go('signup-step-2');
        }
      }

      $scope.checkValidation = function(step) {
        if (step == 'step-1' && $scope.auth.email != $scope.auth.email2) {
          $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Error',
               template: 'Please check email and confirm email'
             });

             alertPopup.then(function(res) {
               console.log('Validation error for email');
             });
           };

           $scope.showAlert();
           return false;
        }

        if (step == 'step-1' && $scope.auth.licenseNo != $scope.auth.licenseNo2) {
          $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Error',
               template: 'Please check licenseNo and confirm licenseNo'
             });

             alertPopup.then(function(res) {
               console.log('Validation error for licenseNo');
             });
           };

           $scope.showAlert();
           return false;
        }

        return true;
      }
    }

    function SignupStep2Ctrl($scope, $state, $ionicPopup, Countries, Questions, Auth) {

      $scope.questions = Questions.data;
      $scope.questionTitle = "Random question";

      $scope.auth = {
        securityQuestion1: 0,
        securityAnswer1: '',
        securityQuestion2: 0,
        securityAnswer2: '',
        securityQuestion3: 0,
        securityAnswer3: ''
      }

      $scope.signup_step_2 = function() {
        if ($scope.checkValidation('step-2')) {
          Auth.setStep2($scope.auth.securityQuestion1.code, $scope.auth.securityAnswer1, $scope.auth.securityQuestion2.code, $scope.auth.securityAnswer2, $scope.auth.securityQuestion3.code, $scope.auth.securityAnswer3);
          $state.go('signup-step-3');
        }
      }

      $scope.checkValidation = function(step) {
        return true;
      }

      $scope.isInvalidSelection = function() {
        if ($scope.auth.securityQuestion1 == 0 || $scope.auth.securityQuestion2 == 0 || $scope.auth.securityQuestion3 == 0) {
          return true;
        }

        return false;
      }
    }

    function SignupStep3Ctrl($scope, $state, $ionicPopup, Countries, Questions, Auth) {

      $scope.auth = {
        password: '',
        password2: '',
        normalPin: '',
        normalPin2: '',
        blockPin: '',
        blockPin2: ''
      }

      $scope.signup_step_3 = function() {
        if ($scope.checkValidation('step-3')) {
          Auth.setStep3($scope.auth.password, $scope.auth.normalPin, $scope.auth.blockPin);
          $state.go('signup-step-4');
        }
      }

      $scope.checkValidation = function(step) {
        if (step == 'step-3' && $scope.auth.password != $scope.auth.password2) {
          $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Error',
               template: 'Please check password and confirm password'
             });

             alertPopup.then(function(res) {
               console.log('Validation error for password');
             });
           };

           $scope.showAlert();
           return false;
        }

        if (step == 'step-3' && $scope.auth.normalPin != $scope.auth.normalPin2) {
          $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Error',
               template: 'Please check Normal PIN and Confirm Normal PIN'
             });

             alertPopup.then(function(res) {
               console.log('Validation error for normal pin');
             });
           };

           $scope.showAlert();
           return false;
        }

        if (step == 'step-3' && $scope.auth.blockPin != $scope.auth.blockPin2) {
          $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Error',
               template: 'Please check Block PIN and Confirm Block PIN'
             });

             alertPopup.then(function(res) {
               console.log('Validation error for block pin');
             });
           };

           $scope.showAlert();
           return false;
        }

        return true;
      }
    }

    function SignupStep4Ctrl($scope, $state, Auth) {
      $scope.signup_step_4 = function() {
        // TODO register
        Auth.register().then(
          function(response) {
            console.log(response);
            $state.go('app.home');
          },
          function(error) {
            console.log(error);
          }
        );
      }

      $scope.checked = false;
      $scope.check = function() {
        $scope.checked = !$scope.checked;
      }
    }

})();
