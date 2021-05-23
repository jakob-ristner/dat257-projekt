import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import {validateMulti, validateAtgard} from "../../../utils/inputs.js";
import layout from "../../cssModules/AddForm.module.css";



const AddMottagningsbesok = (useParams) => { 
    const {protocolID} = useParams.match.params;
//date
   const [date, set_date] = useState("");
   const [start_time, set_start_time] = useState(""); 
   const [end_time, set_end_time] = useState("");
   const [performed_by, set_performed_by] = useState("");
   
   //checkboxes
   const [amning_nutrition, set_amning_nutrition] = useState(false);
   const [stodsamtal, set_stodsamtal] = useState(false);
   const [viktkontroll, set_viktkontroll] = useState(false);
   const [provtagning, set_provtagning] = useState(false);
   const [lakemedel, set_lakemedel] = useState(false);
   const [annat_motes, set_annat_motes] = useState(false);
   const [annat_mote, set_annat_mote] = useState("");
   const [lakare, set_lakare] = useState(false);
   const [logoped, set_logoped] = useState(false);
   const [dietist, set_dietist] = useState(false);
   const [kurator, set_kurator] = useState(false);
   const [annan_resurs, set_annan_resurs] = useState("");
 //avvikelser 
   const [av_logistik, set_av_logistik] = useState(false);
   const [av_barn_familj, set_av_barn_familj] = useState(false);
   const [av_beskrivning, set_av_beskrivning] = useState("");
   const [av_personal, set_av_personal] = useState(false);
   
   /*
   const validateMote = (checked) => {
    console.log(checked);
    if (checked && document.getElementById("motessort").value == "") {
        document.getElementById("motessort").setCustomValidity("Fyll i detta fält");
    } else {
        document.getElementById("motessort").setCustomValidity("");
    }
}
   */
      //Method for submitting the new Motaggningsbesok and saving it in the Postgres Database 
      const submit = async(e) => {
        e.preventDefault();
        
        try {
            const date_start_time = date + " " + start_time; 
            const body ={
        date_start_time,
        end_time,
        performed_by,
        amning_nutrition,
        stodsamtal,
        viktkontroll,
        provtagning,
        lakemedel,
        annat_mote,
        lakare,
        logoped,
        dietist,
        kurator,
        annan_resurs,
        av_logistik,
        av_barn_familj,
        av_personal,
        av_beskrivning};

    const response = await fetch("http://localhost:5000/mottagningsbesok/add/" + protocolID, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body),
        credentials: 'include'
    });
    
    window.location="/mottagningsbesok/" + protocolID;

} catch (err) {
    console.error(err);
}
}

useEffect(()=> {validateAtgard()}, []);

//Displaying the digitalt vårdmöte form with textfields and checkboxes.
    //CLicking the "Spara"-button sends a POST-request to the database.  
    return (
        <Fragment>
             <h1>Lägg till mottagningsbesök för {protocolID}</h1>


    <form onSubmit={submit}>

    <div class = {layout.gridHalleluja}>

                <div><h2 className={layout.headerInfo}>Välj tider:</h2></div>

                <div><h2 className={layout.headerAtgard}>Välj Åtgärd:</h2></div>

                <div><h2 className={layout.headerResurs}>Välj Resurs:</h2></div>

                <div> <h2 className={layout.headerAvvikning}>Välj Avvikning:</h2></div>

        <div class= {layout.info}>
            <div class= {layout.gridInfo}>
            <div> Datum utfört: <input required type="date" value={date} onChange={(e) => {set_date(e.target.value)}}></input></div>
            <div>Start klockan: <input required type="time" value={start_time} onChange={(e) => {set_start_time(e.target.value)}}></input></div>
            <div>Avslutad klockan: <input required type="time" value={end_time} onChange={(e) => {set_end_time(e.target.value)}}></input></div>
            <div>Utförd av: <input required placeholder="Sköterske-ID" type="text" value={performed_by} onChange={(e) => {set_performed_by(e.target.value)}}></input></div>
            </div>
          </div>

          <div class= {layout.atgard + " atgard"}>
                <div class ={layout.gridAtgard}>
                <div><input  type="checkbox" checked={amning_nutrition} onChange={(e) => {set_amning_nutrition(e.target.checked)}}></input>Amning-/nutrionssamtal </div>
                <div><input   type="checkbox" checked={stodsamtal} onChange={(e) => {set_stodsamtal(e.target.checked)}}></input>Stödsamtal </div>
                <div><input  type="checkbox" checked={viktkontroll} onChange={(e) => {set_viktkontroll(e.target.checked)}}></input>Viktkontroll </div>
                <div><input  type="checkbox" checked={provtagning} onChange={(e) => {set_provtagning(e.target.checked)}}></input>Provtagning </div>
                <div><input  type="checkbox" checked={lakemedel} onChange={(e) => {set_lakemedel(e.target.checked)}}></input>Läkemedel </div>
                <div>Förklaring: <input id="motessort" type="text" value={annat_mote} onChange={(e) => {set_annat_mote(e.target.value)}}></input></div>

                </div>
                </div>
                
        
                <div class = {layout.resurs}> 
                    <div class = {layout.gridResurs}>
                <div><input  type="checkbox" checked={lakare} onChange={(e) => {set_lakare(e.target.checked)}}></input>Läkare </div>
                 <div><input  type="checkbox" checked={logoped} onChange={(e) => {set_logoped(e.target.checked)}}></input>Logoped </div>
                 <div><input  type="checkbox" checked={dietist} onChange={(e) => {set_dietist(e.target.checked)}}></input>Dietist </div>
                 <div><input  type="checkbox" checked={kurator} onChange={(e) => {set_kurator(e.target.checked)}}></input>Kurator </div>
                 <div>Annan resurs: <input type="text" value={annan_resurs} onChange={(e) => {set_annan_resurs(e.target.value)}}></input></div>

                </div>
                </div>

                <div class= {layout.avvikning}>
                    <div class = {layout.gridAvvikning}>
                    <div><input type="checkbox" checked={av_logistik} onChange={(e) => {set_av_logistik(e.target.checked)}}></input>Logistik</div>
                    <div><input type="checkbox" checked={av_barn_familj} onChange={(e) => {set_av_barn_familj(e.target.checked)}}></input>Barn/familj</div>
                    <div><input type="checkbox" checked={av_personal} onChange={(e) => {set_av_personal(e.target.checked)}}></input>Personal</div>

                    <div>Förklaring: <input type="text" value={av_beskrivning} 
                    onChange={(e) => {
                    if (av_logistik || av_barn_familj || av_personal ){
                            set_av_beskrivning(e.target.value)
                        }
                    }}></input></div>

                    </div>
                    </div>
                

        <div class= {layout.divButton}>
        <button class = {layout.saveButton}>Spara</button>
        <button class = {layout.avbrytButton}  onClick={() =>{window.location="/mottagningsbesok/" + protocolID} }>Avbryt</button>

        </div>

        </div>

        </form>

         </Fragment>
    );

}
export default AddMottagningsbesok;