import React, {Fragment, useEffect, useLayoutEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {validateAtgard} from "../../utils/inputs.js"

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

    const getInfo = async () => {
        const response = await fetch(
            "http://localhost:5000/mottagningsbesok/edit/" + id);
        const jsonData = await response.json(); 

        setProtokollnr(jsonData.protocolid);
        setDate(jsonData.date);
        setStartTime(jsonData.start_time);
        setEndTime(jsonData.end_time);
        setPerformedBy(jsonData.performed_by);
        setAmning(jsonData.amning_nutrition);
        setStodsamtal(jsonData.stodsamtal);
        setViktkontroll(jsonData.viktkontroll);
        setProvtagning(jsonData.provtagning);
        setLakemedel(jsonData.lakemedel);
        setAnnatMote(jsonData.annat_mote);
        setLakare(jsonData.lakare);
        setLogoped(jsonData.logoped);
        setDietist(jsonData.dietist);
        setKurator(jsonData.kurator);
        setAnnanResurs(jsonData.annan_resurs);
        setAvLogistik(jsonData.av_logistik);
        setAvBarnFamilj(jsonData.av_barn_familj);
        setAvPersonal(jsonData.av_personal);
        setAvBesk(jsonData.av_beskrivning);
    }

    useEffect(()  => {
        getInfo();
    }, [])

    const submit = async(e) => {
        e.preventDefault();
        try {
            const body = {
            date,
            start_time,
            end_time,
            performed_by,
            amning_nutrition,
            stodsamtal,
            viktkontroll,
            provtagning,
            lakemedel,
            annat_mote,
            lakare,
            logoped,
            dietist,
            kurator,
            annan_resurs,
            av_logistik,
            av_barn_familj,
            av_personal,
            av_beskrivning
            };

            const response = await fetch("http://localhost:5000/mottagningsbesok/" + id,
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                });
        

            window.location = "mottagningsbesok/" + protokollnr;
        } catch (err) {
            console.error(err.message);
        }



    }
    
        
    return(<Fragment>
        <h1>Id: {id}</h1>
        <button onClick={() => {window.location = "/mottagningsbesok/" + protokollnr}}>Avbryt</button>
        <form onSubmit={submit}>
            <div className="information">
            Datum: <input required type="date" value={ date } 
                onChange={(e) => {setDate(e.target.value)}}/> <br/>

            Starttid: <input required type="time" value={ start_time } 
                onChange={(e) => {setStartTime(e.target.value)}}/> <br/>

            Sluttid: <input required type="time" value={ end_time } 
                onChange={(e) => {setEndTime(e.target.value)}}/> <br/>

            Utförd av: <input required type="text" value={ performed_by } 
                onChange={(e) => {setPerformedBy(e.target.value)}}/> <br/>

            </div>

            <div className="atgard" onChange={() => validateAtgard()}>
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
            </div>

            <div className="resurs">
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
            </div>
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
