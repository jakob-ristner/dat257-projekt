import React, { Fragment, useEffect, useState} from "react";

const Registration = () => {
    return (
        <Fragment>
            <h1>Inskrivning </h1>

            <form action="/action_page.php">
            <label for="fname">ProtkollID:</label>
            <input type="number" id="fname" name="fname">
                </input>
    
            <label for="lname">Registreringsdatum:</label>
             <input type="date" id="lname" name="lname">
                 </input>

            <label for="lname">Anledning för inskrivning:</label>
             <input type="text" id="lname" name="lname">
                 </input>
    
             <input type="submit" value="Submit">
                  </input>
              </form>

        </Fragment>
    );
}


export default Registration;