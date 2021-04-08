# Setting up the webapp

## What you need to have installed
I do not know if this is a complete list so feel free to add anything you needed to intall aswell

### PostgreSQL
Install according to instructions and then create a database by typing CREATE DATABASE "your database name";
It does not matter what the name of your database is, since it is specific yo your local machine but you need to remember it.

Now go into the server folder and create a file called db.js. In this file you will specify how the webserver will connect to your database. Mine looks like this

```javascript
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "<your database name>"
})

module.exports = pool;
```
obviously replace "your database name" with the one you created earlier.

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

### Node js

Install according to online instructions and then you need to install some node packages, again
i do not know if this is a complete list, if you get some error "could not load module X" try
typing npm isntall X and add that package to this list. Here are the things you should install using npm
install:

    * express
    * nodemon
    * react
    * pg
    * react-dom
    * cors
    * react-router-dom
    
## Setting up and using the database
To do this you need to enter your psql shell and navigate to the server directory. Alternatively you could start the psql shell inside this directory.
type \c "your database name" to enter your database and then type \i setup.sql to run the setup file.

## Starting the server and client

This is very simple, to start the server, simply navigate to the server directory and type nodemon server.js. To start the client, simply navigate to the client directory and type npm start.


