/*
IF SERVER IS RESTARTED PLEASE RESTART CLIENT SINCE 
SERVERSIDE SESSION IS DESTROYED WHILST THE CLIENT 
STILL HAS A SESSION. 
*/
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
                req.session.login = true;
                
                req.session.save(function(err){});
                console.log(req.session);
                console.log(req.session.id);
                res.json({verified, id: req.session.id});
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

//When the client logs out, 
//the cookie is destroyed. 
    app.get('/logout' , (req , res)=>{
        console.log("Logged out getter")
       res.send('Logged out')
       req.session.destroy(function(err){}); 
    });


    app.get('/login', (req, res, next) => {
        req.session.save();
       // next();
        
        res.send("Cookie?");
    })

}

