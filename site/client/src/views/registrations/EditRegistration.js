import React, { Fragment, useEffect, useState} from "react";

const EditRegistration = (useParams) => {

    const [fullRegistration, setRegistration] = useState([]);
    const { id } = useParams.match.params;

    const getRegistration = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/registration/" + id);
            const jsonData = await response.json();
            setRegistration(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRegistration();
    }, []);


    //return(<h1>Inskrivning </h1>);
    /* <form >
             <label for="fname">ProtkollID:</label>
             <input type="number" 
                 value={form.protocolID} 
                 id="protokollID" 
                 name="fname"
            >
                 </input>
     
             <label for="lname">Registreringsdatum:</label>
              <input 
                 type="date" 
                 value={form.regDate} 
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
     
              <input type="submit" value="Submit">
                   </input>
               </form>
               */

return (
    <Fragment>
        <h1>Inskrivning </h1>

        {fullRegistration.map(form => (
            <div class="fullRegistration">
                protocolID: {form.protocolid}<br/>
                regDate: {form.regdate}<br/>
                reason: {form.reason}
            </div>
        ))}
       

    </Fragment>
);

}


export default EditRegistration;