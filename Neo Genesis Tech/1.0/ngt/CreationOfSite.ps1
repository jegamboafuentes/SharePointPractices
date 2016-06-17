#Jorge Enrique Gamboa Fuentes
#Weekend Homework 1
#Creation of Wep Application 
Add-PSSnapin microsoft.sharepoint.powershell
$ap = New-SPAuthenticationProvider -UseWindowsIntegratedAuthentication
New-SPWebApplication -Name "intranet.ngt.com" -Port 80 -HostHeader "intranet.ngt.com" -URL "http://intranet.ngt.com" -ApplicationPool "SharePoint - intranet.ngt.com" -ApplicationPoolAccount (Get-SPManagedAccount "DEVLAB\SPAdmin") -AuthenticationProvider $ap 
#Creation of a Site Collection
Add-PSSnapin microsoft.sharepoint.powershell
$template = Get-SPWebTemplate "STS#0"
New-SPSite -Url "http://intranet.ngt.com/" -OwnerAlias "DEVLAB\SPAdmin" -Template $template
#Creation of a Custom List
#URL of the site to create a SharePoint List
$webUrl = Get-SPWeb http://intranet.ngt.com/
$ListName = "proposalSys"
try
{
    Write-Host "Adding PowerShell Snap-in" -ForegroundColor Green
    Get-PSSnapin "Microsoft.SharePoint.Powershell"
} catch{

    Add-PSSnapin  Microsoft.SharePoint.PowerShell
}

Write-Host Snapin was Successfully loaded -ForegroundColor Green

$spTemplate = $webUrl.ListTemplates["Custom List"]
$spListCollection = $webUrl.Lists

try{
    $spListCollection.Add($ListName,$ListName,$spTemplate)
    #$spListCollection.Delete("276a03d4-456f-4ce0-87bf-127af87602f3")
   }
    catch {
    Write-Host "List creation failed, please try again" -ForegroundColor Red
    $webUrl.Dispose()
   }