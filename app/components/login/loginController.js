(function () {
    "use strict";
    
    coreLegacy.controller("LoginController", ["ApiService", "IdentityService", "$state", "DataService", function(ApiService, IdentityService, $state, DataService) {
        let vm = this;
        let LOGIN_KEY = "saved-login";
        
        vm.EmailAddress = DataService.Persistent.Get(LOGIN_KEY);
        vm.EmailAddressToRecover = null;
        vm.ShowPasswordRecoveryCard = false;
        vm.Password = null;
        vm.RememberMe = !!vm.EmailAddress;
        vm.ErrorMessages = [];
        
        vm.Login = function() {
            if (vm.EmailAddress && vm.RememberMe)
                DataService.Persistent.Save(LOGIN_KEY, vm.EmailAddress.toLowerCase());
            else if (vm.EmailAddress && !vm.RememberMe)
                DataService.Persistent.Remove(LOGIN_KEY);
            
            if (validateLogin()){
                
                let requestData = {
                    email: vm.EmailAddress,
                };
    
                let existenceCheck = ApiService.SendRequest("users/exists", requestData, "GET");
                vm.Loading = true;
                existenceCheck.Then(
                    function(response) {
                        if (response.is_successful){
                            requestData.password = vm.Password;
                            // We want auth token stored in a cookie
                            requestData.with_auth_token = true;
                            let response = ApiService.SendRequest("login", requestData, "POST");
                            response.Then(function(response) {
                                vm.Loading = false;
                                if (response.is_successful) {
                                    IdentityService.SetUser(response.user);
                                    IdentityService.SetAuthToken(response.auth_token);
                                    $state.go("account");
                                }
                                else {
                                    vm.ErrorMessages.push("Password is incorrect.");
                                }
                            });
                        }
                        else {
                            vm.Loading = false;
                            vm.ErrorMessages.push("This email is not registered to a member.");
                        }
                    }
                    ,function(data, status) {
                        vm.Loading = false;
                        vm.ErrorMessages.push("Encountered an error while verifying this email, please try again.");
                    }
                );
            }
        };
        
        let validateLogin = function() {
            vm.ErrorMessages = [];
            if (!vm.EmailAddress)
                vm.ErrorMessages.push("Please provide a valid email address");
            
            if (!vm.Password)
                vm.ErrorMessages.push("Must provide password");
            else if (!validatePassword(vm.Password)) {
                vm.ErrorMessages.push("Password must satisfy the following:");
                vm.ErrorMessages.push("- At least 8 characters");
                vm.ErrorMessages.push("- Contains an uppercase character");
                vm.ErrorMessages.push("- Contains a lowercase letter");
                vm.ErrorMessages.push("- Contains a number");
            }
            
            return vm.ErrorMessages.length === 0
        };
    
        let validateEmail = function(email) {
            let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(email);
        };
        
        let validatePassword = function(password) {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
            return regex.test(password);
        }
    }]);
    
})(coreLegacy);
