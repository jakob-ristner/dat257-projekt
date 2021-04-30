module.exports = function(app, pool) {
    app.post("/digitalt-vardmote/add/:protocolID", async(req,res) => {
        try {
            const{protocolID} = req.params;

            const{
                date_start_time,
                end_time,
                performed_by,
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                annat_mote,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                avvikelse
            } = req.body;
            
            const newVardmote = await pool.query(
                `INSERT INTO Dvard (
                    protocolID,
                    date_start_time,
                    end_time,
                    performed_by,
                    amning_nutrition,
                    stodsamtal,
                    viktkontroll,
                    annat_mote,
                    lakare,
                    logoped,
                    dietist,
                    kurator,
                    annan_resurs,
                    avvikelse
                    )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
                [
                    protocolID,
                    date_start_time,
                    end_time,
                    performed_by,
                    amning_nutrition,
                    stodsamtal,
                    viktkontroll,
                    annat_mote,
                    lakare,
                    logoped,
                    dietist,
                    kurator,
                    annan_resurs,
                    avvikelse
                ]
            );

            res.json(newVardmote.rows);
            console.log(newVardmote.rows);
        } catch (e) {
            console.error(e);
        }
    })


    app.get("/digital-vardmote/:protocolID", async(req, res) => {
        try {
            const {protocolID} = req.params;
            const allNavdigvard = await pool.query(
            `SELECT 
                id, to_char(date_start_time, 'HH24:MI') AS start_time, 
                to_char(date_start_time, 'yyyy-mm-dd') AS date,
                to_char(end_time, 'HH24:MI') AS end_time, performed_by, amning_nutrition, stodsamtal, 
                viktkontroll, annat_mote, lakare, logoped, dietist, kurator, annan_resurs, avvikelse
                FROM Dvard
                WHERE protocolID = $1 ORDER BY date_start_time DESC
            `, [protocolID]);

            res.json(allNavdigvard.rows);

        } catch (err) {
            console.error(err);
        }
        
    })

}

