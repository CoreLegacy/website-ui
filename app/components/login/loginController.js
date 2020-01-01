(function () {
    "use strict";
    
    coreLegacy.controller("LoginController", ["ApiService", "IdentityService", "$state", function(ApiService, IdentityService, $state) {
        let vm = this;
        vm.Message = 'hello world';
        vm.EmailAddress = null;
        vm.EmailAddressToRecover = null;
        vm.ShowPasswordRecoveryCard = false;
        vm.Password = null;
        vm.ErrorMessages = [];
        
        vm.Login = function() {
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
