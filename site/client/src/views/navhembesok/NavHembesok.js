import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; import "./navHembesok.css"
import Navigation from "../components/navigationButtons";
import HomeButton from "../components/HomeButton";
//import EditHembesok from "../editHembesok/EditHembesok"; //Redigeringsknappen

const NavHembesok = (useParams) => {

    const [showListHembesok, showHembesok] = useState([]);
    const [totHembesok, setHembesok] = useState([]);
    const [hembIndex, setHembIndex] = useState(0);
    const { id } = useParams.match.params;
    //const [idnr, setIdnr] = useState([]);

    const getHembesok = async (index) => {
        try {
            const response = await fetch(
            "http://localhost:5000/hembesok/" + id);
            const jsonData = await response.json();
            setHembesok(jsonData.reverse());
            showHembesok(jsonData.slice(index, index + 3).reverse());
            console.log(jsonData);
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

    useEffect(() => { getHembesok(hembIndex);
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
    let value = false;
    
    /*
    const hemId = async () => {
        setIdnr(totHembesok.length - (index + hembIndex));
    }
    */
    return (
        <Fragment>
            <h1>Protokollnummer: {id} </h1>

            {getHeader()}

        

            {earlierButton()}
            <div class = "grid">


            
            <div class="list">
                
        
            {showListHembesok.reverse().map((form, index) => (
                <div class="hembesok">
                    <button class="edit" onClick={() => 
                    {window.location="/hembesok/edit/" + form.id}}> Redigera </button> <br/>
                    <div class="info">
                    Hembesöksnr: {totHembesok.length - (index + hembIndex)}<br/>
                    Datum utfört: {form.date} <br/>
                    Kl till familj: {form.at_family}<br/>
                    Kl från familj: {form.from_family}<br/>
                    Utförd av: {form.performed_by}<br/><br/>
                    </div>

                    <div class="atgard">
                    Amning/nutrition<input type="checkbox" checked={form.amning_nutrition}/>
                    Stödsamtal<input type="checkbox" checked={form.stodsamtal}/>
                    Viktkontroll<input type="checkbox" checked={form.viktkontroll}/> <br/>
                    Provtagning<input type="checkbox" checked={form.provtagning}/>
                        Läkemedel<input type="checkbox" checked={form.lakemedel}/><br/>
                    Annan Åtgärd<input value={form.annan_at}/><br/><br/>
                    </div>

                    <div class="resurs">
                    Läkare<input type="checkbox" checked={form.lakare}/>
                    Logoped<input type="checkbox" checked={form.logoped}/><br/>
                    Dietist<input type="checkbox" checked={form.dietist}/>
                    Kurator<input type="checkbox" checked={form.kurator}/>
                    Annan Resurs<input value={form.annan_resurs}/> <br/><br/>
                    </div>

                    <div class="avvikning">
                    Avvikning Logistik<input type="checkbox" checked={form.av_logistik}/>
                    Avvikning Barn/Familj<input type="checkbox" checked={form.av_barn_familj}/><br/>
                    Avvikning Personal<input type="checkbox" checked={form.av_personal}/><br/>
                    Beskrivning<input value={form.av_beskrivning}/><br/>
                    </div>


                </div>
            )).reverse()}    
            </div>
            <div class = "navigation"><Navigation id={id}/></div>
            <div id = "homeButton"><HomeButton/></div>
            </div>
            {laterButton()}


            <button onClick={() => 
            {window.location="/hembesok/add/" + id}}>Skapa nytt hembesök</button>
        </Fragment> 
    );
}

export default NavHembesok;
