import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EditMott = (useParams) => {
    const {id} = useParams.match.params;

    
        const [protokollnr, setProtokollnr] = useState();
        const [date, setDate] = useState();
        const [start_time, setStartTime] = useState();
        const [end_time, setEndTime] = useState();
        const [performed_by, setPerformedBy] = useState();
        const [amning_nutrition, setAmning] = useState();
        const [stodsamtal, setStodsamtal] = useState();
        const [viktkontroll, setViktkontroll] = useState();
        const [provtagning, setProvtagning] = useState();
        const [lakemedel, setLakemedel] = useState();
        const [annat_mote, setAnnatMote] = useState();
        const [lakare, setLakare] = useState();
        const [logoped, setLogoped] = useState();
        const [dietist, setDietist] = useState();
        const [kurator, setKurator] = useState();
        const [annan_resurs, setAnnanResurs] = useState();
        const [av_logistik, setAvLogistik] = useState();
        const [av_barn_familj, setAvBarnFamilj] = useState();
        const [av_personal, setAvPersonal] = useState();
        const [av_beskrivning, setAvBesk] = useState();

    const submit = (e) => {
        e.preventDefault();

    }
    
        
    return(<Fragment>
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

            Provtagning: <input type="checkbox" checked={provtagning} 
                onChange={(e) => {setProvtagning(e.target.checked)}} /> <br/>

            Läkemedel: <input type="checkbox" checked={lakemedel} 
                onChange={(e) => {setLakemedel(e.target.checked)}} /> <br/>
                

            Annan åtgärd: <input type="text" value={ annat_mote } 
                onChange={(e) => {setAnnatMote(e.target.value)}}/> <br/>

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
            
            {/* avvikelser*/}
            Logistik <input type="checkbox" checked={av_logistik} 
                onChange={(e) => {setAvLogistik(e.target.checked)}}/> <br/>
            Barn/Familj <input type="checkbox" checked={ av_barn_familj } 
                onChange={(e) => {setAvBarnFamilj(e.target.checked)}}/> <br/>
            Personal <input type="checkbox" checked={av_personal} 
                onChange={(e) => {setAvPersonal(e.target.checked)}}/> <br/>
            Förklaring: <input type="text" value={av_beskrivning} 
                onChange={(e) => {setAvBesk(e.target.value)}}/> <br/>

            <input type="submit" value="Spara" />

        </form>

    </Fragment>);
}

export default EditMott;
