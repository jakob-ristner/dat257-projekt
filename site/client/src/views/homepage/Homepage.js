import React, { Fragment, useState } from "react";
import Navigation from "../components/navigationButtons";
//import { createPopper } from '@popperjs/core';
import {Dropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';

const Homepage = () => {

    const [protokollnr, set_protokollnr] = useState("");
    const [navigate, set_navigate] = useState("");

    const setNavigate = (useParams) => {
        set_navigate(useParams);
    }

    const validateProtocolID = () => {
        var pro = document.getElementsByClassName("pro");
        console.log(navigate);
        if (protokollnr !== ""){
            window.location="/"+ navigate + "/" + protokollnr
        }
        if (protokollnr == ""  || navigate == "") {
            window.location="/"; 
        }
    }

    return (
        <Fragment>
            <div className="pro">
                <div className="container">
                    <Navigation id={navigate}/>
                    <h1> Startsida </h1>
              </div>
            
                Protokollnummer: <input required type="text" value={protokollnr} onChange={(e) => {set_protokollnr(e.target.value)}}></input>
            
                <button onClick={() => 
                    {validateProtocolID()}}>SÖK</button>
                <button onClick={() => 
                    {window.location="/registration/"}}>Lägg till en ny patient</button>
            </div>
            <DropdownButton id="dropdown-basic-button" title="Välj">
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("registration")}>In-/utskrivning</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("hembesok")}>Hembesök</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("mottagningsbesok")}>Mottagningsbesök</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("?")}>Återläggning</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("undersokning")}>Undersökning</button></Dropdown.Item>
            </DropdownButton>

            


        </Fragment>
    );
}

export default Homepage;


/*<Dropdown>
                <Dropdown.Toggle style="width: 120px" variant="success" id="dropdown-basic">
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>*/ 