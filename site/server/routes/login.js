module.exports = function(app, pool){
    app.post("/login", async (req, res) => {
        verified = false;
        try {
            const {email, password} = req.body;
            const user = await pool.query(`SELECT * FROM Login 
                WHERE email = $1`, [email]);
            if (user.rows.length != 1) {
                res.json({verified});
                return;
            } else if (user.rows[0].password === password) {
                verified = true;
                console.log(user.rows[0].id)
                res.json({verified, id: user.rows[0].id});
                return;
            } else {
                res.json({verified});
                return;
            }
        } catch (err) {
            console.error(err.message);
            res.json({verified});
        }

    });
}
