"use strict";

// Declare app level module which depends on views, and core components
let coreLegacy = angular.module("coreLegacy", [
    "ui.router"
]);

(function () {
    "use strict";
    
    coreLegacy.run(['$rootScope', '$state', '$transitions',
        function ($rootScope, $state, $transitions) {
            $rootScope.state = $state.current;
            $transitions.onSuccess({}, function($transitions) {
                $rootScope.state = $transitions.$to();
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
                templateUrl: "app/components/home/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/components/login/login.html",
                controller: "LoginController",
                controllerAs: "vm"
            })
            .state("register", {
                url: "/register",
                templateUrl: "app/components/register/register.html",
                controller: "RegisterController",
                controllerAs: "vm"
            })
            .state("donate", {
                url: "/donate",
                templateUrl: "app/components/donate/donate.html",
                controller: "DonateController",
                controllerAs: "vm"
            })
            .state("about-contact", {
                url: "/about/contact",
                templateUrl: "app/components/about/contact/contact.html",
                controller: "ContactController",
                controllerAs: "vm"
            })
            .state("about-partners", {
                url: "/about/partners",
                templateUrl: "app/components/about/partners/partners.html",
                controller: "PartnersController",
                controllerAs: "vm"
            })
            .state("about-story", {
                url: "/about/story",
                templateUrl: "app/components/about/story/story.html",
                controller: "StoryController",
                controllerAs: "vm"
            })
            .state("about-team", {
                url: "/about/team",
                templateUrl: "app/components/about/team/team.html",
                controller: "TeamController",
                controllerAs: "vm"
            })
            .state("contribute-financial", {
                url: "/contribute/financial",
                templateUrl: "app/components/contribute/financial/financial.html",
                controller: "FinancialController",
                controllerAs: "vm"
            })
            .state("contribute-mentor", {
                url: "/contribute/mentor",
                templateUrl: "app/components/contribute/mentor/mentor.html",
                controller: "MentorController",
                controllerAs: "vm"
            })
            .state("contribute-sponsor", {
                url: "/contribute/sponsor",
                templateUrl: "app/components/contribute/sponsor/sponsor.html",
                controller: "SponsorController",
                controllerAs: "vm"
            })
            .state("contribute-volunteer", {
                url: "/contribute/volunteer",
                templateUrl: "app/components/contribute/volunteer/volunteer.html",
                controller: "VolunteerController",
                controllerAs: "vm"
            });
    }]);
    
})(coreLegacy);
