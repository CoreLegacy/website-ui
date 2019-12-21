"use strict";

// Declare app level module which depends on views, and core components
let coreLegacy = angular.module("coreLegacy", [
    "ui.router"
]);

(function () {
    "use strict";
    
    coreLegacy.run(['$rootScope', '$state', '$transitions',
        function ($rootScope, $state, $transitions) {
            $rootScope.$state = $state.current;
            $transitions.onSuccess({}, function($transitions) {
                $rootScope.$state = $transitions.$to();
            });
        }
    ]);
    
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
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/login/login.html",
                controller: "LoginController",
                controllerAs: "vm"
            })
            .state("register", {
                url: "/register",
                templateUrl: "app/register/register.html",
                controller: "RegisterController",
                controllerAs: "vm"
            })
            .state("donate", {
                url: "/donate",
                templateUrl: "app/donate/donate.html",
                controller: "DonateController",
                controllerAs: "vm"
            });
    }]);
    
})(coreLegacy);
