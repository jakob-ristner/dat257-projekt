import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 
import Navigation from "../../components/navigationButtons";
import HomeButton from "../../components/HomeButton";
import layout from "../../cssModules/NavLayout.module.css";
import e from "cors";
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

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
            const show = jsonData[0];
            setHembesok(jsonData);
            showHembesok(jsonData.slice(index, index + 3));
            console.log(jsonData);
            console.log(show);
        } catch(err) {
            console.error(err);
        }
    }

    const incHembIndex = async () => {
        setHembIndex(Math.max(Math.min(hembIndex + 3, totHembesok.length - 3), 0));
        getHembesok(Math.max(Math.min(hembIndex + 3, totHembesok.length - 3), 0));
    }
    
    const decHembIndex = async () => {
        //setHembIndex(Math.max(hembIndex - 3, 0), getHembesok());
        setHembIndex(Math.max(hembIndex - 3, 0));
        getHembesok(Math.max(hembIndex - 3, 0));
    }

    const laterButton = () => {
        if (totHembesok.length === 0) {
            return;
        }
        if (hembIndex === 0) {
            return (<IconButton disabled="true"><ArrowDropUpIcon style={{fontSize:50}} onClick={() => decHembIndex()} /> </IconButton>);
        }
        return (<IconButton><ArrowDropUpIcon style={{fontSize:50}} onClick={() => decHembIndex()}/></IconButton>);
    }

    const earlierButton = () => {
        if (totHembesok.length === 0) {
            return;
        }
        if (hembIndex === totHembesok.length - 3) {
            return (<IconButton disabled="true"><ArrowDropDownIcon style={{fontSize:50}} onClick={() => incHembIndex()} /> </IconButton>);
        } 
        return (<IconButton><ArrowDropDownIcon style={{fontSize:50}} onClick={() => incHembIndex()}/></IconButton>);
    }

    useEffect(() => { getHembesok(hembIndex);
    }, []);

    const getHeader = () => {
        if (totHembesok.length > 0) {
            return (
                <h2>Visar hembesök {totHembesok.length - 
                    Math.min(totHembesok.length, hembIndex)}
                    - 
                    {totHembesok.length -
                Math.min(totHembesok.length, hembIndex + 2 )} utav 
                    totalt {totHembesok.length} st hembesök</h2>
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


    const getItemID = (index) => {
        switch (index) {
            case 0: 
                return layout.item0;
            case 1:
                return layout.item1;
            case 2: 
                return layout.item2;
        }
    }

    //var offset = showListHembesok.length - 1;
    return (
        <Fragment>

            <div className={layout.protID}>
                <h2>Protokollnummer: {id} </h2>
            </div>

            <h1>Hembesök</h1>
            {getHeader()}

        
            {laterButton()}
         
            <div class = {layout.grid}>


            
            <div class="list">
                
        
            {showListHembesok.map((form, index) => (
                <div class={layout.container} id={getItemID(index)}>
                    <button id={layout.edit} onClick={() => 
                    {window.location="/hembesok/edit/" + form.id}}> Redigera </button> <br/>
                    <div class={layout.info}>
                    Hembesöksnr: {totHembesok.length - (index + hembIndex)}<br/>
                    Datum utfört: {form.date} <br/>
                    Kl till familj: {form.at_family}<br/>
                    Kl från familj: {form.end_time}<br/>
                    Utförd av: {form.performed_by}<br/><br/>
                    </div>

                    <div class={layout.atgard}>
                    Amning/nutrition<input type="checkbox" checked={form.amning_nutrition}/>
                    Stödsamtal<input type="checkbox" checked={form.stodsamtal}/>
                    Viktkontroll<input type="checkbox" checked={form.viktkontroll}/> <br/>
                    Provtagning<input type="checkbox" checked={form.provtagning}/>
                    Läkemedel<input type="checkbox" checked={form.lakemedel}/><br/>
                    Annan Åtgärd:<input value={form.annan_at}/><br/><br/>
                    </div>

                    <div class={layout.resurs}>
                    Läkare<input type="checkbox" checked={form.lakare}/>
                    Logoped<input type="checkbox" checked={form.logoped}/><br/>
                    Dietist<input type="checkbox" checked={form.dietist}/>
                    Kurator<input type="checkbox" checked={form.kurator}/>
                    Annan resurs:<input value={form.annan_resurs}/> <br/><br/>
                    </div>

                    <div class={layout.avvikning}>
                    Avvikning Logistik<input type="checkbox" checked={form.av_logistik}/>
                    Avvikning Barn/Familj<input type="checkbox" checked={form.av_barn_familj}/><br/>
                    Avvikning Personal<input type="checkbox" checked={form.av_personal}/><br/>
                    Beskrivning:<input value={form.av_beskrivning}/><br/>
                    </div>


                </div>
            ))}    
            </div>
            <div class = "navigation"><Navigation id={id}/></div>
            <div id = "homeButton"><HomeButton/></div>
            </div>
          
            {earlierButton()}

            <button onClick={() => 
            {window.location="/hembesok/add/" + id}}>Skapa nytt hembesök</button>
        </Fragment> 
    );
}

export default NavHembesok;
