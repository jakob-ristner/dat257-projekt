module.exports = function(app, pool){

    
    app.get("/undersokning/:protocolID", async(req, res) => {
        try {
            const {protocolID} = req.params;
            const allNavUnder = await pool.query(
            `SELECT 
                id,
                to_char(undersok_date, 'yyyy-mm-dd') AS undersok_date
                ,ultraljud_hjarta, lakarbesok, 
                ogonundersokning, ortopedkonsult, oronundersokning, annat
                FROM Undersok
                WHERE protocolID = $1 ORDER BY undersok_date DESC
            `, [protocolID]);

            res.json(allNavUnder.rows);

        } catch (err) {
            console.error(err);
        }
        
    })
    app.post("/undersokning/:protocolID", async(req, res) => {
		try {
			
			const {protocolID} = req.params;
            const {undersok_date, 
                ultraljud_hjarta, 
                lakarbesok,
                ogonundersokning, 
                ortopedkonsult, 
                oronundersokning, 
                annat} = req.body;
			const newUndersok = await pool.query(
			`INSERT INTO Undersok (protocolID, 
                undersok_date, 
                ultraljud_hjarta, 
                lakarbesok, 
                ogonundersokning, 
                ortopedkonsult, 
                oronundersokning, 
                annat) 
			VALUES($1, $2, $3, $4, $5, $6, $7, $8)`, [protocolID, 
                undersok_date, 
                ultraljud_hjarta, 
                lakarbesok,
                ogonundersokning, 
                ortopedkonsult, 
                oronundersokning, 
                annat]);

			res.json(newUndersok.rows);
		} catch (err) {
			console.error(err.message);
		}
	});
}