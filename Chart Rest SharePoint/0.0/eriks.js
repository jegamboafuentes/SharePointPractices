$( "#singleSelect" ).change(function() {
    $("#myfirstchart").empty();
  	grafica();
});

function grafica() {
    var Y2010 = $("#singleSelect option:selected").attr("Y2010");
    var Y2011 = $("#singleSelect option:selected").attr("Y2011");
    var Y2012 = $("#singleSelect option:selected").attr("Y2012");
    var Y2013 = $("#singleSelect option:selected").attr("Y2013");
    var Y2014 = $("#singleSelect option:selected").attr("Y2014");
    var Y2015 = $("#singleSelect option:selected").attr("Y2015");
    var Y2016 = $("#singleSelect option:selected").attr("Y2016");
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