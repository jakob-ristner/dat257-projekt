import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";

const AddAterlaggning = (useParams) => {

    const {protocolID} = useParams.match.params;

    //date
    const [aterlaggning_startdate, set_aterlaggning_startdate] = useState("");
    const [orsak, set_orsak] = useState("");

    //end
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);

      //Method for submitting the new Hembesok and saving it in the Postgres Database
      const submit = async(e) => {
        e.preventDefault();

        try {
            const body ={
                aterlaggning_startdate,
                orsak
       }; 
            
            const response = await fetch("http://localhost:5000/aterlaggning/add/" + protocolID, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err);
            
        }
    }



    //Displaying the hembesok form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database. 
       return(
        <Fragment>
         <form onSubmit={submit}>
        <h1>Lägg till Återläggning för {protocolID}</h1>  
        <div>Startdatum  <input required type="date" value={aterlaggning_startdate} onChange={(e) => {set_aterlaggning_startdate(e.target.value)}}></input></div>
        <div>Orsak: <input value={orsak} onChange={(e) => {set_orsak(e.target.value)}}></input></div> 
     
        <button class = {layout.saveButton}>Spara</button>
        </form>
        </Fragment>
    );
}

export default AddAterlaggning;