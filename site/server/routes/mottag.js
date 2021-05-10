module.exports = function(app, pool){


    app.get("/mottagningsbesok/:protocolID", async(req, res) => {
        try {
            const {protocolID} = req.params;
            const allNavMott = await pool.query(
            `SELECT 
                id, to_char(date_start_time, 'HH24:MI') AS start_time, 
                to_char(date_start_time, 'yyyy-mm-dd') AS date,
                to_char(end_time, 'HH24:MI') AS end_time, performed_by, amning_nutrition, stodsamtal, 
                viktkontroll, provtagning, lakemedel, annat_mote, lakare, logoped, dietist, kurator, 
                annan_resurs, av_logistik, av_barn_familj, av_personal, av_beskrivning
                FROM Mottag
                WHERE protocolID = $1 ORDER BY date_start_time DESC
            `, [protocolID]);

            res.json(allNavMott.rows);

        } catch (err) {
            console.error(err);
        }
        
    })
}
