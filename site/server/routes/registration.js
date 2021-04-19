module.exports = function(app, pool){

    app.post("/registration", async(req, res) => {
        try {
            console.log(req.body);
            const {protocolID, regDate, outDate, reason, ifyllnadkollad, registrerad,
                veckor, dagar, vikt_fodelse, langd_fodelse, 
                huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                infart_in, andningsstod_in, extraGas_in, riskpatient, bvcRapportering, bvcText
                } = req.body;
       
            
            const newReg = await pool.query(
                `INSERT INTO registration (protocolID, regDate, outDate, reason, ifyllnadkollad, registrerad,
                    veckor, dagar, vikt_fodelse, langd_fodelse, 
                    huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                    huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                    infart_in, andningsstod_in, extraGas_in, riskpatient, 
                    bvcRapportering, bvcText) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, 
                        $10, $11, $12, $13, $14, $15, $16, $17, 
                        $18, $19, $20, $21, $22, $23) RETURNING *`,
                [protocolID, regDate, outDate, reason, ifyllnadkollad, registrerad,
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
            `SELECT protocolID, regDate :: text, outDate :: text, reason, ifyllnadkollad, registrerad,
            veckor, dagar, vikt_fodelse, langd_fodelse, 
            huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
            huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
            infart_in, andningsstod_in, extraGas_in, riskpatient, 
            bvcRapportering, bvcText
            FROM Registration WHERE protocolID = $1`, [id]
            );
                res.json(allRegistrations.rows);
        } catch(e) {
            console.error(e.message);
        }


    });
//`SELECT protocolID, regdate :: text, reason 
//  FROM Registration WHERE protocolID = $1`
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


    //UTSKRIVNING
    app.post("/discharge/:id", async(req, res) => {
        try {
            const {id} = req.params;
            const {vikt_utskrivning, 
                langd_utskrivning, 
                huvudomfang_ut,
                mamma_vill_amma_ut,
                amning_utskrivning,
                erhaller_bmjolk_ut, 
                v_sond_ut, 
                infart_ut, 
                andningsstod_ut, 
                extraGas_ut} = req.body;

                const newDischarge = await pool.query(
                    `INSERT INTO Discharge VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, 
                        [id,
                        vikt_utskrivning, 
                        langd_utskrivning, 
                        huvudomfang_ut,
                        mamma_vill_amma_ut,
                        amning_utskrivning,
                        erhaller_bmjolk_ut, 
                        v_sond_ut, 
                        infart_ut, 
                        andningsstod_ut, 
                        extraGas_ut]
                );

                res.json(newDischarge.rows[0]);

        } catch (e) {
            console.error(e);
        }
    });
}

/**
 *  vikt_utskrivning INT CHECK (vikt_utskrivning >= 0),
    langd_utskrivning FLOAT CHECK (langd_utskrivning >= 0),
    huvudomfang_ut FLOAT CHECK (huvudomfang_ut >= 0),
    mamma_vill_amma_ut BOOLEAN,
    amning_utskrivning CHAR(2) CHECK (amning_utskrivning IN ('H', 'D', 'IA')),
    erhaller_bmjolk_ut CHAR(2) CHECK (erhaller_bmjolk_ut IN ('H', 'D', 'IA')), 
    v_sond_ut BOOLEAN,
    infart_ut TEXT,
    andningsstod_ut TEXT,
    extraGas_ut BOOLEAN
 */