(function () {
    "use strict";
    
    coreLegacy.factory("ApiService", ["ENVIRONMENT", "API_ROOT", "IdentityService", "$http", "$q", function (ENVIRONMENT, API_ROOT, IdentityService, $http, $q) {
        let user = IdentityService.CurrentUser();
    
        function RequestDispatcher(request, onSuccess, onError,) {
            let response = {};
            response.Promise = $http(request);
            response.Success = function (callback) {
                response.successCallback = callback;
            };
            response.Error = function (callback) {
                response.errorCallback = callback;
            };
        
            response.Promise.then(
                function (data) {
                    if (data.User)
                        user.SetAll(data.User);
                    
                    if (onSuccess)
                        onSuccess(data);
                    
                    if (response.successCallback)
                        response.successCallback(data);
                },
                function (data, status) {
                    console.log("Error Making API Request: \n", request, "Response: \n", data, "Status: \n", status);
                    if (onError)
                        onError(data, status);
                    if (response.errorCallback)
                        response.errorCallback(data, status);
                }
            );
        
            return response;
        }
        
        let sendRequest = function (resource, data, method) {
            let request = buildRequest(resource, data, method);
            let response = new RequestDispatcher(request);
        
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
            if (user) {
                data.ClientToken = user.ClientToken();
            }
            
            if (request.method.toUpperCase() === "GET") {
                request.params = data;
            }
            else {
                request.data = data;
            }
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
