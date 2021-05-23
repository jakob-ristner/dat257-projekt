import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import { validateAtgard } from "../../../utils/inputs";
import layout from "../../cssModules/AddForm.module.css";

const EditDigvard = (useParams) => {
    const {id} = useParams.match.params;

    //date
    const [date, setDate] = useState();
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [performed_by, setPerformedBy] = useState();

    //checkboxes
    const [amning_nutrition, setAmning] = useState();
    const [stodsamtal, setStodsamtal] = useState();
    const [viktkontroll, setViktkontroll] = useState();
    const [annat_mote, setAnnat] = useState();

    const [lakare, setLakare] = useState();
    const [logoped, setLogoped] = useState();
    const [dietist, setDietist] = useState();
    const [kurator, setKurator] = useState();
    const [annan_resurs, setAnnanResurs] = useState();

    //avvikelser
    const [av_logistik, set_av_logistik] = useState(false);
    const [av_barn_familj, set_av_barn_familj] = useState(false);
    const [av_personal, set_av_personal] = useState(false);
    const [av_beskrivning, setAvBesk] = useState("");

    const [protokollnr, setProtokollnr] = useState();


    //Method for modifying the old Digital-vardmote
    const getInfo = async () => {
        const response = await fetch("http://localhost:5000/digitalt-vardmote/edit/" + id);
        const jsonData = await response.json();

        setDate(jsonData.date);
        setStartTime(jsonData.start_time);
        setEndTime(jsonData.end_time);
        setPerformedBy(jsonData.performed_by);
        setAmning(jsonData.amning_nutrition);
        setStodsamtal(jsonData.stodsamtal);
        setViktkontroll(jsonData.viktkontroll);
        setAnnat(jsonData.annat_mote);
        setLakare(jsonData.lakare);
        setLogoped(jsonData.logoped);
        setDietist(jsonData.dietist);
        setKurator(jsonData.kurator);
        setAnnanResurs(jsonData.annan_resurs);

        set_av_logistik(jsonData.av_logistik);
        set_av_barn_familj(jsonData.av_barn_familj);
        set_av_personal(jsonData.av_personal);
        setAvBesk(jsonData.av_beskrivning);
        
        setProtokollnr(jsonData.protocolid);
    }

    useEffect(() => {
        getInfo();
    }, [])

    //Method for submitting the new update on Digital-vardmote and saving it in the Postgres Database
    const submit = async (e) => {  
        e.preventDefault();
        const date_start_time = date + " " + start_time;
        try {
        const body = { 
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
            av_logistik,
            av_barn_familj,
            av_personal,
            av_beskrivning,
            date_start_time
        }
        console.log(body);
        const response = await fetch('http://localhost:5000/digitalt-vardmote/' + id,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body),
            credentials: 'include'
        });
        console.log(response);
        window.location = "/digitalt-vardmote/" + protokollnr;

    } catch (error) {
        console.error(error.message);
    }
    }
        

    //Displaying the Digital-vardmote form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database.
    return (<Fragment>

        <h1>Redigera Digital-vardmote med id: {id}</h1>

        <div className={layout.protID}>
            <h2>Protokollnummer: {protokollnr}</h2>
        </div>

        
        <form onSubmit={submit}> 
            
            <div class = {layout.gridHalleluja}>

                <div><h2 className={layout.headerInfo}>Välj tider:</h2></div>

                <div><h2 className={layout.headerAtgard}>Välj Åtgärd:</h2></div>

                <div><h2 className={layout.headerResurs}>Välj Resurs:</h2></div>

                <div> <h2 className={layout.headerAvvikning}>Välj Avvikning:</h2></div>


            <div class= {layout.info}>
             <div class ={layout.gridInfo}>

             <div> Datum: <input required type="date" value={ date } 
                onChange={(e) => {setDate(e.target.value)}}/></div>
            <div> Starttid: <input required type="time" value={ start_time } 
                onChange={(e) => {setStartTime(e.target.value)}}/> </div>
            <div> Sluttid: <input required type="time" value={ end_time } 
                onChange={(e) => {setEndTime(e.target.value)}}/> </div>
            <div> Utförd av: <input required type="text" value={ performed_by } 
                onChange={(e) => {setPerformedBy(e.target.value)}}/> </div>

            </div>
            </div>
            
        <div class= {layout.atgard + " atgard"}>
        <div class ={layout.gridAtgard}>
        
            <div><input type="checkbox" checked={ amning_nutrition } 
                onChange={(e) => {setAmning(e.target.checked)}}/> Amning </div>
            <div><input type="checkbox" checked={ stodsamtal } 
                onChange={(e) => {setStodsamtal(e.target.checked)}}/> Stödsamtal </div>
            <div><input type="checkbox" checked={ viktkontroll } 
                onChange={(e) => {setViktkontroll(e.target.checked)}} /> Viktkontroll </div>
            <div>Annat: <input type="text" value={ annat_mote } 
                onChange={(e) => {setAnnat(e.target.value)}}/> </div>

            </div>
            </div>

        <div class= {layout.resurs}>
        <div class = {layout.gridResurs}>
            
            <div><input type="checkbox" checked={ lakare } 
                onChange={(e) => {setLakare(e.target.checked)}}/> Läkare </div>
            <div><input type="checkbox" checked={ logoped } 
                onChange={(e) => {setLogoped(e.target.checked)}}/> Logoped </div>
            <div><input type="checkbox" checked={ dietist } 
                onChange={(e) => {setDietist(e.target.checked)}}/> Dietist </div>
            <div><input type="checkbox" checked={ kurator } 
                onChange={(e) => {setKurator(e.target.checked)}}/>  Kurator </div>
            <div>Annan Resurs: <input type="text" value={ annan_resurs } 
                onChange={(e) => {setAnnanResurs(e.target.value)}}/> </div>
        </div>
        </div>    


        <div class= {layout.avvikning}>
        <div class = {layout.gridAvvikning}>

            <div><input type="checkbox" checked={av_logistik} onChange={(e) => {set_av_logistik(e.target.checked)}}/> Avvikelse logistik </div>
            <div><input type="checkbox" checked={av_barn_familj} onChange={(e) => {set_av_barn_familj(e.target.checked)}}/> Avvikelse barn/familj</div>
            <div><input type="checkbox" checked={av_personal} onChange={(e) => {set_av_personal(e.target.checked)}}/> Avvikelse personal </div>
            <div> Förklaring: <input type="text" value={av_beskrivning} onChange={(e) => {setAvBesk(e.target.value)}}></input></div>
        
        </div>
        </div>

            <div class = {layout.divButton}>
            <button class = {layout.saveButton}>Spara</button>
            <button class= {layout.avbrytButton} onClick={() => {window.location = "/digitalt-vardmote/" + protokollnr}}>Avbryt</button>
            </div>

        </div>
        </form>

    </Fragment>);
}

export default EditDigvard;

 
