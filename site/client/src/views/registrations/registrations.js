import React, { Fragment, useEffect, useState} from "react";
import {getTriple, getInput, getYesNo, threeCheck, validateMulti} from "../../utils/inputs.js"


const Registration = () => {
    //Background consts
    const [protocolID, setProtocolID] = useState(0);
    const [regDate, setRegDate] = useState("");
    const [reason, setReason] = useState(""); 
    const [veckor, setVeckor] = useState(0);
    const [dagar, setDagar] = useState(0);
    const [vikt_fodelse, setViktFodelse] = useState(1);
    const [langd_fodelse, setLangdFodelse] = useState(1);
    const [huvudomfang_fodelse, setHuvudomfangFodelse] = useState(1);


    //Const for inskrivning
    const [vikt_inskrivning, setViktIn] = useState(0);
    const [langd_inskrivning, setLangdIn] = useState(0);
    const [huvudomfang_in, setHuvudIn] = useState(0);
    const [mamma_vill_amma, setMammaAmma] = useState(null);
    const [amning_inskrivning, setAmningIn] = useState(null);
    const [erhaller_bmjolk_in, setBmjolkIn] = useState(null);
    const [v_sond_in, setVsondIn] = useState(null);
    const [infart_in, setInfartIn] = useState("");
    const [andningsstod_in, setAndningsIn] = useState("");
    const [extraGas_in, setExtraGasIn] = useState(null);
    const [riskpatient, setRiskPatient] = useState(null);
    const [bvcRapportering, setBvcRapportering] = useState(null);
    const [bvcText, setBvcText] = useState("");
    //protocolID, regDate, reason, ifyllnadkollad, registrerad,
    //veckor, dagar, vikt_fodelse, langd_fodelse, 
    //huvudomfang_fodelse, vikt_inskrivning, langd_inskrivning,
    //huvudomfang_in, mamma_vill_amma, amning_inskrivning, v_sond_in,
    //infart_in, andningsstod_in, extraGas_in
    
    
    //Method for ensuring that only one tickbox can be ticked at once
    const threeCheck = (state, setState, value) => {
        if (state == value) {
            setState(null);
        } else {
            setState(value);
        }
    }
    

    const submitRegistation = async(e) => {
        e.preventDefault();
        try {
            const body = {
                protocolID, 
                regDate, 
                reason, 
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
           
                <form onSubmit={submitRegistation}>    
                <div class="form">
                    <div class="protokollID" id="protokollID">
                    <h1>Protokoll ID</h1>
                        <label for="protocolID">ProtkollID:</label>
                        <input type="number" required value={protocolID} onChange={(e) => {setProtocolID(e.target.value)} }></input><br></br>

                        Anledning för inskrivning:<input type="text" required value={reason} id="reason" onChange={(e) => {setReason(e.target.value)}}></input>
                    </div>
            
                <div class="bakgrundsdata" id="bakgrundsdata">
                <h1>Födelsedata </h1>
                {getInput("InskrivningsDatum", "date", true, regDate, setRegDate)}
                {getInput("Anledning för inskrivning", "text", true, reason, setReason)}
                {getInput("Barnets gestationsvecka", "number", true, veckor, setVeckor, 22, 44)}
                {getInput("dagar", "number", true, dagar, setDagar,0,6)} <br/>
                {getInput("Födelsevikt (gram)", "number", true, vikt_fodelse, setViktFodelse, 250, 6000)}
                {getInput("Födelselängd (cm)", "number", true, langd_fodelse, setLangdFodelse, 15, 60)}
                {getInput("Födelsehuvudomfång", "number", true, huvudomfang_fodelse, setHuvudomfangFodelse, 15, 50)}
                </div>
            
            <div class="inskrivning"  id="inskrivning">
                   <h1>Inskrivning </h1>
                   <label for="regDate">Inskrivningsdatum:</label>
                        <input type="date" required value={regDate} id="date" onChange={(e) => setRegDate(e.target.value)} ></input><br></br>
                vikt (gram) <input type="number" required value={vikt_inskrivning} onChange={(e) => {setViktIn(e.target.value)}}/><br/>
                längd (cm) <input type="number" required value={langd_inskrivning} onChange={(e) => {setLangdIn(e.target.value)}}></input><br/>
                Huvudomfång (cm) <input type="number" required value={huvudomfang_in} onChange={(e) => {setHuvudIn(e.target.value)}}></input><br/>
                {getYesNo("Mamma vill amma", mamma_vill_amma, setMammaAmma)}    
                {getTriple("Amning", amning_inskrivning, setAmningIn)}
                {getTriple("Erhåller bröstmjölk", erhaller_bmjolk_in, setBmjolkIn)} 

                {getYesNo("Barnet har v-sond", v_sond_in, setVsondIn)} 
                Barnet har infart(Ange typ av infart) <input type="text" value={infart_in} onChange={(e) => {setInfartIn(e.target.value)}}></input><br></br>
                Andningsstöd (ange form) <input type="text" value={andningsstod_in} onChange={(e) => {setAndningsIn(e.target.value)}}></input><br></br>
                {getYesNo("Extra syrgasbehov", extraGas_in, setExtraGasIn)}
            </div>
            
    
            <div class="bottom" id="bottom">
                {getYesNo("RiskPatient", riskpatient, setRiskPatient)}
                {getYesNo("Överraportering till BVC i Hemmet", bvcRapportering, setBvcRapportering)}
                Om nej ange orsak:
                
                <input type="text" value={bvcText} onChange={(e) => {setBvcText(e.target.value)}}></input>
                <input type="submit" class="button1" onClick = {validateMulti()}></input>
            </div>
        

            <div class="discharge" id="discharge" >
                <h1>Utskrivning</h1>
                <form>
                <label for="outDate">Utskrivningsdatum</label>
                    <input type="date" disabled></input>
                    <br></br>
                        Vikt (gram) <input type="number" disabled ></input><br/>
                        Längd (cm) <input type="number" disabled></input><br/>
                        Huvudomfång (cm) <input type="number" disabled></input><br />
                        Mamma vill amma: 
                            ja <input type="checkbox" disabled /> 
                            nej <input type="checkbox" disabled/> <br />
                        Amning: 
                            H <input type="checkbox" disabled /> 
                            D <input type="checkbox" disabled/> 
                            IA <input type="checkbox" disabled/><br />
                        Erhåller bröstmjölk  
                            H <input type="checkbox" disabled /> 
                            D <input type="checkbox" disabled/> 
                            IA <input type="checkbox" disabled/><br />
                        Barnet har v-sond: 
                            ja <input type="checkbox" disabled /> 
                            nej <input type="checkbox" disabled/> <br />
                        Barnet har infart(Ange typ av infart) <input type="text" disabled></input><br></br>
                        Andningsstöd (ange form) <input type="text" disabled></input><br></br>
                        Extra syrgasbehov: 
                            ja <input type="checkbox" disabled /> 
                            nej <input type="checkbox" disabled/> <br />
                    </form>
            </div>

                 </div>      
                </form>
      
              



        </Fragment>
    );
}
//  <label>Inskrivningsdatum: </label> <input type="date" value={regDate} onChange={(e) => {setRegDate(e.target.value)}}> </input><br/>

// Ifyllnad kollad: <input type="checkbox" checked={ifyllnadkollad} onChange={(e) => {setIfyllnadKollad(e.target.checked)}}></input><br></br>
//Registrerad: <input type="checkbox" checked={registrerad} onChange={(e) => {setRegistrerad(e.target.checked)}}></input><br></br>
export default Registration;