import React, {Fragment, useEffect, useState} from 'react';
import layout from "../cssModules/Login.module.css";
import {ReactSession} from 'react-client-session';

const LoginView = ()  => {
    const [email, setEmail] = useState();
    const [verified, setVerified] = useState(true);
    const [password, setPassword] = useState();
    

    const login = async(e) => {
        e.preventDefault();
        const body = {email, password};
        const response = await fetch("http://localhost:5000/login", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
            credentials: 'include'
        })
        const jsonData = await response.json();
        setVerified(jsonData.verified); 
        if (jsonData.verified) {
            // TODO put id in session cookie
            ReactSession.set("id", jsonData.id);
            window.location = "/";
        } 

        console.log(jsonData);
    }

    const getError = () => {
        if (!verified) {
            return (<h3>Fel uppgifter</h3>);
        }
    }
    
    return(
        <Fragment>
             <form onSubmit={login}>
                <div className={layout.mainLayout}>
                    <h1 className={layout.mainHeader}>Neonatal Hemsjukvård</h1>
                    <h2 className={layout.subHeader}>Inloggning</h2>
                    {getError()}
                
                    <input type="text" required placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" required placeholder="Lösenord" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button className={layout.loginButton}>Logga in</button>
                
                    <a href="/forgot-password">Glömt lösenord?</a>
                </div>
            </form>
        </Fragment>
    )
}


export default LoginView;
