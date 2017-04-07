(function() {
    'use strict';

    angular
        .module('vpsapp.service')
        .controller('ServiceCtrl', ServiceCtrl);

    ServiceCtrl.$inject = ['$rootScope', '$scope', '$state'];

    function ServiceCtrl($rootScope, $scope, $state) {

      $rootScope.isHome = false;
      $scope.car = $rootScope.car;

      $scope.services = [
        {
          type: 'Repair engine',
          date: '03/01/2017'
        },
        {
          type: 'Replace lamp',
          date: '03/03/2017'
        }
      ];

      $scope.diagnostics = [
        {
          code: 'ERR-10013',
          description: 'Engine error'
        },
        {
          code: 'ERR-10045',
          description: 'Lamp error'
        }
      ];

      $scope.goBack = function() {
        $state.go('app.home');
      }

      $scope.bookService = function() {
        
      }
    }
})();
