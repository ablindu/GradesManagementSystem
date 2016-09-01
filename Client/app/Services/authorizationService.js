(function () {
    "use strict";
    angular
        .module("app")
        .factory("authorizationService", ["$cookies", "userService",
            authorizationService]);

    function authorizationService($cookies, userService) {
        var cleanToken = function () {
            localStorage.removeItem("PROFILE_TOKEN");
        },
            setToken = function (token) {
                localStorage.setItem("PROFILE_TOKEN", token);
        }
        return {
            cleanToken: cleanToken,
            setToken: setToken
        }
    };
})();