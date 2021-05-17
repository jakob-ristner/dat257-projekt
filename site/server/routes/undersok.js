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
}