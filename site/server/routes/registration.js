module.exports = function(app, pool){

    app.post("/registration", async(req, res) => {
        try {
            console.log(req.body);
            const {protocolID, regDate, reason,
                veckor, dagar, vikt_fodelse, langd_fodelse, 
                huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                infart_in, andningsstod_in, extraGas_in, riskpatient, bvcRapportering, bvcText
                } = req.body;
       
            
            const newReg = await pool.query(
                `INSERT INTO registration (protocolID, regDate, reason,
                    veckor, dagar, vikt_fodelse, langd_fodelse, 
                    huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
                    huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
                    infart_in, andningsstod_in, extraGas_in, riskpatient, 
                    bvcRapportering, bvcText) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, 
                        $10, $11, $12, $13, $14, $15, $16, $17, 
                        $18, $19, $20) RETURNING *`,
                [protocolID, regDate, reason, veckor, 
                    dagar, vikt_fodelse, langd_fodelse, 
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
            `SELECT protocolID, regDate :: text, reason,
            veckor, dagar, vikt_fodelse, langd_fodelse, 
            huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
            huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
            infart_in, andningsstod_in, extraGas_in, riskpatient, 
            bvcRapportering, bvcText, erhaller_bmjolk_in
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
            const {regDate, reason, veckor,dagar,vikt_fodelse
            ,langd_fodelse,huvudomfang_fodelse,vikt_in,langd_in,huvud_in, vill_amma_in
            ,amning_in, bmjolk_in, vsond_in, andning_in, syrgas_in
            ,riskpatient,bvc_rap,bvc_text} = req.body;
            /*
            const {vikt_utskrivning, langd_utskrivning, huvudomfang_ut, mamma_vill_amma_ut
            ,amning_utskrivning,erhaller_bmjolk_ut,v_sond_ut, infart_ut,andningsstod_ut,extraGas_ut} = req.body;
            */
            const updateReg = await pool.query(
                //Write query here
                `UPDATE registration 
                SET regdate = $2, reason = $3, veckor = $4 , dagar = $5, vikt_fodelse = $6, 
                langd_fodelse = $7, huvudomfang_fodelse = $8, vikt_inskrivning = $9, langd_inskrivning = $10,
                huvudomfang_in = $11, mamma_vill_amma = $12, amning_inskrivning = $13, erhaller_bmjolk_in = $14,
                v_sond_in = $15, andningsstod_in = $16, extraGas_in = $17, riskpatient = $18, bvcRapportering = $19,
                bvcText = $20
                WHERE protocolid = $1`
                ,[id, regDate, reason, veckor,dagar,vikt_fodelse
                ,langd_fodelse,huvudomfang_fodelse,vikt_in,langd_in,huvud_in, vill_amma_in
                ,amning_in, bmjolk_in, vsond_in, andning_in, syrgas_in
                ,riskpatient,bvc_rap,bvc_text]
            );
            res.json(updateReg);

        } catch (error) {
            console.error(error);
        }
    });
    app.put("/discharge/:id", async(req, res) => {
        try {
            const {id} = req.params;
           
            const {vikt_ut, langd_ut, huvud_ut, vill_amma_ut
            ,amning_ut,bmjolk_ut,vsond_ut, infart_ut,andning_ut,syrgas_ut, date_ut} = req.body;
            
            const updateReg = await pool.query(
                //Write query here
                `UPDATE Discharge 
                SET vikt_utskrivning = $2, langd_utskrivning = $3,
                huvudomfang_ut = $4, mamma_vill_amma_ut = $5, amning_utskrivning = $6, erhaller_bmjolk_ut = $7,
                v_sond_ut = $8, andningsstod_ut = $9, extraGas_ut = $10, infart_ut = $11, outdate = $12
                WHERE protocolid = $1`
                ,[id, vikt_ut, langd_ut, huvud_ut, vill_amma_ut
                ,amning_ut,bmjolk_ut,vsond_ut,andning_ut,syrgas_ut, infart_ut, date_ut]
            );
            res.json(updateReg);

        } catch (error) {
            console.error(error);
        }
    });




    //UTSKRIVNING
    app.post("/discharge/:id", async(req, res) => {
        try {
            const {id} = req.params;
            const {outDate,
                vikt_utskrivning, 
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
                    `INSERT INTO Discharge VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`, 
                        [id,
                        outDate,
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

    app.get("/discharge/:id", async(req, res)=> {

        try {
            const {id} = req.params;
            const allDischarge = await pool.query(
                `SELECT protocolID, outDate :: text, vikt_utskrivning, langd_utskrivning, huvudomfang_ut,
            mamma_vill_amma_ut, amning_utskrivning, erhaller_bmjolk_ut, v_sond_ut, 
            infart_ut, andningsstod_ut, extraGas_ut
            FROM Discharge WHERE protocolID = $1`, [id]
            );
            res.json(allDischarge.rows);
        } catch(e) {
            console.error(e.message);
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
