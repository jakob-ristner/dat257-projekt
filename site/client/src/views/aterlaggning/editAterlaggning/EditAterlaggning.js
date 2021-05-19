import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";

const EditAterlaggning = (useParams) => {
    const {protocolID} = useParams.match.params;
    console.log(useParams.match.params)

    // Setting states
    const [aterlaggning_startdate, set_startdate] = useState("");
    const [orsak, set_orsak] = useState("");
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);
    const [aterlagg_exists, set_aterlagg] = useState(false);

    //method for editing the old Återläggning
    const getAterlagg = async() => {
        const response = await fetch(
        "http://localhost:5000/aterlaggning/edit/" + protocolID);
        const jsonData = await response.json();
        const ater = jsonData[0];
        if (ater != undefined){
            set_aterlagg(true);
            set_startdate(ater.aterlaggning_startdate);
            set_orsak(ater.orsak);
            set_aterlaggning_enddate(ater.aterlaggning_enddate);
            set_utskrivning_hemmet(ater.utskrivning_hemmet);
        }
        else{
            set_aterlagg(false);
        }
    }
useEffect(() => { 
    getAterlagg();
}, [])

    //Method for submitting the new update on Återläggning and saving it in the Postgres Database
    const updateAterlaggning = async(e) => {
        e.preventDefault();
         try {
             const body ={
                aterlaggning_startdate,
                orsak,
                aterlaggning_enddate,
                utskrivning_hemmet
            }; 

            const response = await fetch('http://localhost:5000/aterlaggning/edit/' + protocolID,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location="/aterlaggning/" + protocolID;
        } catch (error) {
            console.log(error.message);
        }
       
    }

//Displaying the atterlaggning form with textfields and checkboxes.
//CLicking the "Spara"-button sends a POST-request to the database.
return(<Fragment>

    <h1>Redigera Återläggning för {protocolID}</h1>

     <form onSubmit={updateAterlaggning}>

    <div>Startdatum  <input required type="date" value={aterlaggning_startdate} onChange={(e) => {set_startdate(e.target.value)}}></input></div>
    <div>Orsak: <input type="text" value={orsak} onChange={(e) => {set_orsak(e.target.value)}}></input></div>
    <div>Avslutningsdatum:<input required type="date" value={aterlaggning_enddate} onChange={(e) => {set_aterlaggning_enddate(e.target.value)}}></input></div>
    <div>Utskrivning till hemmet:<input required type="checkbox" value={utskrivning_hemmet} onChange={(e) => {set_utskrivning_hemmet(e.target.value)}}></input></div>
    

    

 
<div class = {layout.divButton}>
    <button class = {layout.saveButton}>Spara</button>
    <button class = {layout.avbrytButton} onClick={() =>{window.location="/aterlaggning/" + protocolID} }>Avbryt</button>

</div>


    </form>
    </Fragment>);
}




export default EditAterlaggning;