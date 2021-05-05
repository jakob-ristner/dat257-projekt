import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";

const AddHembesok = (useParams) => {

    const {protokollnr} = useParams.match.params;
    const [date_performed, set_date_performed] = useState("");
    const [at_familyKl, set_at_family] = useState("");
    const [from_familyKl, set_from_family] = useState("");
    const [performed_by, set_performed_by] = useState("");
    const [amning_nutrition, set_amning_nutrition] = useState(false);
    const [stodsamtal, set_stodsamtal] = useState(false);
    const [viktkontroll, set_viktkontroll] = useState(false);
    const [provtagning, set_provtagning] = useState(false);
    const [lakemedel, set_lakemedel] = useState(false);
    const [lakare, set_lakare] = useState(false);
    const [logoped, set_logoped] = useState(false);
    const [dietist, set_dietist] = useState(false);
    const [kurator, set_kurator] = useState(false);
    const [av_logistik, set_av_logistik] = useState(false);
    const [av_barn_familj, set_av_barn_familj] = useState(false);
    const [av_personal, set_av_personal] = useState(false);
    const [annan_at, set_annan_at] = useState("");
    const [annan_resurs, set_annan_resurs] = useState("");
    const [av_beskrivning, set_av_beskrivning] = useState("");

    const submit = async(e) => {
        e.preventDefault();
       const at_family = date_performed + " " + at_familyKl;
       const from_family = date_performed + " " + from_familyKl;
        try {
            const body ={
            at_family,
            from_family,
            performed_by,
            amning_nutrition,
            stodsamtal,
            viktkontroll,
            provtagning,
            lakemedel,
            lakare,
            logoped,
            dietist,
            kurator,
            av_logistik,
            av_barn_familj,
            av_personal,
            annan_at,
            annan_resurs,
            av_beskrivning}; 
            
            const response = await fetch("http://localhost:5000/hembesok/" + protokollnr, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location="/hembesok/" + protokollnr;

        } catch (err) {
            console.error(err);
            
        }
    }

    return(
        <Fragment>
        <h1>Lägg till hembesök för {protokollnr}</h1>  
        <button onClick={() =>{window.location="/hembesok/" + protokollnr} }>Avbryt</button>
        <div class={layout.container}>
    
            <form onSubmit={submit}>
                
                <div class={layout.info}>
                <h1>Tid </h1>  
                   <div class ={layout.gridInfo}>

                    <div class = {layout.textFields}>Datum utfört: <input required type="date" value={date_performed} onChange={(e) => {set_date_performed(e.target.value)}}></input></div>
                    <div class = {layout.textFields}>Till familj:<input required type="time" value={at_familyKl} onChange={(e) => {set_at_family(e.target.value)}}></input></div>
                    <div class = {layout.textFields}>Från familj:<input required type="time" value={from_familyKl} onChange={(e) => {set_from_family(e.target.value)}}></input></div>
                    <div class = {layout.textFields}>Utförd av: <input required value={performed_by} onChange={(e) => {set_performed_by(e.target.value)}}></input> </div>
                  </div>
                </div>

                    <div class= {layout.atgard}>
                    <h1>Åtgärd</h1>
                    Välj åtgärd:
                    <div class ={layout.gridResurs}>
                    <div class = {layout.checkBox}>Amning/nutrition: <input type="checkbox" checked={amning_nutrition} onChange={(e) => {set_amning_nutrition(e.target.checked)}}></input></div>
                    <div class = {layout.checkBox}>Stödsamtal: <input type="checkbox" checked={stodsamtal} onChange={(e) => {set_stodsamtal(e.target.checked)}}></input></div> 
                    <div class = {layout.checkBox}>Viktkontroll: <input type="checkbox" checked={viktkontroll} onChange={(e) => {set_viktkontroll(e.target.checked)}}></input></div>
                    <div class = {layout.checkBox}>Provtagning: <input type="checkbox" checked={provtagning} onChange={(e) => {set_provtagning(e.target.checked)}}></input></div> 
                    <div class = {layout.checkBox}>Läkemedel: <input type="checkbox" checked={lakemedel} onChange={(e) => {set_lakemedel(e.target.checked)}}></input></div> 
                    <div class = {layout.checkBox}>Annan Åtgärd: <input value={annan_at} onChange={(e) => {set_annan_at(e.target.value)}}></input></div>
                    </div>
                    </div>

                    <div class= {layout.resurs}>
                    <h1>Resurs </h1>
                    Välj resurs:
                    Läkare: <input type="checkbox" checked={lakare} onChange={(e) => {set_lakare(e.target.checked)}}></input>
                    Logoped: <input type="checkbox" checked={logoped} onChange={(e) => {set_logoped(e.target.checked)}}></input>
                    Dietist: <input type="checkbox" checked={dietist} onChange={(e) => {set_dietist(e.target.checked)}}></input>
                    Kurator: <input type="checkbox" checked={kurator} onChange={(e) => {set_kurator(e.target.checked)}}></input>
                    Annan resurs: <input value={annan_resurs} onChange={(e) => {set_annan_resurs(e.target.value)}}></input>
                    </div>

                    <div class="avvikning">
                    <h1>Avvikning </h1>
                    Välj avvikning:
                    Logistik: <input type="checkbox" checked={av_logistik} onChange={(e) => {set_av_logistik(e.target.checked)}}></input>
                    Barn/familj: <input type="checkbox" checked={av_barn_familj} onChange={(e) => {set_av_barn_familj(e.target.checked)}}></input>
                    Personal: <input type="checkbox" checked={av_personal} onChange={(e) => {set_av_personal(e.target.checked)}}></input>
                    Avvikning beskrivning: <input value={av_beskrivning} 
                    onChange={(e) => {
                        if (av_logistik == true || av_barn_familj == true || av_personal == true){
                            set_av_beskrivning(e.target.value)
                        }
                        }}></input><br/>
                    </div>
                    <button>Spara</button>
            </form>
            </div>      
        </Fragment>
    );
}

export default AddHembesok;