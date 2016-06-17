<script type="text/javascript" src="~/_layouts/15/jquery-1.12.4.js"></script>
<script type="text/javascript">
_spBodyOnLoadFunctionNames.push("loadLists");
function loadLists(){
    var clientContext = new SP.ClientContext('http://intranet.devlab.com');
    var oList = clientContext.get_web().get_lists().getByTitle('NeoGenesisTasks');
        
    var camlQuery = new SP.CamlQuery();
    var query = SP.CamlQuery.createAllItemsQuery();
    this.collListItem = oList.getItems(query);
        
    clientContext.load(collListItem);
    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceeded), 
        Function.createDelegate(this, this.onQueryFailed)
    ); 
	colors();
	
}

function colors(){
        $Text = $("td .ms-vb2:contains('In Progress')");
        $Text.css("background-color", "#00FF66");
        
        $Text = $("td .ms-vb2:contains('Overdue')");
        $Text.css("background-color", "#FF0000");
		$Text.css("color", "white"); 		
    
        $Text = $("td .ms-vb2:contains('Due in 24 Hours')");
        $Text.css("background-color", "#FFFF66");
		
		$Text = $("td .ms-vb2:contains('Due in 12 Hours')");
        $Text.css("background-color", "#FF6600");
		$Text.css("color", "white");    
    }
	

function onQuerySucceeded(sender, args) {
    var listItemInfo = '';
    var listItemEnumerator = collListItem.getEnumerator();
    var Now = Date();
    while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
		var dueDate = new Date(oListItem.get_item('DueDate'));
		var status = oListItem.get_item('Status');
		var complete=oListItem.get_item('Completed');
		var newValue = compareDates(dueDate,Now,status);
		if (newValue && !complete)
		{
			updateListItem(newValue,oListItem.get_item('ID'));
		}
		
    }
}
function updateListItem(valor,id) {
	console.log(valor + " " + id);
    var clientContext = new SP.ClientContext('http://intranet.devlab.com');
    var oList = clientContext.get_web().get_lists().getByTitle('NeoGenesisTasks');

    this.oListItem = oList.getItemById(id);
    oListItem.set_item('Status', valor);
    oListItem.update();

    clientContext.executeQueryAsync(
        Function.createDelegate(this, this.onQuerySucceededItem), 
        Function.createDelegate(this, this.onQueryFailedItem)
    );
}
function onQuerySucceededItem() {
    
}

function onQueryFailedItem(sender, args) {
    alert('Item not updated. ' + args.get_message() + 
        '\n' + args.get_stackTrace());
}

function onQueryFailed(sender, args) {
    alert('Request onQueryFailedItem failed. ' + args.get_message() + 
        '\n' + args.get_stackTrace());
}
function compareDates(due,hoy,status){
	var Now = new Date(hoy);
	var dueDate = new Date(due);
	if( dueDate.getTime() < Now.getTime() && status != "Overdue"){
		return "Overdue";
	}else{
		var diff =  dueDate.getTime() - Now.getTime();		
		diff = Math.floor(diff/3600000);
		console.log(diff.toString());
		if(diff <= 12 && diff>0 && status != "Due in 12 Hours"){
			
			return "Due in 12 Hours";
		}
		else if(diff <= 24 && diff >12 && status != "Due in 24 Hours"){
			
			return "Due in 24 Hours";
		}
	}
		
}

	
</script>
