module.exports = function(app, pool) {
    app.get("/hembesok/:id", async(req, res) => {
        try {
            const { id } = req.params;
            const allHembesok  = await pool.query(
            `SELECT * FROM Hembesok 
            WHERE protokollnr = $1`, [id]);

            res.json(allHembesok.rows);
        } catch(err) {
            console.error(err);
        }
    })
}
