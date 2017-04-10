(function() {
    'use strict';

    angular
        .module('vpsapp.base')
        .controller('MenuCtrl', MenuCtrl);

    MenuCtrl.$inject = ['$rootScope', '$scope', '$state', 'SecureStorage'];

    function MenuCtrl($rootScope, $scope, $state, SecureStorage) {
      console.log("MenuCtrl");

      $scope.logout = function() {
        SecureStorage.init()
         .then(function() {
           return SecureStorage.remove('token');
         })
         .then(function() {
           return SecureStorage.remove('oid');
         })
         .then(function() {
           return SecureStorage.remove('alias');
         })
         .then(function() {
           // goto login page
           $state.go('login');
         })
         .catch(function(error) {
           console.log(error);
           $state.go('login');
         });
      }
    }
})();
