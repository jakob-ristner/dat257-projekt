import React, { Fragment, useEffect, useState} from "react";


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
    const [infart_in, setInfartIn] = useState();
    const [andningsstod_in, setAndningsIn] = useState();
    const [extraGas_in, setExtraGasIn] = useState(null);
    const [riskpatient, setRiskPatient] = useState(null);
    const [bvcRapportering, setBvcRapportering] = useState(null);
    const [bvcText, setBvcText] = useState();
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
                        <input type="number" value={protocolID} onChange={(e) => {setProtocolID(e.target.value)} }></input><br></br>

                        Anledning för inskrivning:<input type="text" value={reason} id="reason" onChange={(e) => {setReason(e.target.value)}}></input>
                    </div>
            
           
            
                <div class="bakgrundsdata" id="bakgrundsdata">
                <h1>Födelsedata </h1>
                    Barnets gestationsvecka: <input type="number" value={veckor} onChange={(e) => {setVeckor(e.target.value)}}></input><br></br>
                    Dagar: <input type="number" value={dagar} onChange={(e) => {setDagar(e.target.value)}}></input><br></br>
                    Födelsevikt:  <input type="number" value={vikt_fodelse} onChange={(e) => {setViktFodelse(e.target.value)}}></input><br></br>
                    Födelselängd: <input type="number" value={langd_fodelse} onChange={(e) => {setLangdFodelse(e.target.value)}}></input><br></br>
                    Födelsehuvudomfång: <input type="number" value={huvudomfang_fodelse} onChange={(e) => {setHuvudomfangFodelse(e.target.value)}}></input><br></br>
                </div>
            
            <div class="inskrivning"  id="inskrivning">
                   <h1>Inskrivning </h1>
                   <label for="regDate">Inskrivningsdatum:</label>
                        <input type="date" value={regDate} id="date" onChange={(e) => setRegDate(e.target.value)} ></input><br></br>
                vikt (gram) <input type="number" value={vikt_inskrivning} onChange={(e) => {setViktIn(e.target.value)}}/><br/>
                längd (cm) <input type="number" value={langd_inskrivning} onChange={(e) => {setLangdIn(e.target.value)}}></input><br/>
                Huvudomfång (cm) <input type="number" value={huvudomfang_in} onChange={(e) => {setHuvudIn(e.target.value)}}></input><br/>
                Mamma vill amma: 
                    ja <input type="checkbox" class="ja" checked={mamma_vill_amma == true} onChange={() => threeCheck(mamma_vill_amma, setMammaAmma, true)} /> 
                    nej <input type="checkbox" class="nej" checked={mamma_vill_amma == false} onChange={() => threeCheck(mamma_vill_amma, setMammaAmma, false)}/> <br/>
                Amning: 
                    H<input type="checkbox" checked={amning_inskrivning == "H"} class="helt" onChange={() => {threeCheck(amning_inskrivning, setAmningIn, "H")}}></input>
                    D<input type="checkbox" checked={amning_inskrivning == "D"} class="delvis" onChange={() => {threeCheck(amning_inskrivning, setAmningIn, "D")}}></input>
                    IA<input type="checkbox" checked={amning_inskrivning == "IA"} class="inte alls" onChange={() => {threeCheck(amning_inskrivning, setAmningIn, "IA")}}></input>
                    <br></br>
                Erhåller bröstmjölk:
                    H<input type="checkbox" checked={erhaller_bmjolk_in== "H"} class="helt" onChange={() => {threeCheck(erhaller_bmjolk_in, setBmjolkIn, "H")}}></input>
                    D<input type="checkbox" checked={erhaller_bmjolk_in == "D"} class="delvis" onChange={() => {threeCheck(erhaller_bmjolk_in, setBmjolkIn, "D")}}></input>
                    IA<input type="checkbox" checked={erhaller_bmjolk_in == "IA"} class="inte alls" onChange={() => {threeCheck(erhaller_bmjolk_in, setBmjolkIn, "IA")}}></input>
                    <br></br>
                Barnet har v-sond: ja <input type="checkbox" class="ja" checked={v_sond_in == true} onChange={() => threeCheck(v_sond_in, setVsondIn, true)} /> 
                        nej <input type="checkbox" class="nej" checked={v_sond_in == false} onChange={() => threeCheck(v_sond_in, setVsondIn, false)} /> <br />
                Barnet har infart(Ange typ av infart) <input type="text" value={infart_in} onChange={(e) => {setInfartIn(e.target.value)}}></input><br></br>
                Andningsstöd (ange form) <input type="text" value={andningsstod_in} onChange={(e) => {setAndningsIn(e.target.value)}}></input><br></br>
                Extra syrgasbehov: 
                    ja <input type="checkbox" class="ja" checked={extraGas_in == true} onChange={() => threeCheck(extraGas_in, setExtraGasIn, true)} /> 
                    nej <input type="checkbox" class="nej" checked={extraGas_in == false} onChange={() => threeCheck(extraGas_in, setExtraGasIn, false)} /> <br />
            </div>
            
    
            <div class="bottom" id="bottom">
                Riskpatient  :
                    ja <input type="checkbox" class="ja" checked={riskpatient == true} onChange={() => threeCheck(riskpatient, setRiskPatient, true)} /> 
                    nej <input type="checkbox" class="nej" checked={riskpatient == false} onChange={() => threeCheck(riskpatient, setRiskPatient, false)} /> <br />
                Överrapportering till BVC i hemmet  ja <input type="checkbox" class="ja" checked={bvcRapportering == true} onChange={() => threeCheck(bvcRapportering, setBvcRapportering, true)} /> 
                    nej <input type="checkbox" class="nej" checked={bvcRapportering == false} onChange={() => threeCheck(bvcRapportering, setBvcRapportering, false)} /> Om nej ange orsak:
                <input type="text" value={bvcText} onChange={(e) => {setBvcText(e.target.value)}}></input>
                <input type="submit" class="button1" ></input>
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