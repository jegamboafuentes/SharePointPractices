<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script   src="https://code.jquery.com/jquery-1.12.4.min.js"   integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="   crossorigin="anonymous"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
	<!-- Bootstrap Core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <!-- Frontswesome.io Core CSS -->
    <link rel="stylesheet" href="../css/font-awesome.min.css">
	<!-- Animate.css CSS -->
	<link rel="stylesheet" href="../css/animate.css">
	<!-- fontawesome.css CSS -->
	<!-- Custom CSS -->
    <link href="../css/round-about.css" rel="stylesheet">
	<script src="https://use.fontawesome.com/3321a19da3.js"></script>
		
    <!-- Add your JavaScript to the following file -->
	<!-- Bootstrap Core JavaScript -->
    <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <!-- Charts JavaScript -->
    <script type="text/javascript" src="../js/highcharts.js"></script>
    <script type="text/javascript" src="../js/exporting.js"></script>
    <!--    //logic Script-->
	<script type="text/javascript" src="../Scripts/logic.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
	
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
	
    <!-- Page Content -->
    <div class="container">
        <div class="row">

            <div class="col-lg-12">
                <h2 class="page-header">Managers</h2>
            </div>
        </div>
        <!--        END Manager Part-->

        <div class="row" id="managerPart">

        </div>

        <!--        END Manager Part-->

        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Developers</h2>
            </div>
        </div>
        <!--        Developer Part-->
        <div class="row" id="developerPart">

        </div>

        <!--       END Developer Part-->
        <!--       info Part-->
        <div class="row" id="infoPart">
            <div class="col-lg-4">
                <table class="table" style="height: 223px;">
                    <tbody>
                        <tr class="animated fadeInRight">
                            <th scope="row"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Name</th>
                            <td id="dataName" style="font-weight: bold;"></td>
                        </tr>
                        <tr class="animated fadeInRight">
                            <th scope="row"><span class="glyphicon glyphicon-phone" aria-hidden="true"></span> Telephone</th>
                            <td id="dataTel"></td>
                        </tr>
                        <tr class="animated fadeInRight">
                            <th scope="row"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span> Email</th>
                            <td id="dataEmail"></td>
                        </tr>
                        <tr class="animated fadeInRight">
                            <th scope="row"><span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span> Supervisor</th>
                            <td id="dataSupervisor"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="col-lg-2">
                <div class="table-responsive">
                    <table class="table">
                        <tr class="animated fadeInRight">
                            <td colspan="2">
                                <select class="form-control" id="selectYearSales">
                                    <option value="val1">2016</option>
                                    <option value="val2">2015</option>
                                    <option value="val3">2014</option>
                                </select>
                            </td>
                        </tr>
                        <tr class="info animated fadeInRight" style="color:black;">
                            <th>Year Quota</th>
                            <td>$12000</td>
                        </tr>
                        <tr class="animated fadeInRight">
                            <th>Status</th>
                            <!--                            <td><span id="indicador" class="glyphicon glyphicon-stop" aria-hidden="true"></span></td>-->
                            <td><i id="indicador" class="fa fa-spin fa-circle-o-notch fa-2x" aria-hidden="true"></i> </td>
                        </tr>
                        <tr class="success animated fadeInRight" style="color:black;">
                            <th>Sales</th>
                            <td id="totalSales"></td>
                        </tr>
                        <tr class="danger animated fadeInRight" style="color:black;">
                            <th>Missing</th>
                            <td id="totalMissing"></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-lg-2  text-center animated fadeInRight">
                <button type="button" class="btn btn-primary animated infinite pulse" data-toggle="modal" data-target="#salesModal" style="width: 140px;">Sales Chart <i class="fa fa-bar-chart" aria-hidden="true"></i></button>
                <hr>
                <button data-toggle="modal" data-target="#commentsModal" type="button" class="btn btn-default" style="width: 140px;" onClick="salesGetCommentLogic()">Comments log <i class="fa fa-comment-o" aria-hidden="true"></i></button>
            </div>
            <div class="col-lg-4">
                <div class="form-group">
                    <label calss="animated fadeInRight" for="comment">Comment/Feedback:</label>
                    <textarea class="form-control animated fadeInRight" rows="5" id="comment" style="height: 125px;"></textarea>
                    <br>
                    <button type="button" class="btn btn-info animated fadeInRight" onClick="sendComment()">Send</button>
                </div>
            </div>

        </div>
        <!--       END info Part-->
    </div>
    <!-- /.container -->

    <!-- Modal Sales Chart -->
    <div id="salesModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h2 class="modal-title">Sales Chart</h2>
                </div>
                <div class="modal-body">
                    <div class="row" style="text-align: center">
                        <div class="col-lg-3" id="salesModalImage">
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-4">
                            <select class="form-control" id="modalChartYear">
                                <option value="val1">2016</option>
                                <option value="val2">2015</option>
                                <option value="val3">2014</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-10">
                            <div id="salesChart"></div>

                        </div>
                        <div class="col-lg-1">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div id=row>
                            <div class="col-lg-1">
                            </div>
                            <div class="col-lg-9">
                            </div>
                            <div class="col-lg-2">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END Modal Sales Chart -->

    <!-- Modal Comments -->
    <div id="commentsModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h2 class="modal-title">Commentes Log</h2>
                </div>
                <div class="modal-body">
                    <div class="row" style="text-align: center">
                        <div class="col-lg-3" id="commentsModalImage">
                        </div>
                        <div class="col-lg-1">
                        </div>
                        <div class="col-lg-4" id="commentsModalName">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Comment</th>
                                    </tr>
                                </thead>
                                <tbody id="tableOfComments">
                                    <tr>
                                        <td>John</td>
                                        <td>Doe</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div id=row>
                            <div class="col-lg-1">
                            </div>
                            <div class="col-lg-9">
                            </div>
                            <div class="col-lg-2">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END Modal Comments -->
	
</asp:Content>
