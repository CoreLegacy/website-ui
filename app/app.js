"use strict";

// Declare app level module which depends on views, and core components
let coreLegacy = angular.module("coreLegacy", [
    "ui.router"
]);

(function () {
    "use strict";
    
    coreLegacy.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to root
        $urlRouterProvider.otherwise("/");
        
        // Set up the states
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "app/home/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            });
    }]);
    
})(coreLegacy);
