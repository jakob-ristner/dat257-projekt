import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import layout from "../../cssModules/AddForm.module.css";

const AddEndAterlaggning = (useParams) => {

    const {protokollnr} = useParams.match.params;

    //date
    const [aterlaggning_startdate, set_aterlaggning_startdate] = useState("");
    const [orsak, set_orsak] = useState("");

    //end
    const [aterlaggning_enddate, set_aterlaggning_enddate] = useState("");
    const [utskrivning_hemmet, set_utskrivning_hemmet] = useState(false);



    //Displaying the hembesok form with textfields and checkboxes.
       //CLicking the "Spara"-button sends a POST-request to the database. 
       return(
        <Fragment>
        <h1>Lägg till hembesök för {protokollnr}</h1>  
        
       
     
    
            
    
            

        </Fragment>
    );
}

export default AddEndAterlaggning;