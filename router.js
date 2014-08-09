app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url:'/login',
            templateUrl:'states/login/login.html',
            controller: 'LoginCtrl'
        })

        .state('main', {
            url:"/main",
            templateUrl: "states/main/main.html",
            controller: 'MainCtrl'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/main');

});

