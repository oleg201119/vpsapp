angular.module('underscore', [])
.factory('_', function() {
  return window._;
});

angular.module('vpsapp', [
  'ionic',
  'vpsapp.routes',
  'vpsapp.directives',
  'vpsapp.services',
  'vpsapp.config',

  'vpsapp.base',
  'vpsapp.auth',
  'vpsapp.home',
  'vpsapp.notifications',
  'vpsapp.profile',
  'vpsapp.fob',
  'vpsapp.service',
  'vpsapp.drivers',
  'vpsapp.panic',
  'vpsapp.mode',

  'underscore'
])
.constant('$ionicLoadingConfig', {
  template: '<ion-spinner icon="bubbles"></ion-spinner>'
})
.run(function($ionicPlatform, $rootScope, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // init tab mode
    $rootScope.isHome = true;

    // init seleced vehicle
    $rootScope.car = null;
  });

  $rootScope.showConfirm = function(title, message, callback) {
   var confirmPopup = $ionicPopup.confirm({
     title: title,
     template: message
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('Confirm: ' + message);
       callback();
     } else {
       console.log('Confirm canceled');
     }
   });
 };

 $rootScope.showAlert = function(title, message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });

   alertPopup.then(function(res) {
     console.log('Alert: ' + message);
   });
 }

});
