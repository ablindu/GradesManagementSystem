(function () {
    "use strict";
    angular
        .module("app")
        .controller("loginController",
        ["$cookies", "$state", "userService", "loginService", "authorizationService", loginController]);

    function loginController($cookies, $state, userService, loginService, authorizationService) {
        var vm = this;
        userService.markUserAsLoggedInIfTokenStored();


        vm.message = "";
        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isChecked: true,
            profileImg: "../../Content/images/avatar_2x.png"
        };
        console.log("isChecked " + vm.userData.isChecked);
        vm.currentUserData = function () {
            var userData = userService.getProfile();
            return userData;
        };
        //also used in login.html
        vm.isUserSavedInLocalSt = function () {
            if (localStorage.getItem("PROFILE_REAUTH_EMAIL")) {
                vm.userData.profileImg = localStorage.getItem("PROFILE_IMG_SRC");
                vm.userData.email = localStorage.getItem("PROFILE_REAUTH_EMAIL");
                vm.userData.isChecked = localStorage.getItem("PROFILE_IS_CHECKED");
                vm.userData.userName = localStorage.getItem("PROFILE_USERNAME");
                return true;
            }
            return false;
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
                    vm.currentUserData().isLoggedIn = false;
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
                    vm.userData.password = "";
                    debugger;
                    vm.userData.isChecked = vm.userData.isChecked;
                    userService.setProfile(onSuccessData.userName, onSuccessData.access_token);
                    if (vm.userData.isChecked) {
                        userService.setUserOnLocalStorage(vm.userData);
                    }
                    authorizationService.setToken(onSuccessData.access_token);
                    $state.go('home');
                },
                function (errorResponse) {
                    vm.password = "";
                    vm.message = errorResponse.statusText + ": \r\n";
                    if (errorResponse.data.exceptionMessage)
                        vm.message += errorResponse.data.exceptionMessage;
                    if (errorResponse.data.error)
                        vm.message += errorResponse.data.error_description;
                });
        };
        vm.logout = function () {
            authorizationService.cleanToken();
            userService.getProfile().isLoggedIn = false;
            if (!vm.userData.isChecked) {
                vm.removeUserFromLocalStorage();
            }
            $state.go('login');
        };
        vm.triggerRememberMeCheckbox = function () {
debugger;
            if (document.getElementById("rememberMe").value) {
                vm.userData.isChecked = true;
            } else {
                vm.userData.isChecked = false;
            }
        };
        vm.removeUserFromLocalStorage = function () {
            userService.removeUserFromLocalStorage();
        };
        vm.isUserSavedInLocalSt();
    }
})();
