import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import { getYesNo } from "../../../utils/inputs";
import layout from "../../cssModules/AddForm.module.css";
//import {validateAtgard} from "../../utils/inputs.js";

const AddEndAterlaggning = (useParams) => {

    const {id} = useParams.match.params;

    //date
    const [aterlaggning_startdate, set_startdate] = useState("");
    const [orsak, set_orsak] = useState("");

    //end
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);

    const [protokollnr, setProtokollnr] = useState();


      //method for enddate the old Återläggning
    const getAterlagg = async() => {
        const response = await fetch(
        "http://localhost:5000/aterlaggning/end/" + id);
        const jsonData = await response.json();
        //const ater = jsonData[0];
        //if (ater != undefined){
           
            setProtokollnr(jsonData.protocolid);     

            //set_aterlagg(true);
            set_startdate(jsonData.aterlaggning_startdate);
            set_orsak(jsonData.orsak);
            set_aterlaggning_enddate(jsonData.aterlaggning_enddate);
            set_utskrivning_hemmet(jsonData.utskrivning_hemmet);


            //setProtokollnr(jsonData.protocolid);
       // }
        //else{
        //    set_aterlagg(false);
        //}
    }

    useEffect(() => { 
       getAterlagg();
          }, [])
       

    //Displaying the aterlaggning form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database. 
       return(
        <Fragment>

        <h1>End Återläggning för {id}</h1>

        

         <form onSubmit={getAterlagg}>


        <div>Startdatum  <input required type="date" disabled value={aterlaggning_startdate}></input></div>
        <div>Orsak: <input type="text" disabled value={orsak}></input></div>
        <div>Avslutningsdatum:<input required type="date" value={aterlaggning_enddate} onChange={(e) => {set_aterlaggning_enddate(e.target.value)}}></input></div>
        <div>
            {getYesNo("Utskrivning till hemmet:", utskrivning_hemmet, set_utskrivning_hemmet)}
            
        </div>
        
        

     
    <div class = {layout.divButton}>
        <button class = {layout.saveButton}>Spara</button>
        <button class = {layout.avbrytButton} onClick={() =>{window.location="/aterlaggning/" + protokollnr} }>Avbryt</button>
    </div>

    
        </form>
        </Fragment>
    );
}

export default AddEndAterlaggning;