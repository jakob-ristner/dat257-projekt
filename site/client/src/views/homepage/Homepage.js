import React, { Fragment, useState, useEffect } from "react";
import Navigation from "../components/navigationButtons";
//import { createPopper } from '@popperjs/core';
import {Dropdown} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import { useAlert } from 'react-alert';
import axios from 'axios';

const Homepage = () => {

    const [protokollnr, set_protokollnr] = useState("");
    const [navigate, set_navigate] = useState("");
    const [list, setList] = useState([]);

    //const alert = useAlert();

    const setNavigate = (useParams) => {
        set_navigate(useParams);
    }

    const getPro = async() => {
       // axios.get("http://localhost:5000/startsida")
       // .then(result=>{setList(result.data)});
        
         
        //e.preventDefault();
         try {
             const response =  await fetch(
             "http://localhost:5000/startsida");
             const jsonData =  await response.json()
             /*
             .then(response => response.json())
             .then(console.log("Fetched resource"))
             .then(data => this.setState({ data }));
             */
             //const list = jsonData[0];
             setList(jsonData);
             console.log(jsonData);
             console.log(list);
         } catch(err) {
            // console.log(list);
             console.error(err);
         }
         
     }
     /*
     useEffect(() => {getPro(); console.log(list)
     }, []);
 
     */
 
     useEffect(() => {getPro(); console.log(list);
     }, []);

    const validattt = () => {
        var pro = document.getElementsByClassName("pro").item(0);
        var input = pro.getElementsByTagName("input");
        var valid = false;
        
        for(var i = 0; i < list.length; i++){
            if (list[i].protocolid != protokollnr || navigate == ""){
                console.log(list[i].protocolid);
                //input.setCustomValidity("Används ej");
                //pro.getElementsByTagName("input").setCustomValidity("Används ej");
                console.log("nej");
               // alert.show("NEJ");
            }
            else {
                //input.item(0).setCustomValidity("");
                console.log("ja");  
                window.location="/"+ navigate + "/" + protokollnr  
                valid = true;
            }
            console.log(valid);
        }
    }

    const validateProtocolID = () => {
        //var pro = document.getElementsByClassName("pro");
        //console.log(navigate);
        if (protokollnr !== ""){
            window.location="/"+ navigate + "/" + protokollnr
        }
        if (protokollnr == ""  || navigate == "") {
            window.location="/"; 
        }
    }

    return (
        <Fragment>
            
                <div className="container">
                    <Navigation id={111}/>
                    <h1> Startsida </h1>
                </div>
                
                <div className="pro">    
                Protokollnummer: <input required type="text" placeholder="Patient ID" value={protokollnr} onChange={(e) => {set_protokollnr(e.target.value)}}></input>
                
                <button onClick={() => 
                    {validattt()}}>SÖK</button>
                
                <button onClick={() => 
                    {window.location="/registration/"}}>Lägg till en ny patient</button>
                </div>
            <DropdownButton id="dropdown-basic-button" title="Välj">
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("registration")}>In-/utskrivning</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("hembesok")}>Hembesök</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("mottagningsbesok")}>Mottagningsbesök</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("?")}>Återläggning</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("undersokning")}>Undersökning</button></Dropdown.Item><br/>
                <Dropdown.Item value={navigate}><button onClick={() => setNavigate("digitalt-vardmote")}>Digitalt vårdmöte</button></Dropdown.Item>
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