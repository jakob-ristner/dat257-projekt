import React from 'react'


const Navigation = (params) => {
    const { id } = params;
    const getNavigationHome = () => {
        return (
            <button class="mybutton" onClick={() => {
                window.location = "/home/";
            }}> Home </button>
        )
    }
    const getNavigationHembesok = () => {
        return (
            <button class="hembesok" onClick={() => {
                window.location = "/hembesok/" + id;
            }}> Hembesok </button>
        )
    }
    const getNavigationDigitalaVardmot = () => {
        return (
            <button class="digitalVard" onClick={() => {
                window.location = "/digitalvardmote/" + id;
            }}> Digitalvardmote </button>
        )
    }
        return(
            <div class="navigation"> 
            {getNavigationHembesok()}
            {getNavigationDigitalaVardmot()}
            {getNavigationHembesok()}
            </div>
            
        );
    }
    
export default Navigation;


