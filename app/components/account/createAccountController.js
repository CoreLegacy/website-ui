(function () {
    "use strict";
    
    coreLegacy.controller("CreateAccountController", ["ApiService", "$state", function HomeController(ApiService, $state) {
        let vm = this;
        
        vm.EmailAddress = null;
        vm.Password = null;
        vm.ConfirmPassword = null;
        vm.ErrorMessages = [];
    
        vm.CreateAccount = function() {
            if (validateAccountDetails()){
                let requestData = {
                    email: vm.EmailAddress,
                };
            
                let existenceCheck = ApiService.SendRequest("users/exists", requestData, "GET");
                vm.Loading = true;
                existenceCheck.Then(
                    function(response) {
                        if (response.is_successful){
                            vm.Loading = false;
                            vm.ErrorMessages.push("This email address is already in use.");
                        }
                        else {
                            requestData.password = vm.Password;
                            requestData.first_name = vm.FirstName;
                            requestData.last_name = vm.LastName;
                            let response = ApiService.SendRequest("registration", requestData, "POST");
                            response.Then(
                                function(response) {
                                vm.Loading = false;
                                if (response.is_successful) {
                                    $state.go("account");
                                }
                                else {
                                    vm.ErrorMessages.push("Unable to create account. Please try again.");
                                    console.log(response.messages)
                                }
                            },
                                function(data, status) {
                                    vm.Loading = false;
                                    vm.ErrorMessages.push("Something went wrong while creating account. Please try again.");
                                }
                            );
                        }
                    }
                    ,function(data, status) {
                        vm.Loading = false;
                        vm.ErrorMessages.push("Encountered an error while verifying this email, please try again.");
                    }
                );
            }
        };
    
        let validateAccountDetails = function() {
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
            
            if (vm.Password !== vm.ConfirmPassword)
                vm.ErrorMessages.push("Passwords do not match")
        
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