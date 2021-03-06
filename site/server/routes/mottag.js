module.exports = function(app, pool){


//Put request for updating the mottagningsbesok form.
app.put("/mottagningsbesok/:id", async (req, res) => {
    try {
        const{id} = req.params;
        const{
            date,
            start_time,
            end_time,
            performed_by,
            amning_nutrition,
            stodsamtal,
            viktkontroll,
            provtagning,
            lakemedel,
            annat_mote,
            lakare,
            logoped,
            dietist,
            kurator,
            annan_resurs,
            av_logistik,
            av_barn_familj,
            av_personal,
            av_beskrivning
        } = req.body;

        const date_start_time = date + " " + start_time;

        const updateMottagning = await pool.query(
            `UPDATE Mottag SET
            date_start_time = $2,
            end_time = $3,
            performed_by = $4,
            amning_nutrition = $5,
            stodsamtal = $6,
            viktkontroll = $7,
            provtagning = $8,
            lakemedel = $9,
            annat_mote = $10,
            lakare = $11,
            logoped = $12,
            dietist = $13,
            kurator = $14,
            annan_resurs = $15,
            av_logistik = $16,
            av_barn_familj = $17,
            av_personal = $18,
            av_beskrivning = $19
            WHERE id = $1`, [
                id,
                date_start_time, 
                end_time,
                performed_by,
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annat_mote,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik,
                av_barn_familj,
                av_personal,
                av_beskrivning
            ]);

            res.json("Updated"); //Response to frontend

    } catch (error) {
        console.error(error);
    }
    });


    //GET request for ONE mottagningsbesok 
app.get("/mottagningsbesok/edit/:id", async(req, res) => {
        try {
            const {id} = req.params;
            const oneBesok = await pool.query(
                `SELECT 
                protocolID,
                to_char(date_start_time, 'yyyy-mm-dd') AS date,
                to_char(date_start_time, 'HH24:MI') AS start_time,
                to_char(end_time, 'HH24:MI') AS end_time,
                performed_by,
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annat_mote,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik,
                av_barn_familj,
                av_personal,
                av_beskrivning
                FROM Mottag
                WHERE id = $1
                `, [id]
            );

            res.json(oneBesok.rows[0]);

        } catch (e) {
            console.error(e);
        }
    });


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
//add motagg

app.post("/mottagningsbesok/add/:protocolID", async(req, res) => {
    try {
        const {protocolID} = req.params;
        //console.log(protocolID);
        const {
                date_start_time, 
                end_time,
                performed_by,
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annat_mote,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik,
                av_barn_familj,
                av_personal,
                av_beskrivning
        } = req.body;

        const newMottagningsbesok= await pool.query(
            `INSERT INTO mottag (
                protocolID,
                date_start_time,
                end_time,
                performed_by,
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annat_mote,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,               
                av_logistik,
                av_barn_familj,
                av_personal, 
                av_beskrivning
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17 , $18 , $19 ) RETURNING *`,
                [
                    protocolID,
                    date_start_time,
                    end_time,
                    performed_by,
                    amning_nutrition,
                    stodsamtal,
                    viktkontroll,
                    provtagning,
                    lakemedel,
                    annat_mote,
                    lakare,
                    logoped,
                    dietist,
                    kurator,
                    annan_resurs,
                    av_logistik,
                    av_barn_familj,
                    av_personal, 
                    av_beskrivning
                ]
                );

                res.json(newMottagningsbesok.rows);
            } catch (e) {
                console.error(e);
            }
        })

        

}

