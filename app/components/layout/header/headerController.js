(function () {
    "use strict";
    
    coreLegacy.controller("HeaderController", ["IdentityService", function(IdentityService) {
        let vm = this;
        vm.User = IdentityService.CurrentUser();
        IdentityService.OnUserUpdate(function(user) {
            vm.User = user
        });
    }]);
    
})(coreLegacy);
