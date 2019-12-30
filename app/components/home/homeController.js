(function () {
    "use strict";
    
    coreLegacy.controller("HomeController", ["ViewService", function(ViewService) {
        let vm = this;
        vm.Media = ViewService.Media;
        vm.Texts = ViewService.Texts;
        vm.ViewModel = ViewService.LoadViewModel("home", vm);
        
    }]);
    
})(coreLegacy);
