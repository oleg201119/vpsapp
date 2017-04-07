(function() {
    'use strict';

    angular
        .module('vpsapp.base')
        .controller('MenuCtrl', MenuCtrl);

    MenuCtrl.$inject = ['$rootScope', '$scope', '$state'];

    function MenuCtrl($rootScope, $scope, $state) {
      console.log("MenuCtrl");

      $scope.logout = function() {
        
      }
    }
})();
