module.exports = function(app, pool){

    app.post("/registration", async(req, res) => {
        try {
            console.log(req.body);
            const {protocolID, regDate, reason, ifyllnadkollad, registrerad,
                veckor, dagar, vikt_fodelse, langd_fodelse, 
                huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                infart_in, andningsstod_in, extraGas_in, riskpatient, bvcRapportering, bvcText
                } = req.body;
       
            
            const newReg = await pool.query(
                `INSERT INTO registration (protocolID, regDate, reason, ifyllnadkollad, registrerad,
                    veckor, dagar, vikt_fodelse, langd_fodelse, 
                    huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                    huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                    infart_in, andningsstod_in, extraGas_in, riskpatient, 
                    bvcRapportering, bvcText) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, 
                        $10, $11, $12, $13, $14, $15, $16, $17, 
                        $18, $19, $20, $21, $22) RETURNING *`,
                [protocolID, regDate, reason, ifyllnadkollad, registrerad,
                    veckor, dagar, vikt_fodelse, langd_fodelse, 
                    huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                    huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                    infart_in, andningsstod_in, extraGas_in, riskpatient, 
                    bvcRapportering, bvcText] //regDate,
            );
            res.json(newReg.rows[0]);

        } catch (error) {
            console.error(error.message);
        }
    });

    app.get("/registration/:id", async(req, res)=> {

        try {
            const {id} = req.params;
            const allRegistrations = await pool.query(
            `SELECT protocolID, regdate :: text, reason 
            FROM Registration WHERE protocolID = $1`, [id]
            );
                res.json(allRegistrations.rows);
        } catch(e) {
            console.error(e.message);
        }


    });

    app.put("/registration/:id", async(req, res) => {
        try {
            const {id} = req.params;
            const {regDate, reason} = req.body;

            const updateReg = await pool.query(
                //Write query here
                `UPDATE registration 
                SET regdate = $1, reason = $2
                WHERE protocolid = $3`
                , [regDate, reason, id]
            );
            res.json(updateReg, rows);

        } catch (error) {
            console.error(error);
        }
    });

}