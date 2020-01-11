(function () {
    "use strict";
    
    coreLegacy.controller("AccountPasswordRecoverController", ["ApiService", "IdentityService", "$state", "$stateParams", function(ApiService, IdentityService, $state, $stateParams) {
        let vm = this;
        vm.ErrorMessages = [];
        vm.User = null;
        vm.Loading = true;
    
    
        let resetKey = $stateParams.Key;
        let data = { key: resetKey };
        let userRequest = ApiService.SendRequest("registration/password/recover/key", data, "POST");
        userRequest.Then(
            function(data) {
                vm.User = IdentityService.CurrentUser();
                vm.Loading = false;
            },
            function(data, status) {
                vm.ErrorMessages.push("Invalid key supplied. Please request another recovery.");
                vm.Loading = false;
            }
        );
        
        vm.ResetPassword = function() {
            vm.ErrorMessages = [];
            let data = { email: vm.User.Email };
            if (validatePasswordReset(vm.Password)) {
                vm.Loading = true;
                data.key = resetKey;
                data.password = vm.Password;
                let request = ApiService.SendRequest("registration/password/reset", data, "POST");
                request.Then(
                    function(data){
                        if (data.is_successful)
                            $state.go("login");
                        else
                            vm.ErrorMessages.push("Unable to reset your password. Please try a different password.");
                    },
                    function (data, status) {
                        vm.Loading = false;
                        vm.ErrorMessages.push("Failed to reset password. Try again.");
                    }
                );
            }
        };
    
        let validatePasswordReset = function() {
            vm.ErrorMessages = [];
        
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
                vm.ErrorMessages.push("Passwords do not match");
        
            return vm.ErrorMessages.length === 0;
        };
    
        let validatePassword = function(password) {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            return regex.test(password);
        }
        
    }]);
    
})(coreLegacy);