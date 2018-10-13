The folder 'DB1' contains all the files related to the application. Copy the folder in the directory of your choice.

Languages : Javascript
Database : Mysql (Version: 8.0.12)
Server Side : Nodejs (Version: 8.11.3)
Front-end : HTML5, Embedded JS (v2.6.1), CSS 3, Bootstrap v4.1.3, JQuery v3.3.1
Framework : Express (Version: 4.16.3)
Middleware : Body-Parser (Version: 1.18.3)

Server Setup:

Download npm (Node Package Manager) and node.js from here 'https://www.npmjs.com/get-npm'

To install all the dependencies - Open terminal/command prompt, navigate to the folder 'DB1' and enter 'npm install'
Starting point of the application - app.js
To start the server - enter 'node app.js'

Database :

Download and install Mysql on your machine. 
Start the mysql server by navigating to the mysql folder on the command prompt 
Enter 'mysqld --console' and open another prompt and enter :
> mysql -u root -p
Enter the password to launch mysql server.

Import the Library Data:
Import the "Library" data by executing the script "Create_DB_contact_manager.sql" SQL script (found in the attached .zip file) from the MySQL prompt. This script should work on both Windows and OSX.

SQL scripts can be executed from the MySQL Prompt using the "source" command. This example assumes that MySQL was launched from the same directory that the create-company script resides. Otherwise, you may have to include an absolute path location.
mysql> source Create_DB_contact_manager.sql

Launch Application :
Now both node and mysql servers are up, open the chrome browser and enter localhost:3000 and the apllication launches. Use the quick start guide to use the application.