"use strict";

// Declare app level module which depends on views, and core components
let coreLegacy = angular.module("coreLegacy", [
    "ui.router"
]);

(function () {
    "use strict";
    
    coreLegacy.run(['$rootScope', '$state', '$transitions', 'IdentityService',
        function ($rootScope, $state, $transitions, IdentityService) {
            $rootScope.state = $state.current;
            
            $transitions.onSuccess({}, function($transitions) {
                let nextState = $transitions.$to();
                let fromState = $transitions.$from();
                
                let user = IdentityService.CurrentUser();
                // If next state requires user logged in, redirect or prevent load
                if (nextState.data.requiresLogin && !user) {
                    alert("You must be logged in to get to the " + nextState.name + " page.");
                    $transitions.abort();
                    if (nextState.data.redirectTo)
                        $state.go(nextState.data.redirectTo);
                    else if (!fromState || !fromState.name || fromState.name === nextState.name)
                        $state.go("home");
                    else
                        $state.go(fromState.name);
                }
                else {
                    $rootScope.state = $transitions.$to();
                }
                
                
                
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
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/components/login/login.html",
                controller: "LoginController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("login-recover", {
                url: "/login/recover",
                templateUrl: "app/components/login/passwordRecovery.html",
                controller: "PasswordRecoveryController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("register", {
                url: "/register",
                templateUrl: "app/components/register/register.html",
                controller: "RegisterController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("donate", {
                url: "/donate",
                templateUrl: "app/components/donate/donate.html",
                controller: "DonateController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("about-contact", {
                url: "/about/contact",
                templateUrl: "app/components/about/contact/contact.html",
                controller: "ContactController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("about-partners", {
                url: "/about/partners",
                templateUrl: "app/components/about/partners/partners.html",
                controller: "PartnersController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("about-story", {
                url: "/about/story",
                templateUrl: "app/components/about/story/story.html",
                controller: "StoryController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("about-team", {
                url: "/about/team",
                templateUrl: "app/components/about/team/team.html",
                controller: "TeamController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("contribute-financial", {
                url: "/contribute/financial",
                templateUrl: "app/components/contribute/financial/financial.html",
                controller: "FinancialController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("contribute-mentor", {
                url: "/contribute/mentor",
                templateUrl: "app/components/contribute/mentor/mentor.html",
                controller: "MentorController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("contribute-sponsor", {
                url: "/contribute/sponsor",
                templateUrl: "app/components/contribute/sponsor/sponsor.html",
                controller: "SponsorController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("contribute-volunteer", {
                url: "/contribute/volunteer",
                templateUrl: "app/components/contribute/volunteer/volunteer.html",
                controller: "VolunteerController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("account", {
                url: "/account",
                templateUrl: "app/components/account/account.html",
                controller: "AccountController",
                controllerAs: "vm",
                data: {
                    requiresLogin: true,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("account-create", {
                url: "/account/create",
                templateUrl: "app/components/account/createAccount.html",
                controller: "CreateAccountController",
                controllerAs: "vm",
                data: {
                    requiresLogin: false,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
            .state("account-password-recover", {
                url: "/account/password/recover/:Key",
                templateUrl: "app/components/account/accountPasswordRecover.html",
                controller: "AccountPasswordRecoverController",
                controllerAs: "vm",
                data: {
                    requiredParams: ["Key"]
                }
            })
            .state("account-password-reset", {
                url: "/account/password/reset",
                templateUrl: "app/components/account/accountPasswordReset.html",
                controller: "AccountPasswordResetController",
                controllerAs: "vm",
                data: {
                    requiresLogin: true,
                    requiredRoles: [],
                    requiredPrivileges: [],
                    redirectTo: null
                }
            })
        
    }]);
    
})(coreLegacy);
