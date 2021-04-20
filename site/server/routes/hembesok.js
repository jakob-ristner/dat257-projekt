module.exports = function(app, pool) {
    
    //get hembesok
    app.get("/hembesok/:id", async(req, res) => {
        try {
            const { id } = req.params;
            const allHembesok  = await pool.query(
                `SELECT to_char(at_family, 'HH24:MI') AS at_family, 
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
                annan_resurs,
                av_logistik, 
                av_barn_familj,
                av_personal,
                av_beskrivning
                ) 
			VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, [protokollnr, 
                at_family, from_family, performed_by, amning_nutrition, stodsamtal, viktkontroll, provtagning, lakemedel,annan_at,lakare,logoped,
                dietist,
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

    //Edit hembesok
    app.put("/hembesok/:idnr", async (req, res) => {

        try {
            const {idnr} = req.params;
            console.log(idnr);
            const {at_family, from_family, performed_by} = req.body;
           // console.log(body);
            const updateHembesok = await pool.query(
            `UPDATE Hembesok 
            SET at_family = $1, 
            from_family = $3,
            performed_by = $4 
            WHERE idnr =$2`, [at_family, idnr, from_family, performed_by]);
            
            res.json("Updated"); // updateHembesok, rows

        } catch (err) {
            console.error(err.message);
        } 
    });

        /*
            const {
             protokollnr, id, at_family, from_family, performed_by, 
             amning_nutrition, stodsamtal, viktkontroll, provtagning, 
             lakemedel,annan_at,lakare,logoped, dietist, annan_resurs,
             av_logistik, av_barn_familj, av_personal, av_beskrivning} 
             = req.body;

            `UPDATE Hembesok 
            SET at_family = $2,  
            WHERE protokollnr =$2 AND id = $11`, [at_family, protokollnr, id]);



    */
}
