(function () {
    "use strict";
    
    let url = window.location.href;
    console.log("Current Url: " + url);
    
    if (url.indexOf("localhost") > -1) {
        console.log("Currently in the localhost environment");
        coreLegacy.constant("ENVIRONMENT", "DEV");
        coreLegacy.constant("API_ROOT", "http://localhost:8080/");
    }
    else if (url.indexOf("website-ui-test") > -1) {
        console.log("Currently in the test environment");
        coreLegacy.constant("ENVIRONMENT", "TEST");
        coreLegacy.constant("API_ROOT", "https://test-corelegacy-org-api.herokuapp.com/");
    }
    else {
        console.log("Currently in the production environment");
        coreLegacy.constant("ENVIRONMENT", "PROD");
        coreLegacy.constant("API_ROOT", "https://corelegacy-org-api.herokuapp.com/");
    }
    
    
    
})(coreLegacy);
