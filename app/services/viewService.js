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
            response.Success(function(response) {
                let data = response.data;
                if (data.view) {
                    vm.ViewModel = data.view;
                    vm.Media = {};
                    vm.Texts = {};
                    
                    for (let i = 0; i < data.view.media.length; i++) {
                        let medium = data.view.media[i];
                        vm.Media[medium.identifier] = medium;
                    }
                    for (let i = 0; i < data.view.texts.length; i++) {
                        let text = data.view.texts[i];
                        vm.Texts[text.identifier] = text;
                    }
    
                    if (callback)
                        callback(data.view);
                    if (data.view.name)
                        DataService.Persistent.Save(VIEW_CACHE_KEY + data.view.name, JSON.stringify(data.view));
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