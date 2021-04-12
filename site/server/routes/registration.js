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
    })
}