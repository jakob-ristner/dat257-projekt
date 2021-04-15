import React, { Fragment, useEffect, useState} from "react";

const EditRegistration = (useParams) => {
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

return (
    <Fragment>
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


export default EditRegistration;