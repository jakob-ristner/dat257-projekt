import React, { Fragment, useEffect, useState} from "react";

const Registration = () => {
    const [protocolIDinput, setProtocolID] = useState(0);
    const [regDate, setRegDate] = useState("");
    const [reason, setReason] = useState("");
    

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