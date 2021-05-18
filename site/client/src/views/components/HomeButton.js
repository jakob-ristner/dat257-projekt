import React, {Fragment} from 'react'
import "./HomeButton.css";
import {ReactSession} from "react-client-session"

const getLogout = () => {
    return ( <button className="home" id="logout" onClick={logout}>Logga ut</button> );
}

const logout = () => {
    ReactSession.remove("id");
    window.location = "/login";
}



const getNavigationHome = () => {
    return (
        <Fragment>
        <button class = "home"  onClick={() => {
            window.location = "/";
        }}> Home </button>
        {getLogout()}
        </Fragment>
    )
}
export default getNavigationHome;
