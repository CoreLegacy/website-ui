(function () {
    "use strict";
    
    coreLegacy.factory("IdentityService", ["DataService", function (DataService) {
        const PRIVILEGES_KEY = "privileges";
        const ROLE_KEY = "role";
        const FIRST_NAME_KEY = "firstName";
        const LAST_NAME_KEY = "lastName";
        const EMAIL_KEY = "email";
        const TITLE_KEY = "title";
        const CLIENT_TOKEN_KEY = "authToken";
        
        let onUpdateCallback = null;
        
        function User(userData) {
            if (userData) {
                setUserField(FIRST_NAME_KEY, userData.first_name);
                setUserField(LAST_NAME_KEY, userData.last_name);
                setUserField(EMAIL_KEY, userData.email);
                setUserField(ROLE_KEY, userData.role);
                setUserField(PRIVILEGES_KEY, userData.privileges);
            }
    
            this.Role = getRole();
            this.Privileges = getPrivileges();
            this.FirstName = getFirstName();
            this.LastName = getLastName();
            this.Email = getEmail();
            this.Title = getTitle();
            this.AuthToken = getAuthToken();
        }
        
        function setUserField(key, value) {
            let result = null;
            if (value)
                result = DataService.Session.Save(key, value);
            else
                DataService.Session.Remove(key);
            
            return result;
        }
        
        function setAuthToken(token) {
            let result = setUserField(CLIENT_TOKEN_KEY, token);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
            
            return result;
        }
        
        function getAuthToken() {
            let result = DataService.Session.Get(CLIENT_TOKEN_KEY);
            return result;
        }
        
        function setRole(role) {
            let result = setUserField(ROLE_KEY, role);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
        
        function getRole() {
            let result = DataService.Session.Get(ROLE_KEY);
            return result;
        }
        
        function setPrivileges(user, privileges) {
            if (typeof privileges === "string")
                privileges = privileges.split(",");
    
            let result = setUserField(PRIVILEGES_KEY, privileges);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
        
        function getPrivileges() {
            let privileges = DataService.Session.Get(PRIVILEGES_KEY);
            if (privileges)
                privileges = privileges.split(",");
            else
                privileges = [];
            
            return privileges;
        }
    
        function setFirstName(firstName) {
            let result = setUserField(FIRST_NAME_KEY, firstName);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getFirstName() {
            let result = DataService.Session.Get(FIRST_NAME_KEY);
            return result;
        }
    
        function setLastName(lastName) {
            let result = setUserField(LAST_NAME_KEY, lastName);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getLastName() {
            let result = DataService.Session.Get(LAST_NAME_KEY);
            return result;
        }
    
        function setEmail(email) {
            let result = setUserField(EMAIL_KEY, email);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getEmail() {
            let result = DataService.Session.Get(EMAIL_KEY);
            return result;
        }
    
        function setTitle(title) {
            let result = setUserField(TITLE_KEY, title);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getTitle() {
            let result = DataService.Session.Get(TITLE_KEY);
            return result;
        }
        
        function getUser() {
            if (!getRole())
                return null;
            
            return new User();
        }
        
        function setUser(userData) {
            let user = new User(userData);
    
            if (onUpdateCallback)
                onUpdateCallback(user);
    
            return user;
        }
        
        function clearUser() {
            setFirstName(null);
            setLastName(null);
            setEmail(null);
            setRole(null);
            setPrivileges(null);
            setAuthToken(null);
    
            if (onUpdateCallback)
                onUpdateCallback(null);
        }
        
        function onUserUpdate(callback) {
            onUpdateCallback = callback;
        }
    
        return {
            CurrentUser: getUser,
            SetUser: setUser,
            ClearUser: clearUser,
            OnUserUpdate: onUserUpdate,
            SetAuthToken: setAuthToken
        };
    }]);
    
})(coreLegacy);
