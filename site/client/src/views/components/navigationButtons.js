import React from 'react'

import "./navigationButtons.css";


const Navigation = (params) => {
    const { id } = params;
    const getNavigationHome = () => {
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/home/";
            }}> Home </button>
        )
    }
    const getNavigationInskrivning = () => {
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/inskrivning/" + id;
            }}> Inskrivning </button>
        )
    }
    const getNavigationHembesok = () => {
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/hembesok/" + id;
            }}> Hembesok </button>
        )
    }
    const getNavigationDigitalaVardmot = () => {
        return (
            <button class = "navigationButton"  onClick={() => {
                window.location = "/digitalvardmote/" + id;
            }}> Digitalvardmote </button>
        )
    }
    const getNavigationMottagningBesok = () => {
        return (
            <button class = "navigationButton" onClick={() => {
                window.location = "/mottagnignsBesok/" + id;
            }}> Mottagningsbesok </button>
        )
    }
    const getNavigationAterlaggning = () => {
        return (
            <button class = "navigationButton" onClick={() => {
                window.location = "/aterlaggning/" + id;
            }}> Aterlaggning </button>
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
            <div class = "mottagningDiv">
            {getNavigationMottagningBesok()}
            </div>
            </div>
            <div class = "aterlaggningDiv">
            {getNavigationAterlaggning()}
            </div>
            

          </div>
            
        );
    }
    
export default Navigation;


