const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

 


//middleware
app.use(cors());
app.use(express.json());

require("./routes/registration.js")(app,pool);
require("./routes/hembesok.js")(app, pool);
require("./routes/dvard.js")(app,pool);
require("./routes/mottag.js")(app,pool);
require("./routes/home.js")(app,pool);

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

