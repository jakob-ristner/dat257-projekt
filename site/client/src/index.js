import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';

//views 
import Home from './views/home/Home.js';
import Patients from "./views/patients/Patients.js"

const rootElement = document.getElementById("root");
ReactDOM.render(
     <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Patients" component={Patients} />
        </Switch>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
