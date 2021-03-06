import React, { Fragment, useEffect, useState} from "react";
import Navigation from "../components/navigationButtons";
import Home from "../components/HomeButton";
import {getTriple, getInput, getYesNo, threeCheck, validateMulti} from "../../utils/inputs.js"
import layouts from "../cssModules/registrations.module.css";


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

    
    const validateBvc = (checked) => {
        console.log(checked);
        if (checked && document.getElementById("orsak").value == "") {
            document.getElementById("orsak").setCustomValidity("Fyll i detta f??lt");
        } else {
            document.getElementById("orsak").setCustomValidity("");
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
                    body: JSON.stringify(body),
                    credentials: 'include'
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
                "http://localhost:5000/registration/" + protocolID, { credentials: 'include'});
                const jsonData = await response.json();
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Fragment>
            <div class = "navigation"><Navigation id={protocolID}/></div>
             <div id = "homeButton"><Home/></div>
            <h1>Fyll i nytt protokoll med ID: {protocolID}</h1>
                <form onSubmit={submitRegistation}>    
                <div class={layouts.form}>
                    <div class={layouts.protokollID} id={layouts.protokollID}>
                    <h1>Protokoll ID</h1>
                        <label for="protocolID">ProtkollID:</label>
                        <input type="number" required value={protocolID} onChange={(e) => {setProtocolID(e.target.value)} }></input><br></br>
                        {getInput("Anledning f??r inskrivning", "text", true, reason, setReason)}
                    </div>
            
                <div class={layouts.bakgrundsdata} id={layouts.bakgrundsdata}>
                <h1>F??delsedata </h1>
                {getInput("Barnets gestationsvecka", "number", true, veckor, setVeckor, 22, 44)}
                {getInput("Dagar", "number", true, dagar, setDagar,0,6)}
                {getInput("F??delsevikt (gram)", "number", true, vikt_fodelse, setViktFodelse, 250, 6000)}
                {getInput("F??delsel??ngd (cm)", "number", true, langd_fodelse, setLangdFodelse, 15, 60)}
                {getInput("F??delsehuvudomf??ng", "number", true, huvudomfang_fodelse, setHuvudomfangFodelse, 15, 50)}
                </div>
            
            <div class={layouts.inskrivning}  id={layouts.inskrivning}>
                   <h1>Inskrivning </h1>
                {getInput("InskrivningsDatum", "date", true, regDate, setRegDate)}
                {getInput("Vikt (g)", "number", true, vikt_inskrivning, setViktIn)}
                {getInput("L??ngd (cm)", "number", true, langd_inskrivning, setLangdIn)}
                {getInput("Huvudomf??ng (cm)", "number", true, huvudomfang_in, setHuvudIn)}
                {getYesNo("Mamma vill amma", mamma_vill_amma, setMammaAmma)}    
                {getTriple("Amning", amning_inskrivning, setAmningIn)}
                {getTriple("Erh??ller br??stmj??lk", erhaller_bmjolk_in, setBmjolkIn)} 
                {getYesNo("Barnet har ventrikelsond", v_sond_in, setVsondIn)} 
                Barnet har infart (Ange typ av infart) <input type="text" value={infart_in} onChange={(e) => {setInfartIn(e.target.value)}}></input><br></br>
                Andningsst??d (Ange form) <input type="text" value={andningsstod_in} onChange={(e) => {setAndningsIn(e.target.value)}}></input><br></br>
                {getYesNo("Extra syrgasbehov", extraGas_in, setExtraGasIn)}
            </div>
            
    
            <div class={layouts.bottom} id={layouts.bottom}>
                {getYesNo("Riskpatient", riskpatient, setRiskPatient)}
                <div class={layouts.multi}>
                ??verraportering till Barnav??rdscentralen:
                    ja <input type="checkbox"  class="ja" checked={bvcRapportering == true}
                        onChange={(e) => {
                            threeCheck(bvcRapportering, setBvcText, true)
                            if (e.target.checked == true) {
                                validateBvc(false);
                                setBvcText("");
                            } else {
                                validateBvc(false);
                                setBvcText(null);
                            }
                        }} /> 
                    nej <input id="bvcnej" type="checkbox"  class="nej" checked={bvcRapportering == false}
                        onChange={(e) => {
                            threeCheck(bvcRapportering, setBvcRapportering, false)
                            if (e.target.checked == false) {
                                validateBvc(false);
                                setBvcText("");
                            } else {
                                validateBvc(true);
                                setBvcText(null);
                            }
                        }} />
                </div>
                
                Om nej ange orsak: <input id="orsak" type="text" value={bvcText} onChange={(e) => {
                    if (bvcRapportering == false) {
                        validateBvc(true); // kinda ugly dont care bye bye
                        setBvcText(e.target.value)
                    } else {
                        validateBvc(false);
                    }

                }}/>
                <br></br>
                <input type="submit" class={layouts.button1} onClick = {validateMulti()}></input>
            </div>
        

            <div class={layouts.discharge} id={layouts.discharge} >
                <h1>Utskrivning</h1>
                <form>
                <label for="outDate">Utskrivningsdatum</label>
                    <input type="date" disabled></input>
                    <br></br>
                        Vikt (gram) <input type="number" disabled ></input><br/>
                        L??ngd (cm) <input type="number" disabled></input><br/>
                        Huvudomf??ng (cm) <input type="number" disabled></input><br />
                        Mamma vill amma: 
                            ja <input type="checkbox" disabled /> 
                            nej <input type="checkbox" disabled/> <br />
                        Amning: 
                            H <input type="checkbox" disabled /> 
                            D <input type="checkbox" disabled/> 
                            IA <input type="checkbox" disabled/><br />
                        Erh??ller br??stmj??lk  
                            H <input type="checkbox" disabled /> 
                            D <input type="checkbox" disabled/> 
                            IA <input type="checkbox" disabled/><br />
                        Barnet har ventrikelsond: 
                            ja <input type="checkbox" disabled /> 
                            nej <input type="checkbox" disabled/> <br />
                        Barnet har infart(Ange typ av infart) <input type="text" disabled></input><br></br>
                        Andningsst??d (ange form) <input type="text" disabled></input><br></br>
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
