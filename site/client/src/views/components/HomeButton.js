import React from 'react'
import "./HomeButton.css";
const getNavigationHome = () => {
    return (
        <button class = "home"  onClick={() => {
            window.location = "/";
        }}> Home </button>
    )
}
export default getNavigationHome;