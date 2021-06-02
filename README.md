# Setup guide

## Dependencies
To install all of the dependencies in the form of node packages, you will firstly need to install node. Since the server and client are seperate
dependencies. Firstly, navigate to the site/server directory in a terminal and type "npm i" to install all of the packages, then do the same for the site/client
directory.

## Postgresql
You will need to install postgresql and set up a database, this database name will later in the guide be referred to  as \<database-name\>.

Now go into the server folder and create a file called db.js. In this file you will specify how the webserver will connect to your database. Mine looks like this

```javascript
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "<database name>"
})

module.exports = pool;
```
obviously replace \<database name\> with the one you created earlier.

If you have password to your postgres user, yours should look like this:

```javascript
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "<your database name>",
    password: "<your password here>"
})

module.exports = pool;
```

Don't worry about storing your password in plain text, this file won't be pushed up to github.

## Setting up and using the database
To do this you need to enter your psql shell and navigate to the server directory. Alternatively you could start the psql shell inside this directory.
type \c "your database name" to enter your database and then type \i setup.sql to run the setup file.

## Starting the server and client

This is very simple, to start the server, simply navigate to the server directory and type nodemon server.js. 

To start the client, simply navigate to the client directory and type npm start.

The client will now run on localhost:3000

# How the program works

## Client side
The client side is responsible for what you see on the website and all of the code is located in site/client. The client is seperated in to views and since some
parts such as the navigation buttons and home buttons are reused in multiple views, these are located seperately in a component directory. The website consists of
many forms, the client communicates to the webserver by sending http requests with data from the forms.

## Server side
The main server file is located in site/server/server.js and it is the one you run to start the server. To avoid having to much code in one file, the server is
seperated in to many different routes that are then imported back into the server.js file. The routes are responsible for handing http requests for a specific
part of the site. The webserver then communicates with the database by querying it using a javascript library and then sends a http response back to the client
side.
