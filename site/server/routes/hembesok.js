module.exports = function(app, pool) {
    app.get("/hembesok/:id", async(req, res) => {
        try {
            const { id } = req.params;
            const allHembesok  = await pool.query(
                `SELECT to_char(at_family, 'HH24:MI') AS at_family, 
                to_char(from_family, 'HH24:MI') AS from_family, 
                to_char(from_family, 'yyyy-mm-dd') AS date,
                amining_nutrition,
                stodsamtal,
                viktkontroll,
                provtagning,
                lakemedel,
                annan_åt,
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
}
