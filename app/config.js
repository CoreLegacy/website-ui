(function () {
    "use strict";
    
    let domain = $location.host();
    console.log("Current Domain: " + domain);
    
    if (domain.indexOf("localhost") > -1) {
        coreLegacy.constant("ENVIRONMENT", "DEV");
        coreLegacy.constant("API_ROOT", "http://localhost:8080/");
    }
    else if (domain.indexOf("test") > -1) {
        coreLegacy.constant("ENVIRONMENT", "TEST");
        coreLegacy.constant("API_ROOT", "https://test-corelegacy-org-api.herokuapp.com//");
    }
    else {
        coreLegacy.constant("ENVIRONMENT", "PROD");
        coreLegacy.constant("API_ROOT", "https://corelegacy-org-api.herokuapp.com//");
    }
    
    
    
})(coreLegacy, $location);
