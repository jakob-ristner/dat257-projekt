import React, { Fragment, useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";
import { getYesNo } from "../../../utils/inputs";

const EditAterlaggning = (useParams) => {
    const {id} = useParams.match.params;
    console.log(useParams.match.params)

    // Setting states
    //const [protokollnr, setProtokollnr] = useState();

    const [aterlaggning_startdate, set_startdate] = useState("");
    const [orsak, set_orsak] = useState("");
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);
    const [aterlagg_exists, set_aterlagg] = useState(false);

    const [protokollnr, setProtokollnr] = useState();

    //method for editing the old Återläggning
    const getAterlagg = async() => {
        const response = await fetch(
        "http://localhost:5000/aterlaggning/edit/" + id);
        const jsonData = await response.json();
        //const ater = jsonData[0];
        //if (ater != undefined){
            set_aterlagg(true);
            set_startdate(jsonData.aterlaggning_startdate);
            set_orsak(jsonData.orsak);
            set_aterlaggning_enddate(jsonData.aterlaggning_enddate);
            set_utskrivning_hemmet(jsonData.utskrivning_hemmet);

            setProtokollnr(jsonData.protocolid);


            //setProtokollnr(jsonData.protocolid);
       // }
        //else{
        //    set_aterlagg(false);
        //}
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

            const response = await fetch("http://localhost:5000/aterlaggning/" + id,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location="/aterlaggning/" + protokollnr;
        } catch (error) {
            console.log(error.message);
        }
       
    }

//Displaying the atterlaggning form with textfields and checkboxes.
//CLicking the "Spara"-button sends a POST-request to the database.
return(<Fragment>

    <h1>Redigera Återläggning med Id: {id}</h1>


     <form onSubmit={updateAterlaggning}>

    <div>Startdatum  <input required type="date" value={aterlaggning_startdate} onChange={(e) => {set_startdate(e.target.value)}}></input></div>
    <div>Orsak: <input required type="text" value={orsak} onChange={(e) => {set_orsak(e.target.value)}}></input></div>
    <div>Avslutningsdatum:<input required type="date" value={aterlaggning_enddate} onChange={(e) => {set_aterlaggning_enddate(e.target.value)}}></input></div>
    <div>
            {getYesNo("Utskrivning till hemmet:", utskrivning_hemmet, set_utskrivning_hemmet)}    
    </div>
    

    

 
    <button >Spara</button>
    <button  onClick={() =>{window.location = "/aterlaggning/" + protokollnr} }>Avbryt</button>



    </form>
    </Fragment>);
}


export default EditAterlaggning;