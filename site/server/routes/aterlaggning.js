module.exports = function(app, pool){

    app.put("/aterlaggning/add/:id", async(req, res) => {
        try{
            const{id} = req.params;
            const{
             aterlaggning_startdate,
             orsak
            } = req.body;
    
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
}
