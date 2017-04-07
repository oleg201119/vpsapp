(function() {
    'use strict';

    angular
        .module('vpsapp.base')
        .controller('TabsCtrl', TabsCtrl);

    TabsCtrl.$inject = ['$rootScope', '$scope', '$state'];

    function TabsCtrl($rootScope, $scope, $state) {
      console.log("TabsCtrl");
      // $rootScope.$watch('isHome', function(){
      //       $scope.tabRefresh = !$rootScope.isHome ? 'hiddenTab' : '';
      //       $scope.tabNotifications = !$rootScope.isHome ? 'hiddenTab' : '';
      //       $scope.tabProfile = !$rootScope.isHome ? 'hiddenTab' : '';
      //
      //       $scope.tabFob = $rootScope.isHome ? 'hiddenTab' : '';
      //       $scope.tabService = $rootScope.isHome ? 'hiddenTab' : '';
      //       $scope.tabDrivers = $rootScope.isHome ? 'hiddenTab' : '';
      //       $scope.tabPanic = $rootScope.isHome ? 'hiddenTab' : '';
      //       $scope.tabMode = $rootScope.isHome ? 'hiddenTab' : '';
      //   });
    }
})();
