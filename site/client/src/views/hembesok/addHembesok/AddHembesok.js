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
        
       
     
    
            <form onSubmit={submit}>

            <div class = {layout.gridHalleluja}>

                <div><h2 className={layout.headerInfo}>Välj tider:</h2></div>

                <div><h2 className={layout.headerAtgard}>Välj Åtgärd:</h2></div>

                <div><h2 className={layout.headerResurs}>Välj Resurs:</h2></div>

                <div> <h2 className={layout.headerAvvikning}>Välj Avvikning:</h2></div>

                    <div class={layout.info}> 
                    <div class ={layout.gridInfo}>
                    <div>Datum utfört: <input required type="date" value={date_performed} onChange={(e) => {set_date_performed(e.target.value)}}></input></div>
                    <div>Till familj:<input required type="time" value={at_familyKl} onChange={(e) => {set_at_family(e.target.value)}}></input></div>
                    <div>Från familj:<input required type="time" value={from_familyKl} onChange={(e) => {set_from_family(e.target.value)}}></input></div>
                    <div>Utförd av: <input required value={performed_by} onChange={(e) => {set_performed_by(e.target.value)}}></input> </div>
                  </div>
                </div>
                
                
                 <div class= {layout.atgard + " atgard"}>
                    <div class ={layout.gridAtgard}>
                    <div><input type="checkbox" checked={amning_nutrition} onChange={(e) => {set_amning_nutrition(e.target.checked)}}></input>Amning/nutrition </div>
                    <div><input type="checkbox" checked={stodsamtal} onChange={(e) => {set_stodsamtal(e.target.checked)}}></input>Stödsamtal </div> 
                    <div><input type="checkbox" checked={viktkontroll} onChange={(e) => {set_viktkontroll(e.target.checked)}}></input>Viktkontroll </div>
                    <div><input type="checkbox" checked={provtagning} onChange={(e) => {set_provtagning(e.target.checked)}}></input>Provtagning</div> 
                    <div><input type="checkbox" checked={lakemedel} onChange={(e) => {set_lakemedel(e.target.checked)}}></input>Läkemedel</div>
                    <div>Annan Åtgärd: <input value={annan_at} onChange={(e) => {set_annan_at(e.target.value)}}></input></div> 
                    </div>
                  </div>

                    <div class = {layout.resurs}> 
                    <div class = {layout.gridResurs}>
                    
                    <div><input type="checkbox" checked={lakare} onChange={(e) => {set_lakare(e.target.checked)}}></input>Läkare </div>
                    <div><input type="checkbox" checked={logoped} onChange={(e) => {set_logoped(e.target.checked)}}></input>Logoped </div>
                    <div><input type="checkbox" checked={dietist} onChange={(e) => {set_dietist(e.target.checked)}}></input>Dietist</div>
                    <div><input type="checkbox" checked={kurator} onChange={(e) => {set_kurator(e.target.checked)}}></input>Kurator </div>
                    <div>Annan resurs: <input value={annan_resurs} onChange={(e) => {set_annan_resurs(e.target.value)}}></input></div>
                    </div>
                
                    </div>
                    <div class= {layout.avvikning}>
                    <div class = {layout.gridAvvikning}>
                    
                    <div><input type="checkbox" checked={av_logistik} onChange={(e) => {set_av_logistik(e.target.checked)}}></input>Logistik</div>
                    <div><input type="checkbox" checked={av_barn_familj} onChange={(e) => {set_av_barn_familj(e.target.checked)}}></input>Barn/familj</div>
                    <div><input type="checkbox" checked={av_personal} onChange={(e) => {set_av_personal(e.target.checked)}}></input>Personal </div>
                    <div>Avvikning beskrivning: <input value={av_beskrivning}
                    onChange={(e) => {
                        if (av_logistik || av_barn_familj || av_personal){
                            set_av_beskrivning(e.target.value)
                        }
                        }}></input></div>
                    </div>
                    </div>
                    <div class = {layout.divButton}>
                    <button class = {layout.saveButton}>Spara</button>
                    <button class = {layout.avbrytButton} onClick={() =>{window.location="/hembesok/" + protokollnr} }>Avbryt</button>
                    
                   
                    </div>
                    </div>
            </form>
    
            

        </Fragment>
    );
}

export default AddHembesok;