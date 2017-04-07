angular.module('vpsapp.routes', [])
    .config(function($ionicConfigProvider) {
        $ionicConfigProvider.backButton.text('');
        $ionicConfigProvider.backButton.previousTitleText(false);
    })
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('login', {
              url: '/login',
              templateUrl: 'app/components/auth/login.html',
              controller: 'LoginCtrl'
            })

            .state('signup-step-1', {
              url: '/signup-step-1',
              templateUrl: 'app/components/auth/signup-step-1.html',
              controller: 'SignupStep1Ctrl'
            })

            .state('signup-step-2', {
              url: '/signup-step-2',
              templateUrl: 'app/components/auth/signup-step-2.html',
              controller: 'SignupStep2Ctrl'
            })

            .state('signup-step-3', {
              url: '/signup-step-3',
              templateUrl: 'app/components/auth/signup-step-3.html',
              controller: 'SignupStep3Ctrl'
            })

            .state('signup-step-4', {
              url: '/signup-step-4',
              templateUrl: 'app/components/auth/signup-step-4.html',
              controller: 'SignupStep4Ctrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/base/menu.html',
                controller: 'MenuCtrl'
            })

            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/home.html',
                        controller: 'HomeCtrl'
                    }
                },
                cache: false
            })

            .state('app.notifications', {
                url: '/notifications',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/notifications/notifications.html',
                        controller: 'NotificationsCtrl'
                    }
                }
            })

            .state('app.profile', {
                url: '/profile',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/profile/profile.html',
                        controller: 'ProfileCtrl'
                    }
                }
            })

            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'app/base/tabs.html',
                controller: 'TabsCtrl'
            })

            .state('tab.fob', {
                url: '/fob',
                views: {
                    'tab-fob': {
                        templateUrl: 'app/components/fob/fob.html',
                        controller: 'FobCtrl'
                    }
                },
                cache: false
            })

            .state('tab.service', {
                url: '/service',
                views: {
                    'tab-service': {
                        templateUrl: 'app/components/service/service.html',
                        controller: 'ServiceCtrl'
                    }
                }
            })

            .state('tab.drivers', {
                url: '/drivers',
                views: {
                    'tab-drivers': {
                        templateUrl: 'app/components/drivers/drivers.html',
                        controller: 'DriversCtrl'
                    }
                }
            })

            .state('app.panic', {
                url: '/panic',
                views: {
                    'tab-panic': {
                        templateUrl: 'app/components/panic/panic.html',
                        controller: 'PanicCtrl'
                    }
                }
            })

            .state('app.mode', {
                url: '/mode',
                views: {
                    'tab-mode': {
                        templateUrl: 'app/components/mode/mode.html',
                        controller: 'ModeCtrl'
                    }
                }
            })

        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');
    });
