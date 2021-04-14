import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 

const AddHembesok = (useParams) => {

    const {protokollnr} = useParams.match.params;
    const [date_performed, set_date_performed] = useState("");
    const [at_family, set_at_family] = useState("");
    const [from_family, set_from_family] = useState("");
    const [performed_by, set_performed_by] = useState("");
    const [amning_nutrition, set_amning_nutrition] = useState(false);
    const [stodsamtal, set_stodsamtal] = useState(false);
    const [viktkontroll, set_viktkontroll] = useState(false);
    const [provtagning, set_provtagning] = useState(false);
    const [lakemedel, set_lakemedel] = useState(false);
    const [lakare, set_lakare] = useState(false);
    const [logoped, set_logoped] = useState(false);
    const [dietist, set_dietist] = useState(false);
    const [av_logistik, set_av_logistik] = useState(false);
    const [av_barn_familj, set_av_barn_familj] = useState(false);
    const [av_personal, set_av_personal] = useState(false);
    const [annan_at, set_annan_at] = useState("");
    const [annan_resurs, set_annan_resurs] = useState("");
    const [av_beskrivning, set_av_beskrivning] = useState("");

    return(
        <Fragment>
        <h1>Lägg till hembesök för {protokollnr}</h1>  
        <div class="hembesok">
            <form><div class="info">
                   Datum utfört: <input type="date" value={date_performed} onChange={(e) => {set_date_performed(e.target.value)}}></input><br/>
                   Till familj:<input type="time"></input><br/>
                   Från familj:<input type="time"></input><br/> 
                   Utförd av: <input></input><br/> 
                    </div>

                    <div class="atgard">
                    Amning/nutrition: <input type="checkbox" checked={amning_nutrition} onChange={(e) => {set_amning_nutrition(e.target.checked)}}></input><br/>
                    Stödsamtal: <input type="checkbox"></input><br/>
                    Viktkontroll: <input type="checkbox"></input><br/>
                    Provtagning: <input type="checkbox"></input><br/>
                    Läkemedel: <input type="checkbox"></input><br/>
                    Annan Åtgärd:: <input></input><br/>
                    </div>

                    <div class="resurs">
                    Läkare: <input type="checkbox"></input><br/>
                    Logoped: <input type="checkbox"></input><br/>
                    Dietist: <input type="checkbox"></input><br/>
                    Annan resurs: <input type="checkbox"></input><br/>
                    </div>

                    <div class="avvikning">
                    Logistik: <input type="checkbox" checked={av_logistik} onChange={(e) => {set_av_logistik(e.target.checked)}}></input><br/>
                    Barn/familj: <input type="checkbox" checked={av_barn_familj} onChange={(e) => {set_av_barn_familj(e.target.checked)}}></input><br/>
                    Personal: <input type="checkbox" checked={av_personal} onChange={(e) => {set_av_personal(e.target.checked)}}></input><br/>
                    Avvikning beskrivning: <input value={av_beskrivning} 
                    onChange={(e) => {
                        if (av_logistik == true || av_barn_familj == true || av_personal == true){
                            set_av_beskrivning(e.target.value)
                        }
                        }}></input><br/>
                    </div>

            </form>
            </div>      
        </Fragment>
    );
}

export default AddHembesok;