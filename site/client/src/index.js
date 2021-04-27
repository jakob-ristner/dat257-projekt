import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, useParams} from "react-router-dom";
import './index.css';

//views 
import Home from './views/home/Home.js';
import AddHembesok from "./views/addHembesok/AddHembesok";
import EditHembesok from "./views/editHembesok/EditHembesok";

import TestView from "./views/testView/TestView.js"
import Patients from "./views/patients/Patients.js"
import NavHembesok from "./views/navhembesok/NavHembesok.js"
import Registrations from "./views/registrations/registrations.js";
import Discharge from "./views/registrations/Discharge.js";
import EditRegistration from "./views/editRegistration/EditRegistration.js"
import AddDigitaltVard from "./views/digitalt-vardmote/AddDigitaltVard.js";

const rootElement = document.getElementById("root");
ReactDOM.render(
     <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Patients" component={Patients} />

            <Route exact path="/Hembesok/:id" component={NavHembesok} />

            <Route exact path ="/TestView" component ={TestView} />
            <Route exact path ="/registration/edit/:id" component ={EditRegistration} />

            <Route exact path="/digitalt-vardmote/add/:protocolID" component={AddDigitaltVard} />

            <Route exact path="/Hembesok/add/:protokollnr" component={AddHembesok} />
            <Route exact path="/Hembesok/edit/:hembesokid" component={EditHembesok} />
            <Route exact path="/Registration" component={Registrations} />
            <Route exact path="/Registration/:id" component={Discharge} />
        </Switch>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
