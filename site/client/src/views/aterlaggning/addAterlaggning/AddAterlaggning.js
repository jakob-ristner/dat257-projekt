import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";
import { getYesNo } from "../../../utils/inputs";
//import {validateAtgard} from "../../utils/inputs.js";

const AddAterlaggning = (useParams) => {

    const {protocolID} = useParams.match.params;

    //date
    const [aterlaggning_startdate, set_startdate] = useState("");
    const [orsak, set_orsak] = useState("");

    //end
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);

      //Method for submitting the new Aterlaggning and saving it in the Postgres Database
      const submit = async(e) => {
        e.preventDefault();

        try {
            const body ={
                aterlaggning_startdate,
                orsak
       }; 
            
            const response = await fetch("http://localhost:5000/aterlaggning/" + protocolID, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location="/aterlaggning/" + protocolID;

        } catch (err) {
            console.error(err);
            
        }
    }
    //useEffect(()=> {validateAtgard()}, []); /köra validatemulti en gång här, importera yes no?


    //Displaying the aterlaggning form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database. 
       return(
        <Fragment>

        <h1>Lägg till Återläggning för {protocolID}</h1>

         <form onSubmit={submit}>

         <div class = {layout.gridHalleluja}>

          <div><h2 className={layout.headerInfo}>Datun:</h2></div>

          <div><h2 className={layout.headerAtgard}>Orsak:</h2></div>

          <div><h2 className={layout.headerResurs}>Avslutad Återinläggning:</h2></div>

          <div> <h2 className={layout.headerAvvikning}>Avsluta/Redigera</h2></div>

          <div class={layout.info}> 
           <div class ={layout.gridInfo}>

        <div>Startdatum  <input required type="date" value={aterlaggning_startdate} onChange={(e) => {set_startdate(e.target.value)}}></input></div>

         </div>
         </div>

         <div class= {layout.atgard + " atgard"}>
            <div class ={layout.gridAtgard}>

        <div>Orsak: <input required type="text" value={orsak} onChange={(e) => {set_orsak(e.target.value)}}></input></div>

           </div>
           </div>

           <div class = {layout.resurs}> 
                <div class = {layout.gridResurs}>
        <div>Avslutningsdatum:<input required type="date" disabled></input></div>

                </div>
            </div>

            <div class= {layout.avvikning}>
                <div class = {layout.gridAvvikning}>
        <div>Utskrivning till hemmet:<input type="checkbox" disabled checked={utskrivning_hemmet}/> Ja 
        <input type="checkbox" disabled checked={utskrivning_hemmet}/> Nej </div>

            </div>
           </div>  

     
    <div class = {layout.divButton}>
        <button class = {layout.saveButton}>Spara</button>
        <button class = {layout.avbrytButton} onClick={() =>{window.location="/aterlaggning/" + protocolID} }>Avbryt</button>
    </div>

    
    </div>

        </form>
        </Fragment>
    );
}

export default AddAterlaggning;