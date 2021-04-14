import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; import "./navHembesok.css"
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
            setHembesok(jsonData.reverse());
            showHembesok(jsonData.slice(index, index + 3).reverse());
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
        if (totHembesok.length === 0) {
            return;
        }
        if (hembIndex === 0) {
            return (<button onClick={() => decHembIndex()} disabled="true">Senare hembesök </button>);
        }
        return (<button onClick={() => decHembIndex()}>Senare hembesök </button>);
    }

    const earlierButton = () => {
        if (totHembesok.length === 0) {
            return;
        }
        if (hembIndex === totHembesok.length - 3) {
            return (<button onClick={() => incHembIndex()} disabled="true"> Tidigare hembesök </button>);
        } 
        return (<button onClick={() => incHembIndex()}> Tidigare hembesök </button>);
    }

    useEffect(() => {
        getHembesok(hembIndex);
    }, []);

    const getHeader = () => {
        if (totHembesok.length > 0) {
            return (
                <h2>Visar hembesök {totHembesok.length -
                    Math.min(totHembesok.length, hembIndex + 2 )}
                    - 
                    {totHembesok.length - 
                    Math.min(totHembesok.length, hembIndex)} ut 
                    av totalt {totHembesok.length} st hembesök</h2>
            );
        }
        return (
            <h2>Det finns ej några hembesök för detta protokollnr</h2> 
        );
    }

    return (
        <Fragment>
            <h1>protokollnr: {id} </h1>

            {getHeader()}

            {earlierButton()}

            {showListHembesok.reverse().map((form, index) => (
                <div class="hembesok">
                    Hembesöknr: {totHembesok.length - (index + hembIndex)}<br/>
                    Datum utfört: {form.date} <br/>
                    Kl till familj: {form.at_family}<br/>
                    Kl från familj: {form.from_family}<br/>
                    Performed by: {form.performed_by}<br/>
                </div>
            )).reverse()}    
            {laterButton()}
        </Fragment>
    );
}

export default NavHembesok;
