import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, useParams} from "react-router-dom";
import './index.css';

//views 
import Home from './views/home/Home.js';
import Patients from "./views/patients/Patients.js"

import NavHembesok from "./views/navhembesok/NavHembesok.js"

import TestView from "./views/testView/TestView.js"


const rootElement = document.getElementById("root");
ReactDOM.render(
     <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Patients" component={Patients} />

            <Route exact path="/Hembesok/:id" component={NavHembesok} />

            <Route exact path ="/TestView" component ={TestView} />



        </Switch>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
