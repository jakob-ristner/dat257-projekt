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
        "http://localhost:5000/aterlaggning/end/" + id, {credentials: "include"});
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

          const addEnd = async(e) => {
            e.preventDefault();
    
            try {
                const body ={
                    aterlaggning_enddate,
                    utskrivning_hemmet
           }; 
                
                     const response = await fetch("http://localhost:5000/aterlaggning/end/" + id, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body),
                    credentials: "include"
                });
    
                window.location="/aterlaggning/" + protokollnr;
    
            } catch (err) {
                console.error(err);
                
            }
        }
       

    //Displaying the aterlaggning form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database. 
       return(
        <Fragment>

        <h1>End Återläggning med id: {id}</h1>
        
        <div className={layout.protID}>
            <h2>Protokollnummer: {protokollnr}</h2>
        </div>
        

        <form onSubmit={addEnd}>

         <div class = {layout.gridHalleluja}>

            <div><h2 className={layout.headerInfo}>Datun:</h2></div>

            <div><h2 className={layout.headerAtgard}>Orsak:</h2></div>

            <div><h2 className={layout.headerResurs}>Avslutad Återinläggning:</h2></div>



        <div class={layout.info}> 
           <div class ={layout.gridInfo}>
        <div>Startdatum  <input required type="date" disabled value={aterlaggning_startdate}></input></div>

        </div>
           </div>

        <div class= {layout.atgard + " atgard"}>
            <div class ={layout.gridAtgard}>
        <div>Orsak: <input type="text" disabled value={orsak}></input></div>

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
        <button class = {layout.avbrytButtonAter} onClick={() =>{window.location="/aterlaggning/" + protokollnr} }>Avbryt</button>
    </div>

    
    </div>
        </form>
        </Fragment>
    );
}

export default AddEndAterlaggning;