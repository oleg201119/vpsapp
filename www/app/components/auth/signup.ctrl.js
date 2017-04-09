(function() {
    'use strict';

    angular.module('vpsapp.auth').controller('SignupStep1Ctrl', SignupStep1Ctrl);
    angular.module('vpsapp.auth').controller('SignupStep2Ctrl', SignupStep2Ctrl);
    angular.module('vpsapp.auth').controller('SignupStep3Ctrl', SignupStep3Ctrl);
    angular.module('vpsapp.auth').controller('SignupStep4Ctrl', SignupStep4Ctrl);

    SignupStep1Ctrl.$inject = ['$rootScope', '$scope', '$state', 'Countries', 'Auth'];
    SignupStep2Ctrl.$inject = ['$rootScope', '$scope', '$state', 'Questions', 'Auth'];
    SignupStep3Ctrl.$inject = ['$rootScope', '$scope', '$state', 'Auth'];
    SignupStep4Ctrl.$inject = ['$rootScope', '$scope', '$state', '$ionicLoading', 'Auth', 'SecureStorage', 'Error'];

    function SignupStep1Ctrl($rootScope, $scope, $state, Countries, Auth) {

      $scope.countries = Countries.data;

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
          $rootScope.showAlert('Error', 'Please check email and confirm email');
          return false;
        }

        if (step == 'step-1' && $scope.auth.licenseNo != $scope.auth.licenseNo2) {
          $rootScope.showAlert('Error', 'Please check licenseNo and confirm licenseNo');
          return false;
        }

        return true;
      }
    }

    function SignupStep2Ctrl($rootScope, $scope, $state, Questions, Auth) {

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

    function SignupStep3Ctrl($rootScope, $scope, $state, Auth) {

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
          $rootScope.showAlert('Error', 'Please check password and confirm password');
          return false;
        }

        if (step == 'step-3' && $scope.auth.normalPin != $scope.auth.normalPin2) {
          $rootScope.showAlert('Error', 'Please check Normal PIN and Confirm Normal PIN');
          return false;
        }

        if (step == 'step-3' && $scope.auth.blockPin != $scope.auth.blockPin2) {
          $rootScope.showAlert('Error', 'Please check Block PIN and Confirm Block PIN');
          return false;
        }

        return true;
      }
    }

    function SignupStep4Ctrl($rootScope, $scope, $state, $ionicLoading, Auth, SecureStorage, Error) {

      $scope.checked = false;

      $scope.check = function() {
        $scope.checked = !$scope.checked;
      }

      $scope.signup_step_4 = function() {
        $ionicLoading.show();

        Auth.register().then(function(response) {

          if (response.Code != 0) {
            $ionicLoading.hide();

            var message = Error.getDescription(response.Code);
            $rootScope.showAlert('Error', message);
            return;
          }

          // Store token, oid and alias to secure SecureStorage
          SecureStorage.init()
          .then(function() {
            return SecureStorage.set('token', response.Token);
          })
          .then(function() {
            return SecureStorage.set('oid', response.OID);
          })
          .then(function() {
            return SecureStorage.set('alias', response.Alias);
          })
          .then(function() {
            $ionicLoading.hide();
            $state.go('app.home');
          })
          .catch(function(error) {
            $ionicLoading.hide();
          });

        }).catch(function(error) {
          $ionicLoading.hide();
        });
      }
    }

})();
