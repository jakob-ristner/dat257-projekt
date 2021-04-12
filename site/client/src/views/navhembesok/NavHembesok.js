import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "./navHembesok.css"
const NavHembesok = (useParams) => {

    const [hembesok, setHembesok] = useState([]);
    const { id } = useParams.match.params;

    const getHembesok = async () => {
        try {
            const response = await fetch(
            "http://localhost:5000/hembesok/" + id);
            const jsonData = await response.json();
            setHembesok(jsonData);

        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getHembesok();
    }, []);

    return (
        <Fragment>
            <h1>protokollnr: {id} </h1>
            <h2> Your hembesök: </h2>
            
            {hembesok.map(form => (
                <div class="hembesok">
                    Kl till familj: {form.at_family}<br/>
                    Kl från familj: {form.from_family}<br/>
                    Performed by: {form.performed_by}<br/>
                </div>
            ))}    
        </Fragment>
    );
}

export default NavHembesok;
