import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";
//import {validateAtgard} from "../../utils/inputs.js";

const AddEndAterlaggning = (useParams) => {

    const {protocolID} = useParams.match.params;

    //date
    const [aterlaggning_startdate, set_startdate] = useState("");
    const [orsak, set_orsak] = useState("");

    //end
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);

      //Method for submitting the new Hembesok and saving it in the Postgres Database
      const submit = async(e) => {
        e.preventDefault();

        try {
            const body ={
                aterlaggning_enddate,
                utskrivning_hemmet
                
       }; 
            
            const response = await fetch("http://localhost:5000/aterlaggning/end/" + protocolID, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location="/aterlaggning/end/" + protocolID;

        } catch (err) {
            console.error(err);
            
        }
    }
    //useEffect(()=> {validateAtgard()}, []);


    //Displaying the hembesok form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database. 
       return(
        <Fragment>

        <h1>Lägg till Återläggning för {protocolID}</h1>

         <form onSubmit={submit}>


        <div>Startdatum  <input required type="date" disabled></input></div>
        <div>Orsak: <input type="text" disabled></input></div>
        <div>Avslutningsdatum:<input required type="date" value={aterlaggning_enddate} onChange={(e) => {set_aterlaggning_enddate(e.target.value)}}></input></div>
        <div>Utskrivning till hemmet:<input required type="checkbox" value={utskrivning_hemmet} onChange={(e) => {set_utskrivning_hemmet(e.target.value)}}></input></div>
        
        

     
    <div class = {layout.divButton}>
        <button class = {layout.saveButton}>Spara</button>
        <button class = {layout.avbrytButton} onClick={() =>{window.location="/aterlaggning/" + protocolID} }>Avbryt</button>
    </div>

    
        </form>
        </Fragment>
    );
}

export default AddEndAterlaggning;