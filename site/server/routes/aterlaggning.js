module.exports = function(app, pool){

    app.get("/aterlaggning/:protocolID", async(req, res) => {
        try {
            const {protocolID} = req.params;
            const allNavAterlaggning = await pool.query(
            `SELECT 
                id,
                to_char(aterlaggning_startdate, 'yyyy-mm-dd') AS startdate, 
                to_char(aterlaggning_enddate, 'yyyy-mm-dd') AS enddate, 
                utskrivning_hemmet,
                orsak FROM Aterlaggning
                WHERE protocolID = $1 ORDER BY startdate DESC
            `, [protocolID]);

            res.json(allNavAterlaggning.rows);

        } catch (err) {
            console.error(err);
        }

    })
    
    //add aterlaggning
    app.post("/aterlaggning/:protocolID", async(req, res) => {
        try{
            const{protocolID} = req.params;
            //console.log(protocolID);
            const{
             aterlaggning_startdate,
             orsak
            } = req.body;
        
            const addAterlaggning = await pool.query(
                `INSERT INTO Aterlaggning (
                    protocolID,
                    aterlaggning_startdate,
                    orsak) 
                    VALUES ($1, $2, $3) RETURNING *`,
                    [
                        protocolID,
                        aterlaggning_startdate,
                        orsak
                    ]
            );

        res.json(addAterlaggning.rows);
        } catch (error) {
            console.error(error);
        }
    });


app.put("/aterlaggning/end/:protocolID", async(req, res) => {
    try{
        const{protocolID} = req.params;
        const{
            aterlaggning_enddate,
            utskrivning_hemmet
         
        } = req.body;
        const addEndAterlaggning = await pool.query(
            `UPDATE Aterlaggning SET aterlaggning_enddate = $2, utskrivning_hemmet = $3 WHERE protocolID = $1`,
                [
                    protocolID,
                    aterlaggning_enddate,
                    utskrivning_hemmet
                ]
        );
        console.log(hej);
        res.json(addEndAterlaggning);
    } catch (error) {
        console.error(error);
    }
});

}
