module.exports = function(app, pool) {
    
    //get hembesok
    app.get("/hembesok/:id", async(req, res) => {
        try {
            const { id } = req.params;
            const allHembesok  = await pool.query(
                `SELECT id, to_char(at_family, 'HH24:MI') AS at_family, 
                to_char(from_family, 'HH24:MI') AS from_family, 
                to_char(from_family, 'yyyy-mm-dd') AS date,
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annan_at,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik,
                av_barn_familj,
                av_personal,
                av_beskrivning,
                performed_by FROM Hembesok 
                WHERE protokollnr = $1 
                ORDER BY from_family DESC`, [id]);

            res.json(allHembesok.rows);
        } catch(err) {
            console.error(err);
        }
    })

    //add hembesok
	app.post("/hembesok/:protokollnr", async(req, res) => {
		try {
			
			const {protokollnr} = req.params;
            console.log(protokollnr);
            const {at_family, from_family, performed_by, amning_nutrition, stodsamtal, viktkontroll, provtagning, lakemedel,annan_at,lakare,logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik, 
                av_barn_familj,
                av_personal,
                av_beskrivning} = req.body;
			const newHembesok = await pool.query(
			`INSERT INTO Hembesok (protokollnr, 
                at_family, 
                from_family, 
                performed_by, 
                amning_nutrition, 
                stodsamtal, 
                viktkontroll, 
                provtagning, 
                lakemedel,
                annan_at,
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
			VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`, [protokollnr, 
                at_family, from_family, performed_by, amning_nutrition, stodsamtal, viktkontroll, provtagning, lakemedel,annan_at,lakare,logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik, 
                av_barn_familj,
                av_personal,
                av_beskrivning]);

			res.json(newHembesok.rows);
		} catch (err) {
			console.error(err.message);
		}
	});


    //get previous hembesok
    app.get("/hembesok/edit/:id", async (req, res) => {
        try {
            const {id} = req.params;
            console.log(id);
            const {protokollnr} = req.body;
            const getEHemb = await pool.query(
                `SELECT protokollnr,
                to_char(at_family, 'HH24:MI') AS at_family, 
                to_char(from_family, 'HH24:MI') AS from_family, 
                to_char(from_family, 'yyyy-mm-dd') AS date,
                performed_by, 
                amning_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annan_at,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                av_logistik,
                av_barn_familj,
                av_personal,
                av_beskrivning,
                performed_by
                FROM Hembesok
                WHERE id = $1`, [id] 
            );
            res.json(getEHemb.rows);
        } catch (err) {
            console.error(err.message);
        }
    });


    //Edit hembesok
    app.put("/hembesok/edit/:id", async (req, res) => {

        try {
            const {id} = req.params;
            console.log(id);
            const {at_family, from_family, performed_by, 
                amning_nutrition, stodsamtal, viktkontroll, provtagning, 
                lakemedel,annan_at,lakare,logoped, dietist, annan_resurs,
                av_logistik, av_barn_familj, av_personal, av_beskrivning, kurator} = req.body;
           // console.log(body);
            const updateHembesok = await pool.query(
            `UPDATE Hembesok 
            SET at_family = $2, 
            from_family = $3,
            performed_by = $4,
            amning_nutrition = $5, 
            stodsamtal = $6,
            viktkontroll = $7,
            provtagning = $8, 
            lakemedel = $9,
            annan_at = $10,
            lakare = $11,
            logoped = $12,
            dietist = $13,
            annan_resurs = $14,
            av_logistik = $15,
            av_barn_familj = $16,
            av_personal = $17,
            av_beskrivning = $18,
            kurator = $19
            WHERE id =$1`, [id, at_family, from_family, performed_by, amning_nutrition, stodsamtal, viktkontroll, 
                provtagning, lakemedel,annan_at,lakare,logoped,
                dietist,
                annan_resurs,
                av_logistik, 
                av_barn_familj,
                av_personal,
                av_beskrivning, kurator]);
            
            res.json("Updated"); // updateHembesok, rows

        } catch (err) {
            console.error(err.message);
        } 
    });

}
