'use strict';
 
    var hostweburl;
    var appweburl;
    // Load the required SharePoint libraries.
    $(document).ready(function () {
        //Get the URI decoded URLs.
        hostweburl = decodeURIComponent(
getQueryStringParameter("SPHostUrl"));
        appweburl = decodeURIComponent(
getQueryStringParameter("SPAppWebUrl"));
 
        
        $("#createlistbutton").click(function (event) {
            createList();
            event.preventDefault();
        });
 
       
        var scriptbase = hostweburl + "/_layouts/15/";
        $.getScript(scriptbase + "SP.RequestExecutor.js");
    });
 
    function getQueryStringParameter(paramToRetrieve) {
        var params = document.URL.split("?")[1].split("&");
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == paramToRetrieve) return singleParam[1];
        }
    }
 
    function createList() {
        var listName = document.getElementById("createlistname").value;
        var executor;

        executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists?@target='" + hostweburl + "'",
            method: "POST",
            body: "{ '__metadata': { 'type': 'SP.List' }, 'BaseTemplate': 100,'Description': '" + listName + "', 'Title':'" + listName + "'}",
            headers: {
                "content-type": "application/json; odata=verbose"
            },
            success: createListSuccessHandler,
            error: createListErrorHandler
        });
    }
 
    function createListSuccessHandler(data) {
        alert("List Created successfully")
    }
 
    function createListErrorHandler(data, errorCode, errorMessage) {
        alert("Could not create a new list: " + errorMessage);
    }