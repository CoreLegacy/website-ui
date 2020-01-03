(function () {
    "use strict";
    
    coreLegacy.controller("AccountController", ["ApiService", "IdentityService", function HomeController(ApiService, IdentityService) {
        let vm = this;
        vm.ErrorMessages = [];
        vm.User = IdentityService.CurrentUser();
        
        vm.LogOut = function() {
            vm.ErrorMessages = [];
            let request = ApiService.SendRequest("logout", null, "GET");
            vm.Loading = true;
            request.Then(
                function(data){
                    vm.Loading = false;
                    // ApiService will redirect
                },
                function (data, status) {
                    vm.Loading = false;
                    vm.ErrorMessages.push("Failed to log out. Try again.")
                }
            );
        }
        
    }]);
    
})(coreLegacy);