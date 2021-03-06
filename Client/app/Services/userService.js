(function () {
    "use strict";
    angular
        .module("app")
        .factory("userService", userService);

    function userService() {
        var profile = {
                isLoggedIn: false,
                userName: "",
                token: ""
            },
            setProfile = function (username, token) {
                profile.userName = username;
                profile.token = token;
                profile.isLoggedIn = true;

            },
            getProfile = function () {
                return profile;
            },
            markUserAsLoggedInIfTokenStored = function () {
                if (localStorage.getItem("PROFILE_TOKEN")) {
                    getProfile().isLoggedIn = true;
                }
            },
            setUserOnLocalStorage = function (userData) {
                if (!supportsHTML5Storage()) { return false; }
                localStorage.setItem("PROFILE_IMG_SRC", "../../Content/images/avatarSucess.png?sz=120");
                localStorage.setItem("PROFILE_REAUTH_EMAIL", userData.email);
                localStorage.setItem("PROFILE_IS_CHECKED", userData.isChecked);
                localStorage.setItem("PROFILE_USERNAME", userData.userName);
            },
            removeUserFromLocalStorage = function () {
                localStorage.removeItem("PROFILE_IMG_SRC");
                localStorage.removeItem("PROFILE_REAUTH_EMAIL");
                localStorage.removeItem("PROFILE_IS_CHECKED");
                localStorage.removeItem("PROFILE_USERNAME");

                profile = {
                    isLoggedIn: false,
                    userName: "",
                    email: "",
                    // password: "",
                    // confirmPassword: "",
                    // isChecked: false,
                    // profileImg: "../../Content/images/avatar_2x.png"
                };

            },
            supportsHTML5Storage = function () {
                try {
                    return 'localStorage' in window && window['localStorage'] !== null;
                } catch (e) {
                    return false;
                }
            }

        return {
            setProfile: setProfile,
            getProfile: getProfile,
            markUserAsLoggedInIfTokenStored: markUserAsLoggedInIfTokenStored,
            setUserOnLocalStorage: setUserOnLocalStorage,
            removeUserFromLocalStorage: removeUserFromLocalStorage
        };
    }
})();