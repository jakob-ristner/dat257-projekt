import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import "./Digitalt-vardmote.css";
import {validateMulti} from "../../utils/inputs.js";



const AddDigitaltVard = (useParams) => {

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
    const [annat_ja, set_annat_ja] = useState(false);
    const [annat_motes, set_annat_motes] = useState(false);
    const [annat_nej, set_annat_nej] = useState(true);
    const [annat_mote, set_annat_mote] = useState("");
    const [lakare, set_lakare] = useState(false);
    const [logoped, set_logoped] = useState(false);
    const [dietist, set_dietist] = useState(false);
    const [kurator, set_kurator] = useState(false);
    const [annan_resurs, set_annan_resurs] = useState("");
    const [avvikelse, set_avvikelse] = useState("");

    //Method for submitting the new Digitalt vårdmöte and saving it in the Postgres Database 
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
                annat_mote,
                lakare,
                logoped,
                dietist,
                kurator,
                annan_resurs,
                avvikelse};

            const response = await fetch("http://localhost:5000/digitalt-vardmote/add/" + protocolID, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            await console.log(response);
        } catch (err) {
            console.error(err);
        }
    }
    //Displaying the digitalt vårdmöte form with textfields and checkboxes.
    //CLicking the "Spara"-button sends a POST-request to the database.  
    return (
        <Fragment>
             <h1>Lägg till digitalt vårdmöte för {protocolID}</h1>


    <form onSubmit={submit}>
        <div class="addDvard">
            <div class="date">
                Datum utfört: <input required type="date" value={date} onChange={(e) => {set_date(e.target.value)}}></input><br/>
                Start klockan: <input required type="time" value={start_time} onChange={(e) => {set_start_time(e.target.value)}}></input><br/>
                Avslutad klockan: <input required type="time" value={end_time} onChange={(e) => {set_end_time(e.target.value)}}></input><br/>
                Utförd av: <input required type="text" value={performed_by} onChange={(e) => {set_performed_by(e.target.value)}}></input><br/><br/>
            </div>

            <div class="checkboxes">
                <div className="multi">
                Amning-/nutrionssamtal: <input class="distance" type="checkbox" checked={amning_nutrition} onChange={(e) => {set_amning_nutrition(e.target.checked)}}></input>
                Stödsamtal: <input class="distance" type="checkbox" checked={stodsamtal} onChange={(e) => {set_stodsamtal(e.target.checked)}}></input>
                Viktkontroll: <input class="distance" type="checkbox" checked={viktkontroll} onChange={(e) => {set_viktkontroll(e.target.checked)}}></input><br/> 
                
                Annat möte: Ja<input class="distance" type="checkbox" checked={annat_motes} onChange={(e) => {
                    set_annat_motes(e.target.checked)
                    if(annat_motes){
                        set_annat_mote("")
                    }}}></input>
                Om Ja: <input type="text" value={annat_mote} onChange={(e) => {
                     if (annat_motes == true){
                        set_annat_mote(e.target.value)
                    }}}></input><br/><br/>
                </div>
                Läkare: <input class="distance" type="checkbox" checked={lakare} onChange={(e) => {set_lakare(e.target.checked)}}></input>
                Logoped: <input class="distance" type="checkbox" checked={logoped} onChange={(e) => {set_logoped(e.target.checked)}}></input>
                Dietist: <input class="distance" type="checkbox" checked={dietist} onChange={(e) => {set_dietist(e.target.checked)}}></input>
                Kurator: <input class="distance" type="checkbox" checked={kurator} onChange={(e) => {set_kurator(e.target.checked)}}></input><br/>
                Annan resurs: <input type="text" value={annan_resurs} onChange={(e) => {set_annan_resurs(e.target.value)}}></input><br/>
                Avvikelser: <input type="text" value={avvikelse} onChange={(e) => {set_avvikelse(e.target.value)}}></input><br/>
                
            </div>

        <div class="saveButton">
        <button id="spara" type="submit" onClick={validateMulti}>Spara</button>
        </div>
        </div>
        </form>

         </Fragment>
    );
}

export default AddDigitaltVard;