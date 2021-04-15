import React from 'react'

import "./navigationButtons.css";


const Navigation = (params) => {
    const { id } = params;

    const isInPath = (path) => {
        if(window.location.pathname.split("/")[1] == path){
            return true;
        }
        return false;
        
    }
    const getNavigationHome = () => {
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/home/";
            }}> Home </button>
        )
    }
    const getNavigationInskrivning = () => {
        if (isInPath("Inskrivning")) {
            return (
            <button disabled class = "navigationButton"  onClick={() => {
                window.location = "/inskrivning/" + id;
            }}> Inskrivning </button>
            )
        }
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/inskrivning/" + id;
            }}> Inskrivning </button>
        )
    }
    const getNavigationHembesok = () => {
        if (isInPath("hembesok")) {
            return (
            <button disabled class = "navigationButton"  onClick={() => {
                window.location = "/hembesok/" + id;
            }}> Hembesök </button>
            )
        }
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/hembesok/" + id;
            }}> Hembesök </button>
        )
    }
    const getNavigationDigitalaVardmot = () => {
        if (isInPath("digitalvardmote")) {
            return (
            <button disabled class = "navigationButton"  onClick={() => {
                window.location = "/digitalvardmote/" + id;
            }}> Digital Vårdmöte </button>
            )
        }
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/digitalvardmote/" + id;
            }}> Digitalt Vårdmöte </button>
        )
    }
    const getNavigationMottagningBesok = () => {
        if (isInPath("mottagningsbesok")) {
            return (
            <button disabled class = "navigationButton"  onClick={() => {
                window.location = "/mottagningsbesok/" + id;
            }}> Mottagningsbesök </button>
            )
        }
        return (
            <button class = "navigationButton" onClick={() => {
                window.location = "/mottagnignsbesok/" + id;
            }}> Mottagningsbesök </button>
        )
    }
    const getNavigationAterlaggning = () => {
        if (isInPath("aterlaggning")) {
            return (
            <button disabled class = "navigationButton"  onClick={() => {
                window.location = "/aterlaggning/" + id;
            }}> Digital Vårdmöte </button>
            )
        }
        return (
            <button class = "navigationButton" onClick={() => {
                window.location = "/aterlaggning/" + id;
            }}> Återläggning </button>
        )
    }
        return(
         <div class="navigation"> 
            
            <div class = "inskrivningDiv">
            {getNavigationInskrivning()}
            </div>
            <div class = "hembesokDiv">
            {getNavigationHembesok()}
            </div>
            <div class = "digitalVard">
            {getNavigationDigitalaVardmot()}
            </div>
            <div class = "mottagningDiv">
            {getNavigationMottagningBesok()}
            </div>
            <div class = "aterlaggningDiv">
            {getNavigationAterlaggning()}
            </div>
            

          </div>
            
        );
    }
    
export default Navigation;


