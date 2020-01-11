(function () {
    "use strict";
    
    coreLegacy.directive("claModal", function () {
        return {
            restrict: "E",
            templateUrl: "app/directives/modal.html",
            replace: true,
            transclude: true,
            scope: {
                title: "@",
                positiveText: "@",
                negativeText: "@",
                tertiaryText: "@",
                positiveAction: "&",
                negativeAction: "&",
                tertiaryAction: "&",
                show: "=",
                hideButtons: "=",
                onClose: "&"
            },
            link: function (scope, elem, attr) {
                scope.Close = function () {
                    scope.show = false;
                    scope.onClose();
                };
                
                scope.CallPositiveAction = function () {
                    scope.positiveAction();
                    scope.show = false;
                };
                
                scope.CallNegativeAction = function () {
                    scope.negativeAction();
                    scope.show = false;
                };
                
                scope.CallTertiaryAction = function () {
                    scope.tertiaryAction();
                    scope.show = false;
                };
                
                scope.BackdropClick = function (event) {
                    event.stopPropagation();
                    if (event.target.tagName === "MODAL")
                        scope.Close();
                }
            }
        };
    });
    
})(coreLegacy);