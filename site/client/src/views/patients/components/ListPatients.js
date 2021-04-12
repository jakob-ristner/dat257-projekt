import React, {Fragment, useEffect, useState} from "react";
import "../patients.css"


const ListPatients = () => {

    const [patients, setPatients] = useState([]);

    const getPatients = async () => {   
        try {
            const response = await fetch("http://localhost:5000/patients")
            const jsonData = await response.json();
            setPatients(jsonData);

        } catch(e) {
            console.error(e);
        }
        
    }

    useEffect(() => {
        getPatients();
    }, []);

    return (
        <Fragment>
            {patients.map(patient => (
                <div class="patient">
                    Birthday: {patient.dateofbirth}<br/>
                    Id: {patient.id}
                </div>
            ))}
        </Fragment>
    );
}


export default ListPatients;

