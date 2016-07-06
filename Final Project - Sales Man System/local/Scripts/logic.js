 var yearQuota = 12000;
 var quarterQuota = yearQuota / 4;
 var Omanager;
 var Osalesman;
 var imageDeveloperSelected;

 // $(document).ready(function () {
 //
 //
 // });

 function main(salesManagerObject, salesmanObject) {
     hideElemensBegining();
     this.Omanager = salesManagerObject;
     this.Osalesman = salesmanObject;
     fillManagers(Omanager);
     imageAnimationManagers();

 }

 function hideElemensBegining() {
     $("#developerPart").hide();
     $("#infoPart").hide();
 }

 function imageAnimationManagers() {
     $("#managerPart div img").click(function () {
         var myElement = (this.id);
         var notMyElements = $("#managerPart div").find("img");
         for (var i = 0; i < notMyElements.length; i++) {
             $("#" + notMyElements[i].id).css("-webkit-filter", "blur(0px)");
             $("#" + notMyElements[i].id).css("box-shadow", "");
         }
         $("#" + myElement).css("box-shadow", "rgba(216, 17, 17, 0.71) 5px 5px 7px");
         for (var i = 0; i < notMyElements.length; i++) {
             if (notMyElements[i].id != myElement) {
                 $("#" + notMyElements[i].id).css("-webkit-filter", "blur(5px)");
             }
         }
     });
 }

 function imageAnimationDevelopers() {
     $("#developerPart div img").click(function () {
         var myElement = (this.id);
         var notMyElements = $("#developerPart div").find("img");
         for (var i = 0; i < notMyElements.length; i++) {
             $("#" + notMyElements[i].id).css("-webkit-filter", "blur(0px)");
             $("#" + notMyElements[i].id).css("box-shadow", "");
         }
         $("#" + myElement).css("box-shadow", "rgba(9, 255, 16, 0.54) 5px 5px 7px");
         for (var i = 0; i < notMyElements.length; i++) {
             if (notMyElements[i].id != myElement) {
                 $("#" + notMyElements[i].id).css("-webkit-filter", "blur(5px)");
             }
         }
     });
 }



 function fillManagers(managers) {
     for (var i = 0; i < managers.length; i++) {
         var htmlId = "manager" + (i + 1);
         var name = managers[i].Title;
         var salesman1 = managers[i].salesman1;
         var salesman2 = managers[i].salesman2;
         var salesman3 = managers[i].salesman3;
         var picture = "img/empty-profile.jpg"; //Development
         //         var picture = managers[i].EncodedAbsUrl; //Production
         //Your going to take the id from image clicked
         $('#managerPart').append("<div class=\"col-lg-2  text-center\"><img id=\"" + htmlId + "\" name=\"" + name + "\" salesman1=\"" + salesman1 + "\" salesman2=\"" + salesman2 + "\" salesman3=\"" + salesman3 + "\" class=\"img-circle img-responsive img-center  animated rotateIn\" src=\"" + picture + "\" onClick=\"salesTeamManager('" + name + "')\" style=\"cursor:pointer\" ><p>" + name + "</p></div>");
     }
 }

 function fillDevelopers(developersTeam) {
     //     animationOutDevelopers();
     $("#developerPart").empty();
     $("#developerPart").show();
     var developerTeamO = developersTeam;
     for (var i = 0; i < developerTeamO.length; i++) {
         var htmlId = "developer" + (i + 1);
         var name = developerTeamO[i].FullName;
         var tel = developerTeamO[i].Tel;
         var email = developerTeamO[i].Email;
         var supervisor = developerTeamO[i].Supervisor;
         var q12014 = developerTeamO[i].OData__x0051_12014;
         var q22014 = developerTeamO[i].OData__x0051_22014;
         var q32014 = developerTeamO[i].OData__x0051_32014;
         var q42014 = developerTeamO[i].OData__x0051_42014;
         var q12015 = developerTeamO[i].OData__x0051_12015;
         var q22015 = developerTeamO[i].OData__x0051_22015;
         var q32015 = developerTeamO[i].OData__x0051_32015;
         var q42015 = developerTeamO[i].OData__x0051_42015;
         var q12016 = developerTeamO[i].OData__x0051_12016;
         var q22016 = developerTeamO[i].OData__x0051_22016;
         var q32016 = developerTeamO[i].OData__x0051_32016;
         var q42016 = developerTeamO[i].OData__x0051_42016;
         //         var picture = developerTeamO[i].EncodedAbsUrl; //Prooduction
         var picture = "img/empty-profile.jpg"; //Development

         $('#developerPart').append("<div class=\"col-lg-1  text-center\"><img id=\"" + htmlId + "\" name=\"" + name + "\" tel=\"" + tel + "\" email=\"" + email + "\" supervisor=\"" + supervisor + "\" q12014=\"" + q12014 + "\" q22014=\"" + q22014 + "\" q32014=\"" + q32014 + "\" q42014=\"" + q42014 + "\" q12015=\"" + q12015 + "\" q22015=\"" + q22015 + "\" q32015=\"" + q32015 + "\" q42015=\"" + q42015 + "\" q12016=\"" + q12016 + "\" q22016=\"" + q22016 + "\" q32016=\"" + q32016 + "\" q42016=\"" + q42016 + "\" class=\"img-circle img-responsive img-center  animated rotateIn\" picture=\"" + picture + "\" src=\"" + picture + "\" onClick=\"fillInformation('" + htmlId + "')\" style=\"cursor:pointer\"><p>" + name + "</p></div>");
     }
     imageAnimationDevelopers();
 }

 function fillInformation(imageID) {
     //$("#infoPart").empty();
     imageDeveloperSelected = imageID;
     $("#infoPart").show();
     $("#selectYearSales").val('val1');
     var name = $("#" + imageID).attr("name");
     var tel = $("#" + imageID).attr("tel");
     var email = $("#" + imageID).attr("email");
     var supervisor = $("#" + imageID).attr("supervisor");
     var q12014 = $("#" + imageID).attr("q12014");
     var q22014 = $("#" + imageID).attr("q22014");
     var q32014 = $("#" + imageID).attr("q32014");
     var q42014 = $("#" + imageID).attr("q42014");
     var q12015 = $("#" + imageID).attr("q12015");
     var q22015 = $("#" + imageID).attr("q22015");
     var q32015 = $("#" + imageID).attr("q32015");
     var q42015 = $("#" + imageID).attr("q42015");
     var q12016 = $("#" + imageID).attr("q12016");
     var q22016 = $("#" + imageID).attr("q22016");
     var q32016 = $("#" + imageID).attr("q32016");
     var q42016 = $("#" + imageID).attr("q42016");
     $('#dataName').html(name);
     $('#dataTel').html(tel);
     $('#dataEmail').html(email);
     $('#dataSupervisor').html(supervisor);
     quotaYearStatus(q12016, q22016, q32016, q42016);
     $("#salesModalImage").empty();
     $("#salesModalImage").append("<img class=\"img-circle img-responsive img-center\" name=\"" + name + "\" src=\"" + $("#" + imageID).attr("picture") + "\" style=\"height: 75px; width: auto;\">");

     salesChart(quarterQuota, "2016", name, parseInt(q12016), parseInt(q22016), parseInt(q32016), parseInt(q42016));

     $("#selectYearSales").change(function () {
         $("#selectYearSales option:selected").each(function () {
             var option = $(this).text()
             switch (parseInt(option)) {
             case 2014:
                 quotaYearStatus(q12014, q22014, q32014, q42014);
                 salesChart(quarterQuota, "2014", name, parseInt(q12014), parseInt(q22014), parseInt(q32014), parseInt(q42014));
                 $("#modalChartYear").val('val3');
                 break;
             case 2015:
                 quotaYearStatus(q12015, q22015, q32015, q42015);
                 salesChart(quarterQuota, "2015", name, parseInt(q12015), parseInt(q22015), parseInt(q32015), parseInt(q42015));
                 $("#modalChartYear").val('val2');
                 break;
             case 2016:
                 quotaYearStatus(q12016, q22016, q32016, q42016);
                 salesChart(quarterQuota, "2016", name, parseInt(q12016), parseInt(q22016), parseInt(q32016), parseInt(q42016));
                 $("#modalChartYear").val('val1');
                 break;
             }
         });
     });

     $("#modalChartYear").change(function () {
         $("#modalChartYear option:selected").each(function () {
             var option = $(this).text()
             switch (parseInt(option)) {
             case 2014:
                 salesChart(quarterQuota, option, name, parseInt(q12014), parseInt(q22014), parseInt(q32014), parseInt(q42014));
                 quotaYearStatus(q12014, q22014, q32014, q42014);
                 $("#selectYearSales").val('val3');
                 break;
             case 2015:
                 salesChart(quarterQuota, option, name, parseInt(q12015), parseInt(q22015), parseInt(q32015), parseInt(q42015));
                 quotaYearStatus(q12015, q22015, q32015, q42015);
                 $("#selectYearSales").val('val2');
                 break;
             case 2016:
                 salesChart(quarterQuota, option, name, parseInt(q12016), parseInt(q22016), parseInt(q32016), parseInt(q42016));
                 quotaYearStatus(q12016, q22016, q32016, q42016);
                 $("#selectYearSales").val('val1');
                 break;
             }
         });
     });
 }



 function quotaYearStatus(q1, q2, q3, q4) {
     var salesTotal = parseInt(q1) + parseInt(q2) + parseInt(q3) + parseInt(q4);
     var missingTotal = yearQuota - salesTotal;
     $('#totalSales').html("$" + salesTotal);
     if (missingTotal > 0) {
         $('#totalMissing').html("$" + missingTotal);
     } else {
         $('#totalMissing').html("$0");
     }

     if (salesTotal < 3999) {
         $("#indicador").css("color", "red");
     } else if (salesTotal > 12000) {
         $("#indicador").css("color", "green");
     } else {
         $("#indicador").css("color", "yellow");
     }

 }

 function sendComment() {
     var developer = $("#dataName").text();
     var comment = $("#comment").val();
     var today = new Date();
     var dd = today.getDate();
     var mm = today.getMonth() + 1; //January is 0!
     var yyyy = today.getFullYear();
     var hour = today.getHours();
     var min = today.getMinutes();

     if (dd < 10) {
         dd = '0' + dd
     }

     if (mm < 10) {
         mm = '0' + mm
     }
     
     if (hour < 10) {
         hour = '0' + hour
     }
     
     if (min < 10) {
         min = '0' + min
     }

     today = mm + '/' + dd + '/' + yyyy + " " + hour + ":" + min;

     if (comment != "") {
         salesPostComment(developer, comment, today);
     } else {
         alert("Please fill the comment box");
     }
 }

 function salesGetCommentLogic() {
     salesGetComment($("#dataName").text());
 }

 function commentAdded(comments) {
     var name = $("#" + imageDeveloperSelected).attr("name");
     $("#commentsModalImage").empty();
     $("#commentsModalImage").append("<img class=\"img-circle img-responsive img-center\" name=\"" + name + "\" src=\"" + $("#" + imageDeveloperSelected).attr("picture") + "\" style=\"height: 75px; width: auto;\">");
     $("#commentsModalName").empty();
     $("#commentsModalName").append("<h3>" + name + "</h3>")
     $("#tableOfComments").empty();
     for (var i = 0; i < comments.length; i++) { 
         $("#tableOfComments").append("<tr><td>"+comments[i].LogDate+"</td><td>"+comments[i].Comment+"</td></tr>");
     }

     //     alert(comments[0].Developer);

     //     alert($("#"+imageDeveloperSelected).attr("name"));

 }

 function salesChart(qQuota, year, name, q1, q2, q3, q4) {
     $('#salesChart').highcharts({
         chart: {
             type: 'column'
         }
         , title: {
             text: name + " - " + year
         }
         , xAxis: {
             categories: ['Q1', 'Q2', 'Q3', 'Q4']
         }
         , yAxis: {
             min: 0
             , title: {
                 text: 'Sales'
             }
             , stackLabels: {
                 enabled: true
                 , style: {
                     fontWeight: 'bold'
                     , color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                 }
             }
         }
         , legend: {
             align: 'right'
             , x: -30
             , verticalAlign: 'top'
             , y: 25
             , floating: true
             , backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white'
             , borderColor: '#CCC'
             , borderWidth: 1
             , shadow: false
         }
         , tooltip: {
             headerFormat: '<b>{point.x}</b><br/>'
             , pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
         }
         , plotOptions: {
             column: {
                 stacking: 'normal'
                 , dataLabels: {
                     enabled: true
                     , color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                     , style: {
                         textShadow: '0 0 3px black'
                     }
                 }
             }
         }
         , series: [{
             showInLegend: false
             , name: 'Missing'
             , data: [calculateSalesMissing(q1, quarterQuota), calculateSalesMissing(q2, quarterQuota), calculateSalesMissing(q3, quarterQuota), calculateSalesMissing(q4, quarterQuota)]
             , color: '#cc0000'
        }, {
             showInLegend: false
             , name: 'Sales'
             , data: [
                 {
                     y: q1
                     , color: colorOfChart(q1, quarterQuota)
                 }


























                 
                 , {
                     y: q2
                     , color: colorOfChart(q2, quarterQuota)
                 }


























                 
                 , {
                     y: q3
                     , color: colorOfChart(q3, quarterQuota)
                 }


























                 
                 , {
                     y: q4
                     , color: colorOfChart(q4, quarterQuota)
                 }
             ]
             , color: '#e6e600'
        }]
     });
 }

 function calculateSalesMissing(valueQuota, qQuota) {
     var resultant = qQuota - valueQuota;
     if (resultant > 0) {
         return resultant;
     } else {
         return 0;
     }
 }

 function colorOfChart(valueQuota, qQuota) {
     if (valueQuota >= qQuota) {
         return '#00cc00';
     } else if (valueQuota < (qQuota / 3)) {
         return '#ff0000';
     } else {
         return '#e6e600';
     }
 }