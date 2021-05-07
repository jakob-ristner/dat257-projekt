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
    const [avvikelse, setAvvikelse] = useState();
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
        setAvvikelse(jsonData.avvikelse);
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
            avvikelse,
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

            Amning: <input type="checkbox" checked={ amning_nutrition } 
                onChange={(e) => {setAmning(e.target.checked)}}/> <br/>

            Stödsamtal: <input type="checkbox" checked={ stodsamtal } 
                onChange={(e) => {setStodsamtal(e.target.checked)}}/> <br/>

            Viktkontroll: <input type="checkbox" checked={ viktkontroll } 
                onChange={(e) => {setViktkontroll(e.target.checked)}} /> <br/>

            Annat: <input type="text" value={ annat_mote } 
                onChange={(e) => {setAnnat(e.target.value)}}/> <br/>

            Läkare: <input type="checkbox" checked={ lakare } 
                onChange={(e) => {setLakare(e.target.checked)}}/> <br/>

            Logoped <input type="checkbox" checked={ logoped } 
                onChange={(e) => {setLogoped(e.target.checked)}}/> <br/>

            Dietist <input type="checkbox" checked={ dietist } 
                onChange={(e) => {setDietist(e.target.checked)}}/> <br/>
            Kurator <input type="checkbox" checked={ kurator } 
                onChange={(e) => {setKurator(e.target.checked)}}/> <br/>

            Annan Resurs: <input type="text" value={ annan_resurs } 
                onChange={(e) => {setAnnanResurs(e.target.value)}}/> <br/>
            
            Avvikelser: <input type="text" value={avvikelse} onChange={(e) => {setAvvikelse(e.target.value)}}/> <br/>

            <input type="submit" value="Spara" />

        </form>

    </Fragment>);
}

export default EditDigvard;

 
