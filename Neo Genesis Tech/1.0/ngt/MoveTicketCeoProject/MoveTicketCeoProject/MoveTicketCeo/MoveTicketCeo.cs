using System;
using System.Security.Permissions;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Utilities;
using Microsoft.SharePoint.Workflow;

namespace MoveTicketCeoProject.MoveTicketCeo
{
    /// <summary>
    /// List Item Events
    /// </summary>
    public class MoveTicketCeo : SPItemEventReceiver
    {
        /// <summary>
        /// An item was updated.
        /// </summary>
        public override void ItemUpdated(SPItemEventProperties properties)
        {
            base.ItemUpdated(properties);
            this.EventFiringEnabled = false;
            if (properties.ListItem.Fields.ContainsField("man_approve") && properties.ListItem.Fields.ContainsField("ceo_approve"))
            {
                if (properties.ListItem["ceo_approve"].ToString() == "Rejected")
                {
                    moveTicket(properties);
                }
                //if (properties.ListItem["man_approve"].ToString() == "Approved" && properties.ListItem["ceo_approve"].ToString() == "Approved")
                //{
                //    moveTicket(properties);
                //}
                
                //if (properties.ListItem["man_approve"].ToString() == "Rejected")
                //{
                //    moveTicket(properties);
                //}


            }
            this.EventFiringEnabled = true;
        }
        protected void moveTicket(SPItemEventProperties properties)
        {
            SPListItem curr = properties.ListItem;
            properties.ListItem.File.CopyTo(properties.WebUrl + "/PropArchive/" + properties.ListItem.File.Name, true);
            using (SPSite site = new SPSite("http://intranet.ngt.com/"))
            {
                using (SPWeb web = site.OpenWeb())
                {
                    SPList list = web.Lists["PropArchive"];
                    SPList propList = web.Lists["NewProposals"];
                    SPListItem propItem = propList.GetItemByIdSelectedFields(properties.ListItemId, "Title", "Description0", "estimated_time", "status", "ceo_approve", "man_approve");
                    SPListItem item = list.Items.Add();
                    //item["Title"] = propItem["Title"].ToString();
                    ////item["Created By"] = propItem["Created By"].ToString();
                    //item["Description"] = propItem["Description"].ToString();
                    //item["estimated_time"] = propItem["estimated_time"];
                    propItem.File.Delete();
                    item.Update();
                    propItem.Update();
                }
            }
        }


    }
}