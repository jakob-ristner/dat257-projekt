import React, {Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const EditMott = (useParams) => {
    const {id} = useParams.match.params;

    
    
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
    
        
    return(
        <h1>Mottagningsbesök!!!!!!!!!!!!!!!!</h1>
    );
}

export default EditMott;