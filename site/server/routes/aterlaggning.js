module.exports = function(app, pool){

    app.get("/aterlaggning/:protocolID", async(req, res) => {
        try {
            const {protocolID} = req.params;
            const allNavUnder = await pool.query(
            `SELECT 
                id,
                to_char(aterlaggning_startdate, 'yyyy-mm-dd') AS aterlaggning_startdate, 
                annat FROM Aterlaggning
                WHERE protocolID = $1 ORDER BY aterlaggning_startdate DESC
            `, [protocolID]);

            res.json(allNavAterlaggning.rows);

        } catch (err) {
            console.error(err);
        }

    })
    
    /*
    app.put("/aterlaggning/:id", async(req, res) => {
        try{
            
            const{id} = req.params;
            const{
             aterlaggning_startdate,
             orsak
            } = req.body;
            
            const { id } = req.params;
            const updateMottagning = await pool.query(
                `INSERT INTO addAterlaggning (
                    protocolID,
                    aterlaggning_startdate,
                    orsak) 
                    VALUES ($1, $2, $3) RETURNING *`,
                    [
                        protcolID,
                        aterlaggning_startdate,
                        orsak
                    ]
            );

        } catch (error) {
            console.error(error);
        }
    });


app.put("/aterlaggning/end/:id", async(req, res) => {
    try{
        const{id} = req.params;
        const{
         
        } = req.body;
        const updateMottagning = await pool.query(
            `INSERT INTO endAterlaggning (
                protocolID,
                aterlaggning_enddate,
                utskrivning_hemmet) 
                VALUES ($1, $2, $3) RETURNING *`,
                [
                    protcolID,
                    aterlaggning_enddate,
                    utskrivning_hemmet
                ]
        );


    } catch (error) {
        console.error(error);
    }
});
*/

}
