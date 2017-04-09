(function() {
    'use strict';

    angular
        .module('vpsapp.base')
        .controller('TabsCtrl', TabsCtrl);

    TabsCtrl.$inject = ['$rootScope', '$scope', '$state'];

    function TabsCtrl($rootScope, $scope, $state) {
      console.log("TabsCtrl");      
    }
})();
