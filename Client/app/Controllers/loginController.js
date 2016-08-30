(function () {
    "use strict";
    angular
        .module("app")
        .controller("loginController",
        ["$cookies", "userService", "loginService", "authorizationService", loginController]);

    function loginController($cookies, userService, loginService, authorizationService) {
        var vm = this;
        if ($cookies.get('loginToken')) {
            userService.getProfile().isLoggedIn = true;
        }
        vm.isLoggedIn = function () {
            // debugger;
            var loggedIn = userService.getProfile().isLoggedIn;
            //if token cookie exists, take it from there and authenticate, else FALSE
            console.log('IS LOGGED IN? => ' + loggedIn);
            return loggedIn;
        };
        vm.isUserSavedInLocalSt = function () {
            var isSaved = false;
            if (localStorage.getItem("PROFILE_REAUTH_EMAIL"))
                isSaved = true;
            return isSaved;
        };

        vm.message = "";
        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isChecked: false,
            profileImg: "../../Content/images/avatar_2x.png"
        };
        vm.registerUser = function () {
            vm.userData.confirmPassword = vm.userData.password;
            loginService.registration.registerUser(vm.userData,
                function (data) {
                    vm.confirmPassword = "";
                    vm.message = "... Registration successful!";
                    vm.login();
                },
                function (response) {
                    vm.isLoggedIn = false;
                    vm.message = response.statusText + "\r\n";
                    if (response.data.exceptionMessage)
                        vm.message += response.data.exceptionMessage;

                    if (response.data.modelState) {
                        for (var key in response.data.modelState) {
                            vm.message += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        }
        vm.login = function () {
            //defining the autenthication type (user+password)
            vm.userData.grant_type = "password";
            vm.userData.userName = vm.userData.email;

            loginService.login.loginUser(vm.userData,
                function (onSuccessData) {
                    vm.message = "";
                    vm.password = "";
                    userService.setProfile(onSuccessData.userName, onSuccessData.access_token);
                    debugger;
                    if (vm.userData.isChecked) {
                        saveUserOnLocalStorage();
                    }
                   
                    $cookies.put("loginToken", onSuccessData.access_token);
                },
                function (errorResponse) {
                    vm.password = "";
                    vm.message = errorResponse.statusText + ": \r\n";
                    if (errorResponse.data.exceptionMessage)
                        vm.message += errorResponse.data.exceptionMessage;
                    if (errorResponse.data.error)
                        vm.message += errorResponse.data.error_description;
                });
        }
        vm.logout = function () {
            authorizationService.cleanTokenCookie();
            //TODO delete this todo when implementation is ready @login
            if (!vm.userData.isChecked) {
                vm.removeUserFromLocalStorage();
            }

            //TODO not ready yet; implement stateRouting
            // $state.go('login'); // go to login
        }


        //used for remember user
        function supportsHTML5Storage() {
            try {
                return 'localStorage' in window && window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        }
        function saveUserOnLocalStorage() {
            if (!supportsHTML5Storage()) { return false; }
            localStorage.setItem("PROFILE_IMG_SRC", "../../Content/images/avatarSucess.png?sz=120");
            localStorage.setItem("PROFILE_REAUTH_EMAIL", vm.userData.email);
            localStorage.setItem("PROFILE_IS_CHECKED", vm.userData.isChecked);
        }
        vm.removeUserFromLocalStorage = function () {
            localStorage.removeItem("PROFILE_IMG_SRC");
            localStorage.removeItem("PROFILE_REAUTH_EMAIL");
            localStorage.removeItem("PROFILE_IS_CHECKED");
            vm.userData = {
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                isChecked: false,
                profileImg: "../../Content/images/avatar_2x.png"
            };
        }

        if (vm.isUserSavedInLocalSt()) {
            vm.userData.profileImg = localStorage.getItem("PROFILE_IMG_SRC");
            vm.userData.email = localStorage.getItem("PROFILE_REAUTH_EMAIL");
            vm.userData.isChecked = localStorage.getItem("PROFILE_IS_CHECKED");
        }
        console.log('IS CHECKED ? => ' + vm.userData.isChecked);
    }
})();
