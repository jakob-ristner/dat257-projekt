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

    /*

       <h1>Inskrivning </h1>

        {fullRegistration.map(form => (
            
            <form  onSubmit={updateRegistration}>
            <label for="fname">ProtkollID:</label>
            <input type="number" 
                value={form.protocolid} 
                id="protokollID" 
                name="fname"
                readOnly
           >
                </input>
    
            <label for="lname">Registreringsdatum:</label>
             <input 
                type="date" 
                value={form.regdate} 
                id="date" 
                name="lname"
                
                >
                 </input>
    
            <label for="lname">Anledning för inskrivning:</label>
             <input 
                type="text" 
                value={form.reason} 
                id="reason" 
                name="lname"
              
                
                >
                 </input>
    
             <input type="submit" value="Edit">
                  </input>
              </form>
        ))}
       

        */

    return (
        <Fragment>
             <div class = "navigation"><Navigation id={id}/></div>
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

                        <label for="outDate">Utskrivningsdatum</label>
                        <input type="date" value={form.outdate}></input>
                        <br></br>
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
                    <button onClick={() => {window.location = "/registration/edit/" + form.protocolid}}> Redigera </button>
                    
                </form>
            ))}

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
