(function() {
    "use strict";
    angular
        .module("app")
        .factory("userService", userService);

    function userService() {
        var profile = {
            isLoggedIn: false,
            userName: "",
            token: ""
        };
        var setProfile = function (username, token) {
            profile.userName = username;
            profile.token = token;
            profile.isLoggedIn = true;

        };
        var getProfile = function () {
            return profile;
        };

        return {
            setProfile: setProfile,
            getProfile: getProfile
        };
    }
})();