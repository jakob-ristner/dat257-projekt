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
    const [outDate, setOutDate] = useState();
    const [vikt_utskrivning, setViktUt] = useState();
    const [langd_utskrivning, setLangdUt] = useState();
    const [huvudomfang_ut, setHuvudomfangUt] = useState();
    const [mamma_vill_amma_ut, setMammaAmmaUt] = useState();
    const [amning_utskrivning, setAmningUt] = useState();
    const [erhaller_bmjolk_ut, setErhallerBmjolkUt] = useState();
    const [v_sond_ut, setVsondUt] = useState();
    const [infart_ut, setInfartUt] = useState();
    const [andningsstod_ut, setAndningsstodUt] = useState();
    const [extraGas_ut, setExtraGasUt] = useState();

    // Data has been sent?
    const [dataSent, setDataSent] = useState(true);
    



    //Method for  getting the registration form
    const getRegistration = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/registration/" + id);
            const jsonData = await response.json();
            setRegistration(jsonData);
          //  setIndividualReg();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRegistration();
    }, []);

    const getDischarge = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/discharge/" + id);
            const jsonData = await response.json();
            const dis = jsonData[0];

            console.log(dis);
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
            setExtraGasUt(dis.extraGas_ut);

            //console.log(jsonData.outdate);
            console.log(outDate);
            //console.log(jsonData);

          //  return(<h1>hjs</h1>)


          //  setIndividualReg();
        } catch (error) {
            console.error(error);
        }
    }
/*
    useEffect(() => {
        getDischarge();
    }, []); */

    const getPreviousData =() => {
        if (dataSent) {
            //return(getDischarge());
            getDischarge();
        } 
    }



    const updateRegistration = async(e) => {
        e.preventDefault();
        try {
            const updateForm = {
                method: 'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    protocolID: id,
                    regDate: regDate,
                    reason: reason
                })
            }

            const response = await fetch('http://localhost:5000/registration/' + id,
            updateForm);

            const data = await response.jsonData();
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
       
    }

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
            await getDischarge();
            //setDataSent(true);
        } catch (e) {
            console.error(e);
        }

        
    }

    

    return (
        <Fragment>
        
             <div class = "navigation"><Navigation id={"111"}/></div>
             <div id = "homeButton"><Home/></div>

            <h1>Inskrivning </h1>
            {fullRegistration.map(form => (

                <form onSubmit={updateRegistration}>
                    <div class="header">
                        <label for="protocolID">ProtkollID:</label>
                        <input type="number"
                            value={form.protocolid}
                            id="protokollID">
                        </input>

                        <label for="regDate">Inskrivningsdatum:</label>
                        <input
                            type="date"
                            value={form.regdate}
                            id="date"
                    
                        >
                        </input>

                    
                        Ifyllnad kollad: <input type="checkbox" checked={form.ifyllnadkollad} ></input><br></br>
                        Registrerad: <input type="checkbox" checked={form.registrerad}></input><br></br>

                    </div>

                    <div class="Reason">
                        <label for="reason">Anledning för inskrivning:</label>
                        <input
                            type="text"
                            value={form.reason}
                            id="reason"
                        
                        >
                        </input>
                    </div>

                    <div class="bakgrundsdata">
                        Barnets gestationsvecka: <input type="number" value={form.veckor} ></input>
                        <input type="number" value={form.dagar} ></input>Dagar<br></br>
                        Födelsevikt:  <input type="number" value={form.vikt_fodelse} ></input><br></br>
                        Födelselängd: <input type="number" value={form.langd_fodelse} ></input><br></br>
                        Födelsehuvudomfång: <input type="number" value={form.huvudomfang_fodelse} ></input><br></br>
                    </div>

                    <div class="Inskrivning">
                        vikt (gram) <input type="number" value={form.vikt_inskrivning} ></input><br />
                        längd (cm) <input type="number" value={form.langd_inskrivning} ></input><br />
                        Huvudomfång (cm) <input type="number" value={form.huvudomfang_in} ></input><br />
                        Mamma vill amma: <input type="checkbox" checked={form.mamma_vill_amma} ></input><br></br>
                        Amning: <input type="text" value={form.amning_inskrivning} ></input><br></br>
                        Barnet har v-sond: <input type="checkbox" checked={form.v_sond_in} ></input><br></br>
                        Barnet har infart(Ange typ av infart) <input type="text" value={form.infart_in} ></input><br></br>
                        Andningsstöd (ange form) <input type="text" value={form.andningsstod_in} ></input><br></br>
                        Extra syrgasbehov: <input type="checkbox" checked={form.extragas_in} ></input><br></br>

                    </div>

                    <div class="riskpatient">
                        Riskpatient <input type="checkbox" checked={form.riskpatient} ></input><br></br>
                        Överrapportering till BVC i hemmet <input type="checkbox" checked={form.bvcrapportering} ></input> Om nej ange orsak:
                <input type="text" value={form.bvcText} ></input>
                    </div>
                    <input type="submit" value="Edit">
                    </input>
                </form>
            ))}

            <div class="discharge" >
                <h1>Utskrivning</h1>
                <form onSubmit={submitDischarge}>
                <label for="outDate">Utskrivningsdatum</label>
                        <input type="date" value={outDate} onChange={(e) => {setOutDate(e.target.value)}}></input>
                        <br></br>
                        vikt (gram) <input type="number" value={vikt_utskrivning} onChange={(e) => {setViktUt(e.target.value)}} ></input><br/>
                        längd (cm) <input type="number" value={langd_utskrivning} onChange={(e) => {setLangdUt(e.target.value)}}></input><br/>
                        Huvudomfång (cm) <input type="number" value={huvudomfang_ut} onChange={(e) => {setHuvudomfangUt(e.target.value)}}></input><br />
                        Mamma vill amma: <input type="checkbox" checked={mamma_vill_amma_ut} onChange={(e) => {setMammaAmmaUt(e.target.checked)}}></input><br></br>
                        Amning: <input type="text" value={amning_utskrivning} onChange={(e) => {setAmningUt(e.target.value)}}></input><br></br>
                        Erhåller bröstmjölk <input type="text" value={erhaller_bmjolk_ut} onChange={(e) => {setErhallerBmjolkUt(e.target.value)}}></input><br></br>
                        Barnet har v-sond: <input type="checkbox" checked={v_sond_ut} onChange={(e) => {setVsondUt(e.target.checked)}}></input><br></br>
                        Barnet har infart(Ange typ av infart) <input type="text" value={infart_ut} onChange={(e) => {setInfartUt(e.target.value)}}></input><br></br>
                        Andningsstöd (ange form) <input type="text" value={andningsstod_ut} onChange={(e) => {setAndningsstodUt(e.target.value)}}></input><br></br>
                        Extra syrgasbehov: <input type="checkbox" checked={extraGas_ut} onChange={(e) => {setExtraGasUt(e.target.checked)}}></input><br></br>
                        <input type="submit" value="Spara utskrivning"></input>
                    </form>
            </div>

        </Fragment>
    );


/*
<div class="fullRegistration">
                protocolID: {form.protocolid}<br/>
                regDate: {form.regdate}<br/>
                reason: {form.reason}
            </div>

*/

}


export default Discharge;