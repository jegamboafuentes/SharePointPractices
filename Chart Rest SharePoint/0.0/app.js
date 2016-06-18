'use strict';

var hostweburl;
var appweburl;
var myChart;

$(document).ready(function() {
	hostweburl = decodeURIComponent(
	getQueryStringParameter("SPHostUrl"));
	appweburl = decodeURIComponent(
	getQueryStringParameter("SPAppWebUrl"));
	loadDependentScripts();
	
	$( "#singleSelect" ).change(function() {
	$("#myfirstchart").empty();
  	grafica();
	});
});

function loadDependentScripts(){
	var scriptbase = hostweburl + "/_layouts/15/";
	$.getScript(scriptbase + "SP.RequestExecutor.js",loadSales);
	
}

function getQueryStringParameter(paramToRetrieve) {
	var params = document.URL.split("?")[1].split("&");
	for (var i = 0; i < params.length; i = i + 1) {
		var singleParam = params[i].split("=");
		if (singleParam[0] == paramToRetrieve) return singleParam[1];
	}
}

function loadSales() {
	var executor;

	executor = new SP.RequestExecutor(appweburl);
	executor.executeAsync({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('EnriqueSales')/items?@target='" + hostweburl + "'",
		method: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		success: createListSuccessHandler,
		error: createListErrorHandler
	});
}

function createListSuccessHandler(data) {
	console.log('Inside of createListSuccessHandler');
	var jsonObject = JSON.parse(data.body);
	var results = jsonObject.d.results;
	for (var i = 0; i < results.length; i++) {
		$('#singleSelect').append("<option Y2010='" + results[i].OData__x0059_2010 + "' Y2011='" + results[i].OData__x0059_2011 +"' Y2012='" + results[i].OData__x0059_2012 + "' Y2013='" + results[i].OData__x0059_2013+"' Y2014='" + results[i].OData__x0059_2014+"' Y2015='" + results[i].OData__x0059_2015+"' Y2016='" + results[i].OData__x0059_2016+  "'> " + results[i].Title + " </option>");
	}
}

function createListErrorHandler(data, errorCode, errorMessage) {
	alert("Could not get Data: " + errorMessage + " error code: "+errorCode);
}

	
function grafica() {
    var Y2010 = $("#singleSelect option:selected").attr("y2010");
    var Y2011 = $("#singleSelect option:selected").attr("y2011");
    var Y2012 = $("#singleSelect option:selected").attr("y2012");
    var Y2013 = $("#singleSelect option:selected").attr("y2013");
    var Y2014 = $("#singleSelect option:selected").attr("y2014");
    var Y2015 = $("#singleSelect option:selected").attr("y2015");
    var Y2016 = $("#singleSelect option:selected").attr("y2016");
	console.log(Y2010);
	console.log(Y2011);
	console.log(Y2012);
	console.log(Y2013);
	console.log(Y2014);
	console.log(Y2015);
	console.log(Y2016);
	
    new Morris.Line({
        element: 'myfirstchart', 
        data: [
            {
                year: '2010'
                , value: Y2010
                }       
            , {
                year: '2011'
                , value: Y2011
                }    
            , {
                year: '2012'
                , value: Y2012
                }  
            , {
                year: '2013'
                , value: Y2013
                } 
            , {
                year: '2014'
                , value: Y2014
                }  
            , {
                year: '2015'
                , value: Y2015
                }    
            , {
                year: '2016'
                , value: Y2016
                }
  ],
        xkey: 'year',
        ykeys: ['value'],
        labels: ['Value']
    });
}