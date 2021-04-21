import React, { Fragment, useEffect, useState} from "react";


const Registration = () => {
    //Background consts
    const [protocolID, setProtocolID] = useState(0);
    const [regDate, setRegDate] = useState("");
    const [reason, setReason] = useState(""); 
    const [ifyllnadkollad, setIfyllnadKollad] = useState(false);
    const [registrerad, setRegistrerad] = useState(false);
    const [veckor, setVeckor] = useState(0);
    const [dagar, setDagar] = useState(0);
    const [vikt_fodelse, setViktFodelse] = useState(1);
    const [langd_fodelse, setLangdFodelse] = useState(1);
    const [huvudomfang_fodelse, setHuvudomfangFodelse] = useState(1);


    //Const for inskrivning
    const [vikt_inskrivning, setViktIn] = useState(0);
    const [langd_inskrivning, setLangdIn] = useState(0);
    const [huvudomfang_in, setHuvudIn] = useState(0);
    const [mamma_vill_amma, setMammaAmma] = useState(false);
    const [amning_inskrivning, setAmningIn] = useState();
    const [erhaller_bmjolk_in, setErhallerBmjolkIn] = useState(null);
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
        
        try {
            const body = {
                protocolID, 
                regDate, 
                reason, 
                ifyllnadkollad, 
                registrerad,
                veckor, 
                dagar,
                vikt_fodelse, 
                langd_fodelse, 
                huvudomfang_fodelse, 
                vikt_inskrivning, 
                langd_inskrivning,
                huvudomfang_in, 
                mamma_vill_amma, 
                amning_inskrivning,
                erhaller_bmjolk_in, 
                v_sond_in,
                infart_in, 
                andningsstod_in, 
                extraGas_in, 
                riskpatient, 
                bvcRapportering, 
                bvcText
            };
    
            const respone = await fetch('http://localhost:5000/registration', { 
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
            });

            window.location = "/registration/" + protocolID;

            console.log(respone);
        } catch (e) {
            console.error(e);
        }
    }

    const getRegistration = async(index) => {
        try {
            const response = await fetch(
                "http://localhost:5000/registration/" + protocolID);
                const jsonData = await response.json();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div class="form">
            
           
                <form onSubmit={submitRegistation}>    
                    <div class="protokollID">
                        <label for="protocolID">ProtkollID:</label>
                        <input type="number" value={protocolID} onChange={(e) => {setProtocolID(e.target.value)} }></input>
                        Ifyllnad kollad: <input type="checkbox" checked={ifyllnadkollad} onChange={(e) => {setIfyllnadKollad(e.target.checked)}}></input><br></br>
                        Registrerad: <input type="checkbox" checked={registrerad} onChange={(e) => {setRegistrerad(e.target.checked)}}></input><br></br>
                        Anledning för inskrivning:<input type="text" value={reason} id="reason" onChange={(e) => {setReason(e.target.value)}}></input>
                    </div>
            
           
            
                <div class="bakgrundsdata" id="bakgrundsdata">
                    Barnets gestationsvecka: <input type="number" value={veckor} onChange={(e) => {setVeckor(e.target.value)}}></input>
                    Dagar: <input type="number" value={dagar} onChange={(e) => {setDagar(e.target.value)}}></input><br></br>
                    Födelsevikt:  <input type="number" value={vikt_fodelse} onChange={(e) => {setViktFodelse(e.target.value)}}></input><br></br>
                    Födelselängd: <input type="number" value={langd_fodelse} onChange={(e) => {setLangdFodelse(e.target.value)}}></input><br></br>
                    Födelsehuvudomfång: <input type="number" value={huvudomfang_fodelse} onChange={(e) => {setHuvudomfangFodelse(e.target.value)}}></input><br></br>
                </div>
            
                <div class="inskrivning">
                     <h1>Inskrivning </h1>
                    inskrivningsdatum: <input type="date" value={regDate} onChange={(e) => {setRegDate(e.target.value)}}/><br/>
                    vikt (gram) <input type="number" value={vikt_inskrivning} onChange={(e) => {setViktIn(e.target.value)}}></input><br/>
                    längd (cm) <input type="number" value={langd_inskrivning} onChange={(e) => {setLangdIn(e.target.value)}}></input><br/>
                    Huvudomfång (cm) <input type="number" value={huvudomfang_in} onChange={(e) => {setHuvudIn(e.target.value)}}></input><br/>
                    Mamma vill amma: <input type="checkbox" checked={mamma_vill_amma} onChange={(e) => {setMammaAmma(e.target.checked)}}></input><br></br>
                    Amning: <input type="text" value={amning_inskrivning} onChange={(e) => {setAmningIn(e.target.value)}}></input><br></br>
                    Erhåller bröstmjölk <input type="text" value={erhaller_bmjolk_in} onChange={(e) => {setErhallerBmjolkIn(e.target.value)}}></input><br></br>
                    Barnet har v-sond: <input type="checkbox" checked={v_sond_in} onChange={(e) => {setVsondIn(e.target.checked)}}></input><br></br>
                    Barnet har infart(Ange typ av infart) <input type="text" value={infart_in} onChange={(e) => {setInfartIn(e.target.value)}}></input><br></br>
                    Andningsstöd (ange form) <input type="text" value={andningsstod_in} onChange={(e) => {setAndningsIn(e.target.value)}}></input><br></br>
                    Extra syrgasbehov: <input type="checkbox" checked={extraGas_in} onChange={(e) => {setExtraGasIn(e.target.checked)}}></input><br></br>
                </div>
            
    
                    <div class="bottom">
                        Riskpatient <input type="checkbox" checked={riskpatient} onChange={(e) => {setRiskPatient(e.target.checked)}}></input>
                        Överrapportering till BVC i hemmet <input type="checkbox" checked={bvcRapportering} onChange={(e) => {setBvcRapportering(e.target.checked)}}></input> Om nej ange orsak:
                        <input type="text" value={bvcText} onChange={(e) => {setBvcText(e.target.value)}}></input><br></br>
                        <input type="submit" value="Submit"></input>
                    </div>      
                </form>
       

            <div class="discharge" >
                <h1>Utskrivning</h1>
                <form>
                <label for="outDate">Utskrivningsdatum</label>
                    <input type="date" disabled></input>
                    <br></br>
                        vikt (gram) <input type="number" disabled ></input><br/>
                        längd (cm) <input type="number" disabled></input><br/>
                        Huvudomfång (cm) <input type="number" disabled></input><br />
                        Mamma vill amma: <input type="checkbox" disabled></input><br></br>
                        Amning: <input type="text" disabled></input><br></br>
                        Erhåller bröstmjölk <input disabled></input><br></br>
                        Barnet har v-sond: <input type="checkbox" disabled></input><br></br>
                        Barnet har infart(Ange typ av infart) <input type="text" disabled></input><br></br>
                        Andningsstöd (ange form) <input type="text" disabled></input><br></br>
                        Extra syrgasbehov: <input type="checkbox" disabled></input><br></br>
                </form>
            </div>
        </div>
              



        </Fragment>
    );
}
//  <label>Inskrivningsdatum: </label> <input type="date" value={regDate} onChange={(e) => {setRegDate(e.target.value)}}> </input><br/>


export default Registration;