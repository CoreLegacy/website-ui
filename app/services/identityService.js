(function () {
    "use strict";
    
    coreLegacy.factory("IdentityService", ["DataService", function (DataService) {
        const PRIVILEGES_KEY = "privileges";
        const ROLE_KEY = "role";
        const FIRST_NAME_KEY = "firstName";
        const LAST_NAME_KEY = "lastName";
        const EMAIL_KEY = "email";
        const TITLE_KEY = "title";
        const CLIENT_TOKEN = "clientToken";
        
        let onUpdateCallback = null;
        
        function User(userData) {
            this.SetAll = setAll;
            this.Role = getRole;
            this.Privileges = getPrivileges;
            this.FirstName = getFirstName;
            this.LastName = getLastName;
            this.Email = getEmail;
            this.Title = getTitle;
            this.ClientToken = getClientToken;
            
            if (userData) {
                DataService.Session.Save(FIRST_NAME_KEY, userData.first_name);
                DataService.Session.Save(LAST_NAME_KEY, userData.last_name);
                DataService.Session.Save(EMAIL_KEY, userData.email);
                DataService.Session.Save(ROLE_KEY, userData.role);
                DataService.Session.Save(PRIVILEGES_KEY, userData.privileges);
            }
        }        
    
        function setAll(user) {
            setFirstName(user.FirstName);
            setLastName(user.LastName);
            setTitle(user.Title);
            setEmail(user.Email);
            setRole(user.Role);
            setPrivileges(user.Privileges);
            setClientToken(user.ClientToken);
            
            if (onUpdateCallback)
                onUpdateCallback(getUser());
        }
        
        function setClientToken(token) {
            let result = DataService.Session.Save(CLIENT_TOKEN, token);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
            
            return result;
        }
        
        function getClientToken() {
            let result = DataService.Session.Get(CLIENT_TOKEN);
            return result;
        }
        
        function setRole(role) {
            let result = DataService.Session.Save(ROLE_KEY, role);
    
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
            
            let result = DataService.Session.Save(PRIVILEGES_KEY, privileges);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
        
        function getPrivileges() {
            let privileges = DataService.Session.Get(PRIVILEGES_KEY);
            if (!privileges)
                privileges = [];
            
            return privileges;
        }
    
        function setFirstName(firstName) {
            let result = DataService.Session.Save(FIRST_NAME_KEY, firstName);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getFirstName() {
            let result = DataService.Session.Get(FIRST_NAME_KEY);
            return result;
        }
    
        function setLastName(lastName) {
            let result = DataService.Session.Save(LAST_NAME_KEY, lastName);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getLastName() {
            let result = DataService.Session.Get(LAST_NAME_KEY);
            return result;
        }
    
        function setEmail(email) {
            let result = DataService.Session.Save(EMAIL_KEY, email);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getEmail() {
            let result = DataService.Session.Get(EMAIL_KEY);
            return result;
        }
    
        function setTitle(title) {
            let result = DataService.Session.Save(TITLE_KEY, title);
    
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
            OnUserUpdate: onUserUpdate
        };
    }]);
    
})(coreLegacy);
