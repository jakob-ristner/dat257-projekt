
const express = require("express");
const cors = require("cors");
var session = require('express-session');
const app = express();
const pool = require("./db");

//Routes in serverside that is not restricted for acces. 
const notRestricted = ["/login", "/logout"];

//Make sure that the request comes from the correct domain
//Set credentials to always be on
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

//cors.SupportCredentials = true;
//app.set('trust proxy', 1);
/*
app.use(session({
    secret: 'diamond pickaxe',
    resave: false,
    saveUninitialized: false
}));
*/


//
/*app.use(function(req, res, next){
    //console.log(req.session.id);
    if(req.session.login || notRestricted.includes(req.url)){
        console.log("You got it!")
        next();
    }else{
        console.log("failed");
        res.send("You need to log in");
    }
  })*/
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
  app.use(function (req, res, next) {
    console.log(req.session.id);
    console.log(req.session.login);
    console.log(parseurl(req).pathname);
    console.log("");
    if (!req.session.views) {
   
      req.session.views = {}
    }
   
    // get the url pathname
    var pathname = parseurl(req).pathname
   
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
   // console.log("Allossofmpegmv");
    next()
})
app.use(express.json());
require("./routes/registration.js")(app,pool);
require("./routes/hembesok.js")(app, pool);
require("./routes/dvard.js")(app,pool);
require("./routes/mottag.js")(app,pool);
require("./routes/login.js")(app,pool);

var parseurl = require("parseurl")

   


  app.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
  })
   
  app.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
  })


// ROUTES
app.get("/patients", async(req, res) => {
    try {
        const allProtocols = await pool.query("SELECT id, dateOfBirth :: TEXT FROM Example");
        res.json(allProtocols.rows);
    } catch(err) {
        console.error(err);
    }
})

app.listen(5000, () => {
    console.log("server has started on port 5000");
})

