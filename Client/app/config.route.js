(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes
    function getRoutes() {
        return [
          {
              url: '/login',
              config: {
                  templateUrl: 'app/Views/login.html',
                  title: 'login',
                  settings: {
                      //nav: 1,
                      content: '<i class="fa fa-sign-in"></i> Login'
                  }
              }
          },
            {
                url: '/',
                config: {
                    templateUrl: 'app/Views/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'app/Views/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
        ];
    }
})();
