<script type="text/javascript" src="~/_layouts/15/jquery-1.12.4.js"></script>
<script type="text/javascript">

$(function () {
	var clientContext = new SP.ClientContext($("#siteUrl").val());
	this.website = clientContext.get_web();
	clientContext.load(website,'Title','Description');
	clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
});
function readWebProperties(){
	var clientContext = new SP.ClientContext($("#siteUrl").val());
	this.website = clientContext.get_web();
	this.website.set_title($("#siteTitle").val());
	this.website.set_description($("#siteDescription").val());
	
	this.website.update();
	clientContext.load(website,'Title','Description');
	clientContext.executeQueryAsync(onQuerySucceeded, onQueryFailed);
	
}

function onQuerySucceeded(sender, args){
	$("#resultsDiv").html("<b>"+website.get_title()+"<br/><span>"+website.get_description()+"</span>");
	$("#siteTitle").val(website.get_title());
	$("#siteDescription").val(website.get_description());
}

function onQueryFailed(sender, args){
	$("#resultsDiv").html("<b>"+args.get_message()+"<br/><span>"+args.stackTrace()+"</span>");
}
</script>

<input type="text" id="siteUrl" value="http://intranet.devlab.com/"/>
<br/>
<span>Title: </span> <input type="text" id="siteTitle" value=""/>
<br/>
<span>Description: </span> <input type="text" id="siteDescription" value=""/>
<br/>
<input type="button" onclick="readWebProperties()" value="Click here"/>
<br/>
<div id="resultsDiv"></div>