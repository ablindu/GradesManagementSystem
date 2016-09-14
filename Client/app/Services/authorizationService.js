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
            },

            isAuthenticated = function () {
                if (localStorage.getItem("PROFILE_TOKEN") !== '')
                    return true;
                return false;
            }



        return {
            cleanToken: cleanToken,
            setToken: setToken,
            isAuthenticated: isAuthenticated
        }

    };
})();