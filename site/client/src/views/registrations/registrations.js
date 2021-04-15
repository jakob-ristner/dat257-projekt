import React, { Fragment, useEffect, useState} from "react";

const Registration = () => {
    const [protocolIDinput, setProtocolID] = useState(0);
    const [regDate, setRegDate] = useState("");
    const [reason, setReason] = useState(""); 
    const [ifyllnadkollad, setIfyllnadKollad] = useState(false);
    const [registrerad, setRegistrerad] = useState(false);
    const [veckor, setVeckor] = useState(0);
    const [dagar, setDagar] = useState(0);
    const [vikt_fodelse, setViktFodelse] = useState(1);
    const [langd_fodelse, setLangdFodelse] = useState(1);
    const [huvudomfang_fodelse, setHuvudomfangFodelse] = useState(1);
    const [vikt_inskrivning, setViktIn] = useState(0);
    const [langd_inskrivning, setLangdIn] = useState(0);
    const [huvudomfang_in, setHuvudIn] = useState(0);
    const [mamma_vill_amma, setMammaAmma] = useState(false);
    const [amning_inskrivning, setAmningIn] = useState();
    const [v_sond_in, setVsondIn] = useState(false);
    const [infart_in, setInfartIn] = useState();
    const [andningsstod_in, setAndningsIn] = useState();
    const [extraGas_in, setExtraGasIn] = useState(false);
    const [riskpatient, setRiskPatient] = useState(false);
    const [bvcRapportering, setBvcRapportering] = useState(true);
    const [bvcText, setBvcText] = useState();
    //protocolID, regDate, reason, ifyllnadkollad, registrerad,
    //veckor, dagar, vikt_fodelse, langd_fodelse, 
    //huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
    //huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
    //infart_in, andningsstod_in, extraGas_in
    
    
    
    

    const submitRegistation = async(e) => {
        e.preventDefault();
        const submitForm = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                protocolID: protocolIDinput,
                regDate: regDate,
                reason: reason
            })
        };

        const respone = await fetch(
            'http://localhost:5000/registration', 
            submitForm
            );
        console.log(respone);

    }

    const getRegistration = async(index) => {
        try {
            const response = await fetch(
                "http://localhost:5000/registration/" + protocolIDinput);
                const jsonData = await response.json();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <h1>Inskrivning </h1>

            <form onSubmit={submitRegistation}>
            <label for="fname">ProtkollID:</label>
            <input type="number" 
                value={protocolIDinput} 
                id="protokollID" 
                name="fname"
                onChange={(e) => {
                    setProtocolID(e.target.value)} }>
                </input>
    
            <label for="lname">Registreringsdatum:</label>
             <input 
                type="date" 
                value={regDate} 
                id="date" 
                name="lname"
                onChange={(e) => {
                    setRegDate(e.target.value)
                }}
                >
                 </input>

            <label for="lname">Anledning för inskrivning:</label>
             <input 
                type="text" 
                value={reason} 
                id="reason" 
                name="lname"
                onChange={(e) => {
                    setReason(e.target.value)
                }}
                >
                 </input>

                
    
             <input type="submit" value="Submit">
                  </input>
              </form>

        </Fragment>
    );
}


export default Registration;