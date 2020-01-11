(function () {
    "use strict";
    
    coreLegacy.controller("AccountController", ["ApiService", "IdentityService", function HomeController(ApiService, IdentityService) {
        let vm = this;
    
        let openPasswordResetModal = function() {
            vm.PasswordReset.Show = true;
        };
        let resetPassword = function() {
            console.log("Password-o Reset-o");
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
        
        vm.ErrorMessages = [];
        vm.User = IdentityService.CurrentUser();
        vm.PasswordReset = {
            Show: false,
            OpenModal: openPasswordResetModal,
            OldPassword: null,
            NewPassword: null
        };
        vm.LogOut = logout;
        vm.ResetPassword = resetPassword;
        
    }]);
    
})(coreLegacy);