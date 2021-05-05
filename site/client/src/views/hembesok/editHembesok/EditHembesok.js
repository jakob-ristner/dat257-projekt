import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 

const EditHembesok = (useParams) => {
    const {hembesokid} = useParams.match.params;
    console.log(useParams.match.params)

    const [protokollnr, setProtokollnr] = useState();
    const [date_performed, set_date_performed] = useState(null);
    const [at_familyKl, set_at_family] = useState("");
    const [from_familyKl, set_from_family] = useState("");
    const [performed_by, set_performed_by] = useState("");
    
    const [amning_nutrition, set_amning_nutrition] = useState(false);
    const [stodsamtal, set_stodsamtal] = useState(false);
    const [viktkontroll, set_viktkontroll] = useState(false);
    const [provtagning, set_provtagning] = useState(false);
    const [lakemedel, set_lakemedel] = useState(false);
    const [annan_at, set_annan_at] = useState("");

    const [lakare, set_lakare] = useState(false);
    const [logoped, set_logoped] = useState(false);
    const [dietist, set_dietist] = useState(false);
    const [av_logistik, set_av_logistik] = useState(false);
    const [kurator, set_kurator] = useState(false);
    const [annan_resurs, set_annan_resurs] = useState("");

    const [av_barn_familj, set_av_barn_familj] = useState(false);
    const [av_personal, set_av_personal] = useState(false);
    const [av_beskrivning, set_av_beskrivning] = useState("");
    const [hemb_exists, set_hemb] = useState(false);

    const getHemb = async() => {
            const response = await fetch(
            "http://localhost:5000/hembesok/edit/" + hembesokid);
            const jsonData = await response.json();
            const ehemb = jsonData[0];
            if (ehemb != undefined){
                set_hemb(true);
                setProtokollnr(ehemb.protokollnr);
                set_date_performed(ehemb.date);
                set_at_family(ehemb.at_family);
                set_from_family(ehemb.from_family);
                set_performed_by(ehemb.performed_by);
                set_amning_nutrition(ehemb.amning_nutrition);
                set_stodsamtal(ehemb.stodsamtal);
                set_viktkontroll(ehemb.viktkontroll);
                set_provtagning(ehemb.provtagning);
                set_lakemedel(ehemb.lakemedel);
                set_lakare(ehemb.lakare);
                set_logoped(ehemb.logoped);
                set_dietist(ehemb.dietist);
                set_kurator(ehemb.kurator);
                set_av_logistik(ehemb.av_logistik);
                set_av_barn_familj(ehemb.av_barn_familj);
                set_av_personal(ehemb.av_personal);
                set_annan_at(ehemb.annan_at);
                set_annan_resurs(ehemb.annan_resurs);
                set_av_beskrivning(ehemb.av_beskrivning);
            }
            else{
                set_hemb(false);
            }
    }

    useEffect(() => {
        getHemb();
    }, [])

    const updateHemb = async(e) => {
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

            const response = await fetch('http://localhost:5000/hembesok/edit/' + hembesokid,{
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location="/hembesok/" + protokollnr;
        } catch (error) {
            console.log(error.message);
        }
       
    }


const getHembData = () => {
    
    return (
        <Fragment>
            <h1>Redigera hembesök med id {hembesokid}</h1>
            <button class="editHembesok" onClick={() =>{window.location="/hembesok/" + protokollnr} }>Avbryt</button>
            <div class="hembesok">
        <form onSubmit={updateHemb}> 
             <div class="info">
                   <h2>Protokollnummer: {protokollnr}</h2> 
                   Datum utfört: <input required type="date" value={date_performed} onChange={(e) => {set_date_performed(e.target.value)}}></input><br/>
                   Till familj:<input required type="time" value={at_familyKl} onChange={(e) => {set_at_family(e.target.value)}}></input><br/>
                   Från familj:<input required type="time" value={from_familyKl} onChange={(e) => {set_from_family(e.target.value)}}></input><br/> 
                   Utförd av: <input required value={performed_by} onChange={(e) => {set_performed_by(e.target.value)}}></input><br/> 
                    </div>

                    <div class="atgard">
                    Amning/nutrition: <input type="checkbox" checked={amning_nutrition} onChange={(e) => {set_amning_nutrition(e.target.checked)}}></input><br/>
                    Stödsamtal: <input type="checkbox" checked={stodsamtal} onChange={(e) => {set_stodsamtal(e.target.checked)}}></input><br/>
                    Viktkontroll: <input type="checkbox" checked={viktkontroll} onChange={(e) => {set_viktkontroll(e.target.checked)}}></input><br/>
                    Provtagning: <input type="checkbox" checked={provtagning} onChange={(e) => {set_provtagning(e.target.checked)}}></input><br/>
                    Läkemedel: <input type="checkbox" checked={lakemedel} onChange={(e) => {set_lakemedel(e.target.checked)}}></input><br/>
                    Annan Åtgärd: <input value={annan_at} onChange={(e) => {set_annan_at(e.target.value)}}></input><br/>
                    </div>

                    <div class="resurs">
                    Läkare: <input type="checkbox" checked={lakare} onChange={(e) => {set_lakare(e.target.checked)}}></input><br/>
                    Logoped: <input type="checkbox" checked={logoped} onChange={(e) => {set_logoped(e.target.checked)}}></input><br/>
                    Dietist: <input type="checkbox" checked={dietist} onChange={(e) => {set_dietist(e.target.checked)}}></input><br/>
                    Kurator: <input type="checkbox" checked={kurator} onChange={(e) => {set_kurator(e.target.checked)}}></input><br/>
                    Annan resurs: <input value={annan_resurs} onChange={(e) => {set_annan_resurs(e.target.value)}}></input><br/>
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
                    <button class="editSave">Spara</button>
        </form>
        </div> 
        </Fragment>
    );
    }

    return (
        <Fragment>
            {getHembData()}
        </Fragment>
    )
};    

export default EditHembesok;
