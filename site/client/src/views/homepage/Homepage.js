import React, { Fragment, useState, useEffect } from "react";
import Navigation from "../components/navigationButtons";
//import { createPopper } from '@popperjs/core';
import {Dropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';

const Homepage = () => {

    const [protokollnr, set_protokollnr] = useState("");
    const [navigate, set_navigate] = useState("registration");
    const [list, setList] = useState([]);
    
    const setNavigate = (useParams) => {
        set_navigate(useParams);
    }
    
    //lägg till: , { credentials: 'include'} i fetchen
    //Http get-request that fetches all protocolID:s and puts them in a list
    const getPro = async() => {
         try {
             const response =  await fetch(
             "http://localhost:5000/startsida");
             const jsonData =  await response.json()
             setList(jsonData);
             console.log(jsonData);
             console.log(list);
         } catch(err) {
             console.error(err);
         }
         
     }
   
    //Method checks that the input protocolID is in the database. If yes, it routes to the correct location
    //If no, a message is displayed that informs the user
    const validateProtocolID = () => {
        
        for(var i = 0; i < list.length; i++){
            if (list[i].protocolid != protokollnr){
                document.getElementById("pro").setCustomValidity("Patienten finns ej");
                console.log("hello");  
            }
            else {
                console.log("ja");  
                window.location="/"+ navigate + "/" + protokollnr  
            }
           
        }
    }
    
    useEffect(() => {getPro(); console.log(list); validateProtocolID();
    }, []);

    //the method adjust the choosen form and displays it so the user is well aware of their choice
    const title = () => {
        if (navigate == "registration"){
            return "In-/utskrivning"
        }
        else if (navigate == "hembesok"){
            return "Hembesök"
        }
        else if (navigate == "?"){
            return "Återläggning"
        }
        else if (navigate == "undersokning"){
            return "Undersökning"
        }
        else if (navigate == "digitalt-vardmote"){
            return "Digitalt vårdmöte"
        }
        else if (navigate == "mottagningsbesok"){
            return "Mottagningsbesök"
        }
    }

    //Displays the homepage of the application
    //The user can input a patient ID and select which type of form to go to
    //Or create a new patient ID
    return (
        <Fragment>
            
               
            <h1> Startsida </h1>
        
                
            <form onSubmit={validateProtocolID}>
                <div>    
                Protokollnummer: <input required type="text" id="pro" placeholder="Patient ID" value={protokollnr} onChange={(e) => {set_protokollnr(e.target.value)}}></input>
                
                <button onClick={() => 
                    {validateProtocolID()}}>SÖK</button>
                
                <button onClick={() => 
                    {window.location="/registration/"}}>Lägg till en ny patient</button>
                </div>
               <div>
                Du har valt:<DropdownButton id="dropdown-basic-button" title={title()}><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("registration")}>In-/utskrivning</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("hembesok")}>Hembesök</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("mottagningsbesok")}>Mottagningsbesök</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item id="ater" value={navigate}><button onClick={() => setNavigate("?")}>Återläggning</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("undersokning")}>Undersökning</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("digitalt-vardmote")}>Digitalt vårdmöte</button></Dropdown.Item>
                </DropdownButton>
                </div>

            </form>
            
            

        </Fragment>
    );
}

export default Homepage;


/* 
<label>Choose a car:</label>
<select >
                    <option onClick={() => setNavigate("registration")} >In-/utskrivning</option>
                    <option onClick={() => setNavigate("hembesok")}>Hembesök</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
/*
<DropdownButton id="dropdown-basic-button" title={title()}><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("registration")}>In-/utskrivning</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("hembesok")}>Hembesök</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("mottagningsbesok")}>Mottagningsbesök</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("?")}>Återläggning</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("undersokning")}>Undersökning</button></Dropdown.Item><br/><br/>
                    <Dropdown.Item value={navigate}><button onClick={() => setNavigate("digitalt-vardmote")}>Digitalt vårdmöte</button></Dropdown.Item>
                </DropdownButton>
                */