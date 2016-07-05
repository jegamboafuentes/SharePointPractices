# Migration from SharePoint 2010 to 2013
##Steps
-Create a Web Application 
http://spserver:4319/ 
-Delete the database
-Attach the Database from last Database into a new Database
-Execute this command in SQLServer
```
USE [master]
RESTORE DATABASE [WSS_Content_JK] 
FROM  DISK = N'C:\Projects\wss_content.bak' WITH  FILE = 1,  
MOVE N'WSS_Content' TO N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\WSS_Content_JK.mdf',  
MOVE N'WSS_Content_log' TO N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\WSS_Content_JK.LDF',  NOUNLOAD,  STATS = 5
```
-Execute the folowing commands in PowerShell
```
Test-SPContentDataBase -Name WSS_Content_JE -WebApplication http://spserver:4319/ 
cd "C:\Program Files\Common Files\microsoft shared\Web Server Extensions\15\BIN\"
stsadm.exe -o addcontentdb -url http://spserver:4319/ -databasename WSS_Content_JE 
```

