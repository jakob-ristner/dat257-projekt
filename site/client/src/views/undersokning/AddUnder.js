import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../cssModules/AddForm.module.css";
import {validateAtgard} from "../../utils/inputs.js";

const AddUnder = (useParams) => {

    const {protocolID} = useParams.match.params;

    //date
    const [undersok_date, set_date] = useState("");

    //checkboxes
    const [ultraljud_hjarta, set_ultraljud_hjarta] = useState(false);
    const [lakarbesok, set_lakarbesok] = useState(false);
    const [ogonundersokning, set_ogonundersokning] = useState(false);
    const [ortopedkonsult, set_ortopedkonsult] = useState(false);
    const [oronundersokning, set_oronundersokning] = useState(false);
    const [annat, set_annat] = useState("");

    

    //Method for submitting the new Hembesok and saving it in the Postgres Database
    const submit = async(e) => {
        e.preventDefault();
        try {
            
            
            const body ={
                undersok_date, 
                ultraljud_hjarta, 
                lakarbesok,
                ogonundersokning, 
                ortopedkonsult, 
                oronundersokning, 
                annat}; 
            
            const response = await fetch("http://localhost:5000/undersokning/" + protocolID, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
                credentials: 'include'
            });
            
            window.location="/undersokning/" + protocolID;
            


        } catch (err) {
            console.error(err);
            
        }
    }
    useEffect(()=> {validateAtgard()}, []);
    


    return(
        <Fragment>
        <h1>Lägg till Undersökning för {protocolID}</h1>  
        
       
     
    
            <form onSubmit={submit}>

           
                 <div class={layout.info}> 
                 <div>Undersökningsdatum: <input required type="date" value={undersok_date} onChange={(e) => {set_date(e.target.value)}}></input></div>
                
                
                
                 <div class= {"atgard"} onChange={() => validateAtgard()}>
                    <div><input type="checkbox" checked={ultraljud_hjarta} onChange={(e) => {set_ultraljud_hjarta(e.target.checked)}}></input>Ultraljud Hjärta </div> 
                    <div><input type="checkbox" checked={lakarbesok} onChange={(e) => {set_lakarbesok(e.target.checked)}}></input>Läkarbesök </div>
                    <div><input type="checkbox" checked={ogonundersokning} onChange={(e) => {set_ogonundersokning(e.target.checked)}}></input>Ögonundersökning</div> 
                    <div><input type="checkbox" checked={ortopedkonsult} onChange={(e) => {set_ortopedkonsult(e.target.checked)}}></input>Ortopedkonsult</div>
                    <div><input type="checkbox" checked={oronundersokning} onChange={(e) => {set_oronundersokning(e.target.checked)}}></input>Öronundersökning</div>
                    <div>Annan undersökning: <input type="text" value={annat}  onChange={(e) => {set_annat(e.target.value)}}></input></div> 
                  </div>
                 

                    <div class = {layout.divButton}>
                 
                    <button class = {layout.saveButton}>Spara</button>
                    <button class = {layout.avbrytButton} onClick={() =>{window.location="/undersokning/" + protocolID} }>Avbryt</button>
                    
                    </div>
                    </div>
            </form>
            
    
            

        </Fragment>
    );
}

export default AddUnder;