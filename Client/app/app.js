(function () {
    'use strict';
    var app = angular.module('app', [
        // Angular modules
        //'ngAnimate',        // animations
        'ui.router',          //routing
        'ngSanitize',       // sanitizes html bindings (ex: sidebar.js)

        //services modules
        'ngResource',
        'ngCookies',

        // Custom modules
        'common',           // common functions, logger, spinner
        'common.bootstrap', // bootstrap dialog wrapper functions

        // 3rd Party Modules
        'ui.bootstrap'      // ui-bootstrap (ex: carousel, pagination, dialog)
    ])
        .constant("appSettings",
        {
            serverpath: "http://localhost:3000"
        });

    //TODO to be implemented: Handle routing errors and success events
  //  app.run(['$route', function ($route) {
        // Include $route to kick start the router.
 //   }]);
})();
