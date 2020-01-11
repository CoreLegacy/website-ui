(function () {
    "use strict";
    
    coreLegacy.controller("PasswordRecoveryController", ["ApiService", "IdentityService", "$state", function(ApiService, IdentityService, $state) {
        let vm = this;
        vm.EmailAddressToRecover = null;
        vm.ErrorMessages = [];
        
        vm.RecoverPassword = function() {
            vm.ErrorMessages = [];
            if (!vm.EmailAddressToRecover)
                vm.ErrorMessages.push("Please provide a valid email address");
            
            if (vm.ErrorMessages.length === 0)
                recoverPassword();
        };
        
        function recoverPassword() {
            let requestData = {
                email: vm.EmailAddressToRecover
            };
            
            let existenceCheck = ApiService.SendRequest("users/exists", requestData, "GET");
            vm.Loading = true;
            existenceCheck.Then(
                function(response) {
                if (response.is_successful){
                    let recoveryRequest = ApiService.SendRequest("registration/password/recover", requestData, "POST");
                    recoveryRequest.Then(
                        function (data) {
                            vm.Loading = false;
                            $state.go("login");
                        },
                        function(data, status) {
                            vm.Loading = false;
                            vm.ErrorMessages.push("Something went wrong, please try again.");
                        }
                    );
                }
                else {
                    vm.Loading = false;
                    vm.ErrorMessages.push("This email is not registered to a member.");
                }
            }
            ,function(data, status) {
                    vm.Loading = false;
                vm.ErrorMessages.push("Encountered an error while verifying this email, please try again.");
            });
        }
    }]);
    
})(coreLegacy);
