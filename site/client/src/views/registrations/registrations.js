import React, { Fragment, useEffect, useState} from "react";

const Registration = () => {
    const [protokollIDinput, setProtokollID] = useState(0);
    const [regDate, setRegDate] = useState("");
    const [reason, setReason] = useState("");
    

    const submitRegistation = async() => {
        const submitForm = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                protocolID: protokollIDinput,
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

    return (
        <Fragment>
            <h1>Inskrivning </h1>

            <form onSubmit={submitRegistation}>
            <label for="fname">ProtkollID:</label>
            <input type="number" 
                value={protokollIDinput} 
                id="protokollID" 
                name="fname"
                onChange={(e) => {
                    setProtokollID(e.target.value)} }>
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