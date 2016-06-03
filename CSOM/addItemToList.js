//THE COMENTED LINES ARE FOR TEST PROPOSES, IF YOU ADD THIS CODE TO A WEB PART YOU HAVE TO ADD THE ELEMENTS 
//FOR HTML AS TABLES, INPUTS ETC.

//<html>
//
//<body>

//
//    <script type="text/javascript" src="~/_layouts/15/jquery-1.12.4.js"></script>
//    <script type="text/javascript">

        _spBodyOnLoadFunctionNames.push("mainFunction");

        function mainFunction() {
            var clientContext = new SP.ClientContext($("#siteUrl").val());
            this.website = clientContext.get_web();
            this.collList = website.get_lists();
            clientContext.load(collList);
            clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded)
                , Function.createDelegate(this, this.onQueryFailed));
        }

        function onQuerySucceeded() {
            var listEnumerator = collList.getEnumerator();

            while (listEnumerator.moveNext()) {
                var oList = listEnumerator.get_current();
                $('#resultsDiv')
                    .append($("<option></option>")
                        .attr("value", oList.get_title())
                        .text(oList.get_title()));
            }
        }

        function onQueryFailed(sender, args) {
            alert('Request failed. ');
        }

        function addValue() {
            var clientContext = new SP.ClientContext($("#siteUrl").val());
            var oList = clientContext.get_web().get_lists().getByTitle($("#resultsDiv").val());
            var itemCreateInfo = new SP.ListItemCreationInformation();
            this.oListItem = oList.addItem(itemCreateInfo);
            oListItem.set_item('Title', $("#title").val());
            oListItem.update();
            clientContext.load(oListItem);
            clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded)
                , Function.createDelegate(this, this.onQueryFailed));
        }
//    </script>
//    <table>
//        <tr>
//            <th>
//                <span>Subsite Name</span>
//            </th>
//            <th>
//                <input type="text" id="siteUrl" value="http://intranet.devlab.com/subsiteone/" />
//            </th>
//        </tr>
//        <tr>
//            <th>
//                <span>List Name</span>
//            </th>
//            <th>
//                <select id="resultsDiv">
//
//                </select>
//            </th>
//        </tr>
//        <tr>
//            <th>
//                <span>Title</span>
//            </th>
//            <th>
//                <input type="text" id="title" />
//            </th>
//        </tr>
//        <tr>
//            <th>
//
//            </th>
//            <th>
//                <input type="button" id="update" value="Insert" onclick="addValue()" />
//            </th>
//        </tr>
//    </table>
//
//
//</body>

</html>