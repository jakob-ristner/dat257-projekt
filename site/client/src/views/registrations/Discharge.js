import React, { Fragment, useEffect, useState} from "react";
import Navigation from "../components/navigationButtons";
import Home from "../components/HomeButton";
import "./registrations.css";

const Discharge = (useParams) => {
    //Constants for getting the registration form
    const [fullRegistration, setRegistration] = useState([]);
    const { id } = useParams.match.params;


    //Constants for updating the registration form
    const [regDate, setRegDate] = useState("");
    const [reason, setReason] = useState("");



    //constants for setting discharge params
    const [outDate, setOutDate] = useState("");
    const [vikt_utskrivning, setViktUt] = useState(0);
    const [langd_utskrivning, setLangdUt] = useState(0);
    const [huvudomfang_ut, setHuvudomfangUt] = useState(0);
    const [mamma_vill_amma_ut, setMammaAmmaUt] = useState();
    const [amning_utskrivning, setAmningUt] = useState();
    const [erhaller_bmjolk_ut, setErhallerBmjolkUt] = useState();
    const [v_sond_ut, setVsondUt] = useState();
    const [infart_ut, setInfartUt] = useState("");
    const [andningsstod_ut, setAndningsstodUt] = useState("");
    const [extraGas_ut, setExtraGasUt] = useState();

    // Data has been sent?
    const [dataSent, setDataSent] = useState(false);
    



       
    //Method for ensuring that only one tickbox can be ticked at once
    const threeCheck = (state, setState, value) => {
        if (state == value) {
            setState(null);
        } else {
            setState(value);
        }
    }
    

    //Method for  getting the registration form
    const getRegistration = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/registration/" + id);
            const jsonData = await response.json();
            setRegistration(jsonData[0]);
          //  setIndividualReg();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRegistration();
    }, []);



    //GET for all discharge params for the given protocol
    //Sets const dataSent to true. Used for knowing if discharge params
    //are filled in or not. 
    const getDischarge = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/discharge/" + id);
            const jsonData = await response.json();
            const dis = jsonData[0];
            if(dis != undefined){
                setDataSent(true);
                setOutDate(dis.outdate);
                setViktUt(dis.vikt_utskrivning);
                setLangdUt(dis.langd_utskrivning);
                setHuvudomfangUt(dis.huvudomfang_ut);
                setMammaAmmaUt(dis.mamma_vill_amma_ut);
                setAmningUt(dis.amning_utskrivning);
                setErhallerBmjolkUt(dis.erhaller_bmjolk_ut);
                setVsondUt(dis.v_sond_ut);
                setInfartUt(dis.infart_ut);
                setAndningsstodUt(dis.andningsstod_ut);
                setExtraGasUt(dis.extragas_ut);
            }
           // console.log(dis);
           
            //console.log(jsonData.outdate);
            //console.log(outDate);
            //console.log(jsonData);

          //  return(<h1>hjs</h1>)


          //  setIndividualReg();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDischarge();
    }, []);

    /*const getPreviousData =() => {
        if (dataSent) {
            //return(getDischarge());
            getDischarge();
        } 
    }*/



    //Method for submitting the discharge form
    const submitDischarge = async(e) => {
        e.preventDefault();
        
        
        try {
            const body = {
                outDate,
                vikt_utskrivning, 
                langd_utskrivning, 
                huvudomfang_ut,
                mamma_vill_amma_ut,
                amning_utskrivning,
                erhaller_bmjolk_ut, 
                v_sond_ut, 
                infart_ut, 
                andningsstod_ut, 
                extraGas_ut
            };
    
            const response = await fetch('http://localhost:5000/discharge/' + id, { 
                    method: 'POST',
                    headers:{'Content-Type': 'application/json'},
                    body: JSON.stringify(body)
            });

            await console.log(response);
            setDataSent(true);
        } catch (e) {
            console.error(e);
        }

        
    }

    const submitEdit = () => {
        if(dataSent) {
            return(
                <button class="button1" onClick={() => {window.location = "/registration/edit/" + id}}>Redigera</button>
            )
        }else{
            return(
                <button class="button1" onClick={submitDischarge}>Spara utskrivning</button>
            )
        }
    }

    const editButton = () => {
        return(
            <button class="button1" id="editButton" onClick={() => {window.location = "/registration/edit/" + id}}>Redigera</button>
        )
    }

    //The HTML document returned to the browser
    return (
        <Fragment>
             <div class = "navigation"><Navigation id={id}/></div>
             <div id = "homeButton"><Home/></div>

             <div class="formDischarge">
             

                <form>
                    <div class="formDischarge2">
                    <div class="header" id="header">
                         <h1>Protokoll ID </h1>
                        <label for="protocolID">ProtokollID:</label>
                        <input type="number"
                            value={fullRegistration.protocolid}
                            id="protokollID">
                        </input><br></br>
                
                
                        <label for="reason">Anledning för inskrivning:</label>
                        <input type="text" value={fullRegistration.reason} id="reason"></input>
                    </div>
          

                    <div class="bakgrundsdata" id="bakgrundsdata">
                    <h1>Födelsedata </h1>
                        Barnets gestationsvecka: <input type="number" required value={fullRegistration.veckor} ></input><br></br>
                        Dagar:<input type="number" required value={fullRegistration.dagar} ></input><br></br>
                        Födelsevikt:  <input type="number" required value={fullRegistration.vikt_fodelse} ></input><br></br>
                        Födelselängd: <input type="number" required value={fullRegistration.langd_fodelse} ></input><br></br>
                        Födelsehuvudomfång: <input type="number" required value={fullRegistration.huvudomfang_fodelse} ></input><br></br>
                    </div>

                    <div class="Inskrivning" id="Inskrivning">
                    <h1>Inskrivning </h1>
                         <label for="regDate">Inskrivningsdatum:</label>

                        <input type="date" required value={fullRegistration.regdate} id="date" ></input><br></br>
                        vikt (gram) <input type="number" required value={fullRegistration.vikt_inskrivning} ></input><br />
                        längd (cm) <input type="number" required value={fullRegistration.langd_inskrivning} ></input><br />
                        Huvudomfång (cm) <input type="number" required value={fullRegistration.huvudomfang_in} ></input><br />
                        Mamma vill amma: <input type="checkbox" checked={fullRegistration.mamma_vill_amma} ></input><br></br>
                        
                        Amning: <input type="text" value={fullRegistration.amning_inskrivning} ></input><br></br>
                        Erhåller bröstmjölk: <input type="text" value={fullRegistration.erhaller_bmjolk_in} ></input><br></br>
                        Barnet har v-sond: <input type="checkbox" checked={fullRegistration.v_sond_in} ></input><br></br>
                        Barnet har infart(Ange typ av infart) <input type="text" value={fullRegistration.infart_in} ></input><br></br>
                        Andningsstöd (ange form) <input type="text" value={fullRegistration.andningsstod_in} ></input><br></br>
                        Extra syrgasbehov: <input type="checkbox" checked={fullRegistration.extragas_in} ></input><br></br>
                    </div>

                    <div class="riskpatient" id="riskpatient">
                        Riskpatient <input type="checkbox" checked={fullRegistration.riskpatient} ></input><br></br>
                        Överrapportering till BVC i hemmet <input type="checkbox" checked={fullRegistration.bvcrapportering} ></input><br></br>
                        Om nej ange orsak<input type="text" value={fullRegistration.bvcText} ></input><br></br>
                    </div>
                    </div>
                </form>
                
            {editButton()}
               
           
 

            <div class="discharge" id="discharge" >
                <h1>Utskrivning</h1>
                <form >
                <label for="outDate">Utskrivningsdatum</label>
                        <input type="date" value={outDate} onChange={(e) => {setOutDate(e.target.value)}}></input>
                        <br></br>
                        vikt (gram) <input type="number" required value={vikt_utskrivning} onChange={(e) => {setViktUt(e.target.value)}} ></input><br/>
                        längd (cm) <input type="number" required value={langd_utskrivning} onChange={(e) => {setLangdUt(e.target.value)}}></input><br/>
                        Huvudomfång (cm) <input type="number" required value={huvudomfang_ut} onChange={(e) => {setHuvudomfangUt(e.target.value)}}></input><br />
                        Mamma vill amma:  
                            Ja <input type="checkbox" class="ja" checked={mamma_vill_amma_ut == true} onChange={() => threeCheck(mamma_vill_amma_ut, setMammaAmmaUt, true)} /> 
                            Nej <input type="checkbox" class="nej" checked={mamma_vill_amma_ut == false} onChange={() => threeCheck(mamma_vill_amma_ut, setMammaAmmaUt, false)} /> <br />
                        Amning: 
                            H<input type="checkbox" checked={amning_utskrivning == "H"} class="helt" onChange={() => {threeCheck(amning_utskrivning, setAmningUt, "H")}}></input>
                            D<input type="checkbox" checked={amning_utskrivning == "D"} class="delvis" onChange={() => {threeCheck(amning_utskrivning, setAmningUt, "D")}}></input>
                            IA<input type="checkbox" checked={amning_utskrivning == "IA"} class="inte alls" onChange={() => {threeCheck(amning_utskrivning, setAmningUt, "IA")}}></input>
                            <br></br>
                        Erhåller bröstmjölk :
                            H<input type="checkbox" checked={erhaller_bmjolk_ut == "H"} class="helt" onChange={() => {threeCheck(erhaller_bmjolk_ut, setErhallerBmjolkUt, "H")}}></input>
                            D<input type="checkbox" checked={erhaller_bmjolk_ut == "D"} class="delvis" onChange={() => {threeCheck(erhaller_bmjolk_ut, setErhallerBmjolkUt, "D")}}></input>
                            IA<input type="checkbox" checked={erhaller_bmjolk_ut == "IA"} class="inte alls" onChange={() => {threeCheck(erhaller_bmjolk_ut, setErhallerBmjolkUt, "IA")}}></input>
                    <br></br>
                        Barnet har v-sond: 
                            Ja <input type="checkbox" class="ja" checked={v_sond_ut == true} onChange={() => threeCheck(v_sond_ut, setVsondUt, true)} /> 
                            Nej <input type="checkbox" class="nej" checked={v_sond_ut == false} onChange={() => threeCheck(v_sond_ut, setVsondUt, false)} /> <br />
                        Barnet har infart(Ange typ av infart) <input type="text" value={infart_ut} onChange={(e) => {setInfartUt(e.target.value)}}></input><br></br>
                        Andningsstöd (ange form) <input type="text" value={andningsstod_ut} onChange={(e) => {setAndningsstodUt(e.target.value)}}></input><br></br>
                        Extra syrgasbehov: 
                            Ja <input type="checkbox" class="ja" checked={extraGas_ut == true} onChange={() => threeCheck(extraGas_ut, setExtraGasUt, true)} /> 
                            Nej <input type="checkbox" class="nej" checked={extraGas_ut == false} onChange={() => threeCheck(extraGas_ut, setExtraGasUt, false)} /> <br />
                        
                    </form>
                    {submitEdit()}
            </div>
        </div>       
        </Fragment>
    );


/*
<div class="fullRegistration">
                protocolID: {form.protocolid}<br/>
                regDate: {form.regdate}<br/>
                reason: {form.reason}
            </div>
                <input type="submit" value="Spara utskrivning"></input>
 <button onClick={() => {window.location = "/registration/edit/" + id}}> Redigera </button>

            
                        Ifyllnad kollad: <input type="checkbox" checked={form.ifyllnadkollad} ></input><br></br>
                        Registrerad: <input type="checkbox" checked={form.registrerad}></input><br></br>
*/

}


export default Discharge;
