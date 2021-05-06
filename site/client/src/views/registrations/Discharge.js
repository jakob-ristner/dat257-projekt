import React, { Fragment, useEffect, useState} from "react";
import Navigation from "../components/navigationButtons";
import Home from "../components/HomeButton";
import "./registrations.css";
import {getTriple, getInput, getYesNo, threeCheck, validateMulti} from "../../utils/inputs.js"

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
            
           console.log(dis);
           
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
                <button type = "submit" class="button1" onClick={validateMulti()}>Spara utskrivning</button>
            )
        }
    }

    const editButton = () => {
        return(
            <button class="button1" id="editButton" onClick={() => {window.location = "/registration/edit/" + id}}>Redigera</button>
        )
    }

    console.log(fullRegistration);

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
                        {getYesNo("Mamma vill amma", fullRegistration.mamma_vill_amma, () => {})}
                        
                        {getTriple("Amning", fullRegistration.amning_inskrivning, () => {})}
                        {getTriple("Amning", fullRegistration.erhaller_bmjolk_in, () => {})}
                        {getYesNo("Barnet har ventrikelsond", fullRegistration.v_sond_in, () => {})}
                        Barnet har infart(Ange typ av infart) <input type="text" value={fullRegistration.infart_in} ></input><br></br>
                        Andningsstöd (ange form) <input type="text" value={fullRegistration.andningsstod_in} ></input><br></br>
                        {getYesNo("Extra syrgasbehov", fullRegistration.extragas_in, () => {})}
                    </div>

                    <div class="riskpatient" id="riskpatient">
                        Riskpatient <input type="checkbox" checked={fullRegistration.riskpatient} ></input><br></br>
                        {getYesNo("Överrapportering till Barnavårdscentralen i hemmet", fullRegistration.bvcrapportering, () => {})}
                        Om nej ange orsak<input type="text" value={fullRegistration.bvctext} ></input><br></br>
                    </div>
                    </div>
                </form>
                
            {editButton()}
               
           
               <div class="discharge" id="discharge" >
                <h1>Utskrivning</h1>
                <form onSubmit={submitDischarge}>
                        {getInput("Utskrivningsdatum", "date", true, outDate, setOutDate)}
                        {getInput("Vikt (g)", "number", true, vikt_utskrivning, setViktUt)}
                        {getInput("Längd (cm)", "number", true, langd_utskrivning, setLangdUt)}
                        {getInput("Huvudomfång (cm)", "number", true, huvudomfang_ut, setHuvudomfangUt)}
                        {getYesNo("Mamma vill amma", mamma_vill_amma_ut, setMammaAmmaUt)}    
                        {getTriple("Amning", amning_utskrivning, setAmningUt)}
                        {getTriple("Erhåller bröstmjölk", erhaller_bmjolk_ut, setErhallerBmjolkUt)} 
                        {getYesNo("Barnet har v-sond", v_sond_ut, setVsondUt)}
                        {getInput("Barnet har infart", "text",false, infart_ut, setInfartUt)} 
                        {getInput("Andningsstöd","text",false, andningsstod_ut, setAndningsstodUt)}
                        {getYesNo("Extra syrgasbehov", extraGas_ut, setExtraGasUt)}
                        {submitEdit()}
                    </form>
                    
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
