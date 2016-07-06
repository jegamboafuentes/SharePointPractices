'use strict';
var hostweburl;
var appweburl;
var salesManagerObject;
var salesmanObject;

$(document).ready(function() {
	hostweburl = decodeURIComponent(
	getQueryStringParameter("SPHostUrl"));
	appweburl = decodeURIComponent(
	getQueryStringParameter("SPAppWebUrl"));
	loadDependentScriptsManager();
	$("#infoPart").hide();
});

function loadDependentScriptsManager() {
	var scriptbase = hostweburl + "/_layouts/15/";
	$.getScript(scriptbase + "SP.RequestExecutor.js", salesManager);
}

function loadDependentScriptsSalesman() {
	var scriptbase = hostweburl + "/_layouts/15/";
	$.getScript(scriptbase + "SP.RequestExecutor.js", salesSalesman);
}

function getQueryStringParameter(paramToRetrieve) {
	var params = document.URL.split("?")[1].split("&");
	for (var i = 0; i < params.length; i = i + 1) {
		var singleParam = params[i].split("=");
		if (singleParam[0] == paramToRetrieve) return singleParam[1];
	}
}

function salesManager() {
	var executor;
	executor = new SP.RequestExecutor(appweburl);
	executor.executeAsync({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('salesManagerList')/items?$select=EncodedAbsUrl,Title,salesman1,salesman2,salesman3&@target='" + hostweburl + "'",
		method: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		success: createListSuccessHandlerSalesManager,
		error: createListErrorHandlerSalesManager
	});
}

function salesSalesman() {
	var executor;
	executor = new SP.RequestExecutor(appweburl);
	executor.executeAsync({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('salesSalesmanList')/items?$select=EncodedAbsUrl,Title,FullName,Tel,Email,Supervisor,OData__x0051_12014,OData__x0051_22014,OData__x0051_32014,OData__x0051_42014,OData__x0051_12015,OData__x0051_22015,OData__x0051_32015,OData__x0051_42015,OData__x0051_12016,OData__x0051_22016,OData__x0051_32016,OData__x0051_42016&@target='" + hostweburl + "'",
		method: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		success: createListSuccessHandlerSalesman,
		error: createListErrorHandlerSalesman
	});
}

function salesTeamManager(managerName) {
	var executor;
	executor = new SP.RequestExecutor(appweburl);
	executor.executeAsync({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('salesSalesmanList')/items?$filter=(Supervisor eq '"+managerName+"')&$select=EncodedAbsUrl,Title,FullName,Tel,Email,Supervisor,OData__x0051_12014,OData__x0051_22014,OData__x0051_32014,OData__x0051_42014,OData__x0051_12015,OData__x0051_22015,OData__x0051_32015,OData__x0051_42015,OData__x0051_12016,OData__x0051_22016,OData__x0051_32016,OData__x0051_42016&@target='" + hostweburl + "'",
		method: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		success: createListSuccessHandlerTeamManager,
		error: createListErrorHandlerTeamManager
	});
}

function salesPostComment(developer, comment, dateTime) {
	var itemType = GetItemTypeForListName('salesComents');
	var data = {
		__metadata: {
			'type': itemType
		},
		'Title': Comment,
		'LogDate': dateTime,
		'Comment': comment,
		'Developer': developer,
	};

	$.ajax({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/Lists/getbytitle('salesComents')/items?@target='" + hostweburl + "'",
		type: "POST",
		headers: {
			"accept": "application/json;odata=verbose",
			"X-RequestDigest": $("#__REQUESTDIGEST").val(),
			"content-Type": "application/json;odata=verbose"
		},
		data: JSON.stringify(data),
		success: postCommentSuccess,
		error: postCommentSError
	});
}

function salesGetComment(developer) {
	var executor;
	executor = new SP.RequestExecutor(appweburl);
	executor.executeAsync({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('salesComents')/items?$filter=(Developer eq '"+developer+"')&$select=LogDate,Comment,Developer&@target='" + hostweburl + "'",
		method: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		success: createListSuccessHandlerGetComment,
		error: createListErrorHandlerGetComment
	});
}

function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}

function createListSuccessHandlerSalesManager(data) {
	var jsonObject = JSON.parse(data.body);
	var results = jsonObject.d.results;
	salesManagerObject = results;
	loadDependentScriptsSalesman();
	//salesTeamManager('Steve Jobs');   ///DELETE ------------------------
	//salesPostComment("My first comment","Paul Allen","7/2/2016 8:32 pm");
	//salesGetComment("Paul Allen");
	$("#jsonManager").text(data.body.toString());
}

function createListSuccessHandlerSalesman(data) {
	var jsonObject = JSON.parse(data.body);
	var results = jsonObject.d.results;
	salesmanObject = results;
	$("#jsonSalesman").text(data.body.toString());
	//Call all the logic from the page
	main(salesManagerObject,salesmanObject);
}

function createListSuccessHandlerTeamManager(data) {
	var jsonObject = JSON.parse(data.body);
	var results = jsonObject.d.results;
	fillDevelopers(results);
}

function createListSuccessHandlerGetComment(data) {
	var jsonObject = JSON.parse(data.body);
	var results = jsonObject.d.results;
	commentAdded(results);
}

function postCommentSuccess(data) {
	alert("Success! Comment Added");
	$('#comment').val('');
}

function createListErrorHandlerSalesManager(data, errorCode, errorMessage) {
	alert("Could not get Data from Sales Manager List: " + errorMessage + " error code: " + errorCode);
}

function createListErrorHandlerSalesman(data, errorCode, errorMessage) {
	alert("Could not get Data from Sales Manager List: " + errorMessage + " error code: " + errorCode);
}

function createListErrorHandlerTeamManager(data, errorCode, errorMessage) {
	alert("Could not get Data from Team Manager Web Service: " + errorMessage + " error code: " + errorCode);
}

function createListErrorHandlerGetComment(data, errorCode, errorMessage) {
	alert("Could not get Data from Comment Web Service: " + errorMessage + " error code: " + errorCode);
}

function postCommentSError(data, errorCode, errorMessage) {
	alert("Could not POST Data into salesComent: " + errorMessage + " error code: " + errorCode);
}