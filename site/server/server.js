const express = require("express");
const cors = require("cors");
var session = require('express-session');
const app = express();
const pool = require("./db");

 
app.use(cors());

app.use(session({
    secret: 'diamond pickaxe',
    resave: false,
    saveUninitialized: false
}))

app.use(express.json());

require("./routes/registration.js")(app,pool);
require("./routes/hembesok.js")(app, pool);
require("./routes/dvard.js")(app,pool);
require("./routes/mottag.js")(app,pool);
require("./routes/login.js")(app,pool);

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

