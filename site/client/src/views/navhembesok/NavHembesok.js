import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import "./navHembesok.css"
const NavHembesok = (useParams) => {

    const [showListHembesok, showHembesok] = useState([]);
    const [totHembesok, setHembesok] = useState([]);
    const [hembIndex, setHembIndex] = useState(0);
    const { id } = useParams.match.params;

    const getHembesok = async (index) => {
        try {
            const response = await fetch(
            "http://localhost:5000/hembesok/" + id);
            const jsonData = await response.json();
            setHembesok(jsonData);
            showHembesok(jsonData.slice(index, index + 3));
        } catch(err) {
            console.error(err);
        }
    }

    const incHembIndex = async () => {
        setHembIndex(Math.max(Math.min(hembIndex + 3, totHembesok.length - 3), 0));
        getHembesok(Math.max(Math.min(hembIndex + 3, totHembesok.length - 3), 0));
    }
    
    const decHembIndex = async () => {
        setHembIndex(Math.max(hembIndex - 3, 0), getHembesok());
        getHembesok(Math.max(hembIndex - 3, 0));
    }

    const laterButton = () => {
        if (hembIndex === 0) {
            return (<button onClick={() => decHembIndex()} disabled="true">Senare hembesök </button>);
        }
        return (<button onClick={() => decHembIndex()}>Senare hembesök </button>);
    }

    const earlierButton = () => {
        if (hembIndex === totHembesok.length - 3) {
            return (<button onClick={() => incHembIndex()} disabled="true"> Tidigare hembesök </button>);
        }
        return (<button onClick={() => incHembIndex()}> Tidigare hembesök </button>);
    }

    useEffect(() => {
        getHembesok(hembIndex);
    }, []);

    return (
        <Fragment>
            <h1>protokollnr: {id} </h1>
            <h2> Your hembesök: </h2>

            {laterButton()}

            {showListHembesok.map(form => (
                <div class="hembesok">
                    Kl till familj: {form.at_family}<br/>
                    Kl från familj: {form.from_family}<br/>
                    Performed by: {form.performed_by}<br/>
                </div>
            ))}    
            {earlierButton()}
        </Fragment>
    );
}

export default NavHembesok;
