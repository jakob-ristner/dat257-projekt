module.exports = function(app, pool){

    app.post("/registration", async(req, res) => {
        try {
            console.log(req.body);
            const {protocolID, regDate, reason} = req.body;
       
            
            const newReg = await pool.query(
                "INSERT INTO registration (protocolID, regDate, reason) VALUES($1, $2, $3) RETURNING *",
                [protocolID, regDate, reason] //regDate,
            );
            res.json(newReg.rows[0]);

        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/registration/:id", async(req, res)=> {

        try {
            const {id} = req.params;
            const allRegistrations = await pool.query(
            `SELECT protocolID, regdate :: text, reason 
            FROM Registration WHERE protocolID = $1`, [id]
            );
                res.json(allRegistrations.rows);
        } catch(e) {
            console.error(e.message);
        }


    });

    app.put("/registration/:id", async(req, res) => {
        try {
            const {id} = req.params;
            const updateReg = await pool.query(
                //Write query here
                "$1", [id]
            );
            res.json(updateReg, rows);

        } catch (error) {
            console.error(error);
        }
    })

}