(function () {
    "use strict";
    
    coreLegacy.factory("IdentityService", ["DataService", function (DataService) {
        const PRIVILEGES_KEY = "privileges";
        const ROLE_KEY = "role";
        const FIRST_NAME_KEY = "firstName";
        const LAST_NAME_KEY = "lastName";
        const EMAIL_KEY = "email";
        const TITLE_KEY = "title";
        const CLIENT_TOKEN_KEY = "clientToken";
        
        let onUpdateCallback = null;
        
        function User(clientToken, userData) {
            if (clientToken)
                DataService.Session.Save(CLIENT_TOKEN_KEY, clientToken);
            
            if (userData) {
                DataService.Session.Save(FIRST_NAME_KEY, userData.first_name);
                DataService.Session.Save(LAST_NAME_KEY, userData.last_name);
                DataService.Session.Save(EMAIL_KEY, userData.email);
                DataService.Session.Save(ROLE_KEY, userData.role);
                DataService.Session.Save(PRIVILEGES_KEY, userData.privileges);
            }
    
            this.SetAll = setAll;
            this.Role = getRole();
            this.Privileges = getPrivileges();
            this.FirstName = getFirstName();
            this.LastName = getLastName();
            this.Email = getEmail();
            this.Title = getTitle();
            this.ClientToken = getClientToken();
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
            let result = null;
            if (token)
                result = DataService.Session.Save(CLIENT_TOKEN_KEY, token);
            else
                DataService.Session.Remove(CLIENT_TOKEN_KEY);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
            
            return result;
        }
        
        function getClientToken() {
            let result = DataService.Session.Get(CLIENT_TOKEN_KEY);
            return result;
        }
        
        function setRole(role) {
            let result = null;
            if (role)
                result = DataService.Session.Save(ROLE_KEY, role);
            else
                DataService.Session.Remove(ROLE_KEY);
    
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
    
            let result = null;
            if (privileges)
                result = DataService.Session.Save(PRIVILEGES_KEY, privileges);
            else
                DataService.Session.Remove(PRIVILEGES_KEY);
    
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
            let result = null;
            if (firstName)
                result = DataService.Session.Save(FIRST_NAME_KEY, firstName);
            else
                DataService.Session.Remove(FIRST_NAME_KEY);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getFirstName() {
            let result = DataService.Session.Get(FIRST_NAME_KEY);
            return result;
        }
    
        function setLastName(lastName) {
            let result = null;
            if (lastName)
                result = DataService.Session.Save(LAST_NAME_KEY, lastName);
            else
                DataService.Session.Remove(LAST_NAME_KEY);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getLastName() {
            let result = DataService.Session.Get(LAST_NAME_KEY);
            return result;
        }
    
        function setEmail(email) {
            let result = null;
            if (email)
                result = DataService.Session.Save(EMAIL_KEY, email);
            else
                DataService.Session.Remove(EMAIL_KEY);
    
            if (onUpdateCallback)
                onUpdateCallback(getUser());
    
            return result;
        }
    
        function getEmail() {
            let result = DataService.Session.Get(EMAIL_KEY);
            return result;
        }
    
        function setTitle(title) {
            let result = null;
            if (title)
                result = DataService.Session.Save(TITLE_KEY, title);
            else
                DataService.Session.Remove(TITLE_KEY);
    
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
        
        function setUser(clientToken, userData) {
            let user = new User(clientToken, userData);
    
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
