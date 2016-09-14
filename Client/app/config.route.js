(function () {
    'use strict';
    var app = angular.module('app');
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            // function to check the authentication //
            var isAuth = ["$q", "authorizationService", function ($q, authorizationService) {
               // authService.fillAuthData;
                if (authorizationService.isAuthenticated()) {
                    //TODO implement this return
                    return true;//$q.when(authService.authentication);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }];

            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'loginController',
                    controllerAs: 'login',
                    templateUrl: '../app/Views/login.html'
                })
                .state('home', {
                    url: '/',
                    controller: 'dashboardController',
                    controllerAs: 'dashboardCtrl',
                    templateUrl: '../app/Views/dashboard.html',
                    resolve: {
                        auth: isAuth
                    }
                })
                .state('admin', {
                    url: '/admin',
                    controller: 'adminController',
                    controllerAs: 'admin',
                    templateUrl: '../app/Views/admin.html',
                    resolve: {
                        auth: isAuth
                    }
                });

         /*   var interceptor = ['$rootScope', '$q', "Base64", function (scope, $q, Base64) {
                debugger;
                function success(response) {
                    return response;
                }
                function error(response) {
                    var status = response.status;
                    if (status == 401) {
                        //AuthFactory.clearUser();
                        //  window.location = "/account/login?redirectUrl=" + Base64.encode(document.URL);
                        $state.go('login');
                        return;
                    }
                    // otherwise
                    return $q.reject(response);
                }
                return function (promise) {
                    return promise.then(success, error);
                }
            }];
            $httpProvider.responseInterceptors.push(interceptor);*/
        }])

})();
