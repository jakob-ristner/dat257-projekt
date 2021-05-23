import React from 'react'
import "./HomeButton.css";
const getNavigationHome = () => {
    return (
        <button class = "home"  onClick={() => {
            window.location = "/startsida";
        }}> Home </button>
    )
}
export default getNavigationHome;