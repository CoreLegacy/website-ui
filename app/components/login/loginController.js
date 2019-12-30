(function () {
    "use strict";
    
    coreLegacy.controller("LoginController", ["ApiService", "IdentityService", function(ApiService, IdentityService) {
        let vm = this;
        vm.Message = 'hello world';
        vm.EmailAddress = null;
        vm.Password = null;
        vm.ErrorMessages = [];
        
        vm.Login = function() {
            if (validateLogin()){
                let request = {
                    email: vm.EmailAddress,
                    password: vm.Password
                };
                let response = ApiService.SendRequest("login", request, "POST");
                response.Success(function(response) {
                    let data = response.data;
                    if (data.is_successful) {
                        IdentityService.SetUser(data.user)
                    }
                })
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
                vm.ErrorMessages.push("  - At least 8 characters");
                vm.ErrorMessages.push("  - Contains an uppercase character");
                vm.ErrorMessages.push("  - Contains a lowercase letter");
                vm.ErrorMessages.push("  - Contains a number");
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
