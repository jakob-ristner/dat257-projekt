module.exports = function(app, pool) {
    app.get("/startsida", async (req, res) => {
        try {
           const {protocolID} = req.body;
          const getPro = await pool.query(
               `SELECT protocolID
               FROM Registration` 
            );
            res.json(getPro.rows);
        } catch (err) {
            console.error(err.message);
        }
    });
}