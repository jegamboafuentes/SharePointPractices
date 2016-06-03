<script type="text/javascript">

function retrieveWebSite (siteURL){
var clientContext = new SP.ClientContext(siteURL);
this.oWebSite = clientContext.get_web();

clientContext.load(this.oWebSite);
clientContext.executeQueryAsync(Function.createDelegate(this,this.onQuerySucced),
Function.createDelegate(this,this.onQueryFailed)
);
}

function onQuerySucced(sender, args){
	//alert("hola");
	alert('Title'+this.oWebSite.get_title()+ ' Description '+this.oWebSite.get_description());
}

function onQueryFailed(sender, args){
	//alert("adios");
	alert('Request failed. '+args.get_message()+'\n'+args.get_stackTrace());
}
</script>

<div>
<input type="button" onclick="retrieveWebSite('http://intranet.devlab.com')" value="click"></input>
</div>