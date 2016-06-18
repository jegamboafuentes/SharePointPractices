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
	$("#chartbutton").click(function() {
		chart();
	});
});
function loadDependentScripts(){
	var scriptbase = hostweburl + "/_layouts/15/";
	$.getScript(scriptbase + "SP.RequestExecutor.js",loadSales);
	
}
// Load the required SharePoint libraries.
/*
$(document).ready(function() {
	//Get the URI decoded URLs.
	hostweburl = decodeURIComponent(
	getQueryStringParameter("SPHostUrl"));
	appweburl = decodeURIComponent(
	getQueryStringParameter("SPAppWebUrl"));

	$("#loadSalesman").click(function(event) {
		loadSales();
		event.preventDefault();
	});


	var scriptbase = hostweburl + "/_layouts/15/";
	$.getScript(scriptbase + "SP.RequestExecutor.js");
	
	
});
*/

function getQueryStringParameter(paramToRetrieve) {
	var params = document.URL.split("?")[1].split("&");
	for (var i = 0; i < params.length; i = i + 1) {
		var singleParam = params[i].split("=");
		if (singleParam[0] == paramToRetrieve) return singleParam[1];
	}
}

function loadSales() {
	console.log('loading');
	var executor;

	executor = new SP.RequestExecutor(appweburl);
	executor.executeAsync({
		url: appweburl + "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('Salesman')/items?@target='" + hostweburl + "'",
		method: "GET",
		headers: {
			"Accept": "application/json; odata=verbose"
		},
		success: createListSuccessHandler,
		error: createListErrorHandler
	});
}

function createListSuccessHandler(data) {
	var jsonObject = JSON.parse(data.body);
	var results = jsonObject.d.results;
	for (var i = 0; i < results.length; i++) {
		$('#salesman').append("<option value='" + results[i].NumberOfSales + "'> " + results[i].Salesman + " </option>");
	}
}

function createListErrorHandler(data, errorCode, errorMessage) {
	alert("Could not create a new list: " + errorMessage);
}

/*$("#chart").click(function(event) {
		chart();
		event.preventDefault();
	});*/
	
function chart(){
	var arr = $( "#salesman" ).val().split(",").map(Number);
	var ctx = document.getElementById("myChart");
	if(myChart){
		myChart.data.datasets[0].data = arr;
		myChart.data.datasets[0].label = 'Number of Sales by ' + $( "#salesman option:selected" ).text();
		myChart.update();
		return;
	}
	
	myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            label: 'Number of Sales by ' + $( "#salesman option:selected" ).text(),
            data: arr,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
		responsive:true,
        maintainAspectRatio:false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}