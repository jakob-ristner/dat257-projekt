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

    // <++>={ <++> } onChange={(e) => {set<++>(e.target.<++>)}}
    
    const submit = async (e) => {  
        e.preventDefault();
        const body = {
            date,
            start_time, 
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
            avvikelse
        } 
        console.log(body);
    }
        
    return (<Fragment>

        <h1>Id: {id}</h1>
        <form onSubmit={submit}>
            Datum: <input type="date" value={ date } 
                onChange={(e) => {setDate(e.target.value)}}/> <br/>

            Starttid: <input type="time" value={ start_time } 
                onChange={(e) => {setStartTime(e.target.value)}}/> <br/>

            Sluttid: <input type="time" value={ end_time } 
                onChange={(e) => {setEndTime(e.target.value)}}/> <br/>

            Utförd av: <input type="text" value={ performed_by } 
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

 
