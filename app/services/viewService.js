(function () {
    "use strict";
    
    coreLegacy.factory("ViewService", ["ApiService", "DataService", function (ApiService, DataService) {
        let VIEW_CACHE_KEY = "VIEW-MODEL-";
        
        /*
            Returns the cached view data, then calls the API to get the updated viewmodel.
            The function parameter is a callback which will be invoked upon the API's response with updated data
         */
        let loadViewModel = function(viewName, vm, callback) {
            let request = {
                name: viewName
            };
            
            let response = ApiService.SendRequest("views", request, "GET");
            response.Then(function(response) {
                if (response.view) {
                    vm.ViewModel = response.view;
                    vm.Media = {};
                    vm.Texts = {};
                    
                    for (let i = 0; i < response.view.media.length; i++) {
                        let medium = response.view.media[i];
                        vm.Media[medium.identifier] = medium;
                    }
                    for (let i = 0; i < response.view.texts.length; i++) {
                        let text = response.view.texts[i];
                        vm.Texts[text.identifier] = text;
                    }
    
                    if (callback)
                        callback(response.view);
                    if (response.view.name)
                        DataService.Persistent.Save(VIEW_CACHE_KEY + response.view.name, JSON.stringify(response.view));
                }
                else {
                    vm.ViewModel = {};
                    vm.Media = {};
                    vm.Texts = {};
                }
            });
            
            let viewString = DataService.Persistent.Get(VIEW_CACHE_KEY + viewName);
            let cachedView = viewString ? JSON.parse(viewString) : {};
            return cachedView;
        };
        
        let media = {};
        let texts = {};
        
        return {
            LoadViewModel: loadViewModel,
        };
    }]);
    
})(coreLegacy);