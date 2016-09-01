(function () {
    'use strict';

    var app = angular.module('app');
    app.config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    controller: 'dashboardController',
                    controllerAs: 'dashboardCtrl',
                    templateUrl: '../app/Views/dashboard.html'
                })
                .state('login', {
                    url: '/login',
                    controller: 'loginController',
                    controllerAs: 'loginCtrl',
                    templateUrl: '../app/Views/login.html'
                })
                .state('admin', {
                    url: '/admin',
                    controller: 'adminController',
                    controllerAs: 'adminCtrl',
                    templateUrl: '../app/Views/admin.html'
                });
        }])
})();
