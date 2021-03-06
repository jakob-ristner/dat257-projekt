import React, {Fragment} from 'react'
import "./HomeButton.css";
import {ReactSession} from "react-client-session"

const getLogout = () => {
    return ( <button className="home" id="logout" onClick={logout}>Logga ut</button> );
}

const logout = async () => {
    await fetch("http://localhost:5000/logout", { credentials: 'include'});
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
