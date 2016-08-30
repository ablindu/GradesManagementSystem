(function () {
    "use strict";
    angular
        .module("app")
        .factory("authorizationService", ["$cookies","userService",
         authorizationService]);

    function authorizationService($cookies, userService) {
        var cleanTokenCookie = function () {
            $cookies.remove("loginToken");
            userService.getProfile().isLoggedIn = false;
        }
        return { cleanTokenCookie: cleanTokenCookie }
    };
})();