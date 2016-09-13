(function () {
    "use strict";
    angular
        .module("app")
        .controller("loginController",
        ["$cookies", "$state", "userService", "loginService", "authorizationService", loginController]);

    function loginController($cookies, $state, userService, loginService, authorizationService) {
        var vm = this;
        vm.message = "";
        vm.userData = {
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            isChecked: false,
            profileImg: "../../Content/images/avatar_2x.png",
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
                vm.userData.userName = localStorage.getItem("PROFILE_USERNAME");

                if(localStorage.getItem("PROFILE_IS_CHECKED")){
                vm.userData.isChecked = localStorage.getItem("PROFILE_IS_CHECKED");
                }
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
                    
                    userService.setProfile(onSuccessData.userName, onSuccessData.access_token);
                    if (vm.userData.isChecked) {
                        userService.setUserOnLocalStorage(vm.userData);
                    }
                    authorizationService.setToken(onSuccessData.access_token);
                    debugger;
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
            vm.userData.email = "";
            if (!localStorage.getItem('PROFILE_IS_CHECKED')) {
                vm.removeUserFromLocalStorage();
            }
            $state.go('login');
        };
        vm.triggerRememberMeCheckbox = function () {

            if (localStorage.getItem('PROFILE_IS_CHECKED')) 
            {
                localStorage.removeItem('PROFILE_IS_CHECKED')
            }
            else {
                localStorage.setItem('PROFILE_IS_CHECKED', true);
                vm.userData.isChecked = localStorage.getItem('PROFILE_IS_CHECKED');
            }
        };
        vm.removeUserFromLocalStorage = function () {
            userService.removeUserFromLocalStorage();
        };

        activate();
        function activate(){
            vm.isUserSavedInLocalSt();
            userService.loadAuthUserDataIfToken();
        }
        
    }
})();
