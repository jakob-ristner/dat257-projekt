import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 


const EditDigvard = (useParams) => {
    const {id} = useParams.match.params;

    const [date, setDate] = useState();
    const [start_time, setStartTime] = useState();
    const [end_time, setEndTime] = useState();
    const [performed_by, setPerformedBy] = useState();
    const [amning_nutrition, setAmning] = useState();
    const [stodsamtal, setStodsamtal] = useState();
    const [viktkontroll, setViktkontroll] = useState();
    const [annat_mote, setAnnat] = useState();
    const [lakare, setLakare] = useState();
    const [logoped, setLogoped] = useState();
    const [dietist, setDietist] = useState();
    const [kurator, setKurator] = useState();
    const [annan_resurs, setAnnanResurs] = useState();


    const [av_logistik, set_av_logistik] = useState(false);
    const [av_barn_familj, set_av_barn_familj] = useState(false);
    const [av_personal, set_av_personal] = useState(false);
    const [av_beskrivning, setAvBesk] = useState("");

    const [protokollnr, setProtokollnr] = useState();

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
            body: JSON.stringify(body)
        });
        console.log(response);
        window.location = "/digitalt-vardmote/" + protokollnr;

    } catch (error) {
        console.error(error.message);
    }
    }
        
    return (<Fragment>

        <h1>Id: {id}</h1>
        <button onClick={() => {window.location = "/digitalt-vardmote/" + protokollnr}}>Avbryt</button>
        <form onSubmit={submit}>
            Datum: <input required type="date" value={ date } 
                onChange={(e) => {setDate(e.target.value)}}/> <br/>
            Starttid: <input required type="time" value={ start_time } 
                onChange={(e) => {setStartTime(e.target.value)}}/> <br/>
            Sluttid: <input required type="time" value={ end_time } 
                onChange={(e) => {setEndTime(e.target.value)}}/> <br/>
            Utförd av: <input required type="text" value={ performed_by } 
                onChange={(e) => {setPerformedBy(e.target.value)}}/> <br/>


            <input type="checkbox" checked={ amning_nutrition } 
                onChange={(e) => {setAmning(e.target.checked)}}/> Amning <br/>
            <input type="checkbox" checked={ stodsamtal } 
                onChange={(e) => {setStodsamtal(e.target.checked)}}/> Stödsamtal <br/>
            <input type="checkbox" checked={ viktkontroll } 
                onChange={(e) => {setViktkontroll(e.target.checked)}} /> Viktkontroll <br/>
            Annat: <input type="text" value={ annat_mote } 
                onChange={(e) => {setAnnat(e.target.value)}}/> <br/>


            <input type="checkbox" checked={ lakare } 
                onChange={(e) => {setLakare(e.target.checked)}}/> Läkare <br/>
            <input type="checkbox" checked={ logoped } 
                onChange={(e) => {setLogoped(e.target.checked)}}/> Logoped <br/>
            <input type="checkbox" checked={ dietist } 
                onChange={(e) => {setDietist(e.target.checked)}}/> Dietist <br/>
           <input type="checkbox" checked={ kurator } 
                onChange={(e) => {setKurator(e.target.checked)}}/>  Kurator <br/>
            Annan Resurs: <input type="text" value={ annan_resurs } 
                onChange={(e) => {setAnnanResurs(e.target.value)}}/> <br/>
            

            <input type="checkbox" checked={av_logistik} onChange={(e) => {set_av_logistik(e.target.checked)}}/> Avvikelse logistik
            <input type="checkbox" checked={av_barn_familj} onChange={(e) => {set_av_barn_familj(e.target.checked)}}/> Avvikelse barn/familj
            <input type="checkbox" checked={av_personal} onChange={(e) => {set_av_personal(e.target.checked)}}/> Avvikelse personal
            Förklaring: <input type="text" value={av_beskrivning} onChange={(e) => {setAvBesk(e.target.value)}}></input><br/>

            <input type="submit" value="Spara" />

        </form>

    </Fragment>);
}

export default EditDigvard;

 
