import React, { Fragment, useEffect, useState} from "react";

const EditRegistration = (useParams) => {

    const { id } = useParams.match.params;

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