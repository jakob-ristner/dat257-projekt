import React, { Fragment, useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";
import { getYesNo } from "../../../utils/inputs";

const EditAterlaggning = (useParams) => {
    const {id} = useParams.match.params;
    //console.log(useParams.match.params)

    // Setting states
    //const [protokollnr, setProtokollnr] = useState();

    const [aterlaggning_startdate, set_startdate] = useState("");
    const [orsak, set_orsak] = useState("");
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);
    //const [aterlagg_exists, set_aterlagg] = useState(false);

    const [protokollnr, setProtokollnr] = useState();

    //method for editing the old Återläggning
    const getAterlagg = async() => {
        const response = await fetch(
        "http://localhost:5000/aterlaggning/edit/" + id, {credentials: "include"});
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
                body: JSON.stringify(body),
                credentials: "include"
            });

            window.location="/aterlaggning/" + protokollnr;
        } catch (error) {
            console.log(error.message);
        }
       
    }

//Displaying the aterlaggning form with textfields and checkboxes.
//CLicking the "Spara"-button sends a POST-request to the database.
return(<Fragment>

    <h1>Redigera Återläggning med Id: {id}</h1>

    <div className={layout.protID}>
            <h2>Protokollnummer: {protokollnr}</h2>
    </div>


     <form onSubmit={updateAterlaggning}>

     <div class = {layout.gridHalleluja}>

         <div><h2 className={layout.headerInfo}>Datun:</h2></div>

         <div><h2 className={layout.headerAtgard}>Orsak:</h2></div>

         <div><h2 className={layout.headerResurs}>Avslutad Återinläggning:</h2></div>


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
    <div>Avslutningsdatum:<input required type="date" value={aterlaggning_enddate} onChange={(e) => {set_aterlaggning_enddate(e.target.value)}}></input></div>
    <div>
            {getYesNo("Utskrivning till hemmet:", utskrivning_hemmet, set_utskrivning_hemmet)}    
    </div>
    
            </div>
        </div>

    

        <div class = {layout.divButtonAter}>
    <button class = {layout.saveButtonAter}>Spara</button>
    <button class = {layout.avbrytButtonAter}  onClick={() =>{window.location = "/aterlaggning/" + protokollnr} }>Avbryt</button>

       </div>



    </div>
    </form>
    </Fragment>);
}


export default EditAterlaggning;