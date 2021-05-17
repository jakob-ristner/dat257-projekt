import React, {Fragment, useEffect, useState} from 'react';
import layout from "../cssModules/Login.module.css";

const LoginView = ()  => {
    

    return(
        <Fragment>
             <form>
                <div className={layout.mainLayout}>
                    <h1 className={layout.mainHeader}>Neonatal Hemsjukvård</h1>
                    <h2 className={layout.subHeader}>Inloggning</h2>
                
                    <input type="text" placeholder="Användarnamn"></input>
                    <input type="text" placeholder="Lösenord"></input>
                    <button className={layout.loginButton}>Logga in</button>
                
                    <a href="/forgot-password">Glömt lösenord?</a>
                </div>
            </form>
        </Fragment>
    )
}


export default LoginView;
