(function () {
    "use strict";
    
    coreLegacy.factory("DataService", ["$window", function ($window) {
        let persistent = {};
        const LOCAL_STORAGE = "localStorage";
        const SESSION_STORAGE = "sessionStorage";
        
        function get(storage, key) {
            let value = null;
            try {
                value = $window[storage][key];
            }
            catch (exception) {
                console.log("Error Retrieving " + key +" from " + storage +": \n", exception);
                value = null;
            }
    
            return value;
        }
        
        function save(storage, key, value) {
            let success = true;
            try {
                $window[storage][key] = value;
            }
            catch (exception) {
                console.log("Error Saving '" + key +": " + value + "' to " + storage +": \n", exception);
                success = false;
            }
    
            return success;
        }
        
        function remove(storage, key) {
            let success = true;
            try {
                $window[storage].removeItem(key);
            }
            catch (exception) {
                console.log("Error Removing " + key +" from " + storage +": \n", exception);
                success = false;
            }
    
            return success;
        }
    
        persistent.get = function (key) {
            return get(LOCAL_STORAGE, key);
        };
    
        persistent.save = function (key, value) {
            return save(LOCAL_STORAGE, key, value);
        };
    
        persistent.remove = function (key) {
            return remove(LOCAL_STORAGE, key);
        };
    
        let session = {};
        session.get = function (key) {
            return get(SESSION_STORAGE, key);
        };
    
        session.save = function (key, value) {
            return save(SESSION_STORAGE, key, value);
        };
    
        session.remove = function (key) {
            return remove(SESSION_STORAGE, key);
        };
    
        return {
            Persistent: {
                Get: persistent.get,
                Save: persistent.save,
                Remove: persistent.remove
            },
            Session: {
                Get: session.get,
                Save: session.save,
                Remove: session.remove
            }
        };
    }]);
    
})(coreLegacy);
