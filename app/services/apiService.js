(function () {
    "use strict";
    
    coreLegacy.factory("ApiService",
        ["ENVIRONMENT", "API_ROOT", "IdentityService", "$http", "$q", "$state",
            function (ENVIRONMENT, API_ROOT, IdentityService, $http, $q, $state) {
        let user = IdentityService.CurrentUser();
    
        function RequestDispatcher(request, onSuccess, onError, ignoreUserInResponse) {
            let response = {};
            response.Then = function (success, error) {
                response.successCallback = success;
                response.errorCallback = error;
                if (!response.Promise)
                    dispatch(request, success, error);
            };
            
            function dispatch(request, successCallback, errorCallback) {
                response.Promise = $http(request);
                response.Promise.then(
                    function (response) {
                        let user = IdentityService.CurrentUser();
                        let data = response.data;
            
                        if (!ignoreUserInResponse && data.user) {
                            IdentityService.SetUser(data.user);
                            IdentityService.SetAuthToken(data.auth_token);
                        }
            
                        if (data.logged_out) {
                            IdentityService.ClearUser();
                            
                            if (data.session_expired) {
                                alert("Your session has expired, please log in again.");
                                $state.go("login");
                            }
                            else {
                                $state.go("home")
                            }
                            
                            return;
                        }
            
                        if (onSuccess)
                            onSuccess(data);
            
                        if (successCallback)
                            successCallback(data);
                    },
                    function (data, status) {
                        console.log("Error Making API Request: \n", request, "Response: \n", data, "Status: \n", status);
                        if (onError)
                            onError(data, status);
                        
                        if (errorCallback)
                            errorCallback(data, status);
                    }
                );
            }
        
            return response;
        }
        
        let sendRequest = function (resource, data, method, ignoreUserInResponse) {
            let request = buildRequest(resource, data, method);
            let response = new RequestDispatcher(request, ignoreUserInResponse);
        
            return response;
        };
    
        let buildRequest = function (action, data, method) {
            if (!method)
                method = "POST";
        
            let request = {
                method: method,
                url: API_ROOT + action
            };
            setRequestFields(request, data);
        
            return request;
        };
    
        let setRequestFields = function (request, data) {
            request.headers = { "Content-Type": "application/json" };
            let user = IdentityService.CurrentUser();
            if (user && user.AuthToken)
                request.headers.Authorization = "Bearer " + user.AuthToken;
            
            if (request.method.toUpperCase() === "GET")
                request.params = data;
            else
                request.data = data;
        };
        
        let resolve = function (promises) {
            let response = {};
            response.then = function (callback) {
                response.resolved = callback;
            };
        
            $q.all(promises).then(function () {
                response.resolved();
            });
        
            return response;
        };
        
        return {
            Resolve: resolve,
            SendRequest: sendRequest
        };
    }]);
    
})(coreLegacy);
