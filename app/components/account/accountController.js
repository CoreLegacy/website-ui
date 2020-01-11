(function () {
    "use strict";
    
    coreLegacy.controller("AccountController", ["ApiService", "IdentityService", function HomeController(ApiService, IdentityService) {
        let vm = this;
        vm.ErrorMessages = [];
        vm.User = IdentityService.CurrentUser();
        
        let validatePassword = function(password) {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            return regex.test(password);
        };
        let validatePasswordReset = function() {
            vm.ErrorMessages = [];
            if (!vm.PasswordReset.NewPassword)
                vm.ErrorMessages.push("You must enter a new password");
            else if (vm.PasswordReset.NewPassword !== vm.PasswordReset.ConfirmPassword)
                vm.ErrorMessages.push("Password confirmation must match new password");
            else if (!validatePassword(vm.PasswordReset.NewPassword)) {
                vm.ErrorMessages.push("Password must satisfy the following:");
                vm.ErrorMessages.push("- At least 8 characters");
                vm.ErrorMessages.push("- Contains an uppercase character");
                vm.ErrorMessages.push("- Contains a lowercase letter");
                vm.ErrorMessages.push("- Contains a number");
            }
            
            return vm.ErrorMessages.length === 0;
        };
        let openPasswordResetModal = function() {
            vm.PasswordReset.Show = true;
        };
        let resetPassword = function() {
            vm.ErrorMessages = [];
            if (validatePasswordReset()) {
                let data = {
                    email: vm.User.Email,
                    old_password: vm.PasswordReset.OldPassword,
                    new_password: vm.PasswordReset.NewPassword
                };
                let request = ApiService.SendRequest("registration/password/reset", data, "POST");
                vm.Loading = true;
                request.Then(
                    function(data){
                        vm.Loading = false;
                        if (!data.is_successful) {
                            console.log(data);
                            vm.ErrorMessages.push("Something went wrong while resetting your password. Please try again.");
                        }
                    },
                    function (data, status) {
                        vm.Loading = false;
                        vm.ErrorMessages.push("Failed to reset password. Try again.")
                    }
                );
            }
        };
        let logout = function() {
            vm.ErrorMessages = [];
            let request = ApiService.SendRequest("logout", null, "GET");
            vm.Loading = true;
            request.Then(
                function(data){
                    vm.Loading = false;
                    IdentityService.ClearUser();
                    // ApiService will redirect
                },
                function (data, status) {
                    vm.Loading = false;
                    vm.ErrorMessages.push("Failed to log out. Try again.")
                }
            );
        };
        vm.PasswordReset = {
            Show: false,
            OpenModal: openPasswordResetModal,
            OldPassword: null,
            NewPassword: null,
            ConfirmPassword: null
        };
        vm.LogOut = logout;
        vm.ResetPassword = resetPassword;
        
    }]);
    
})(coreLegacy);