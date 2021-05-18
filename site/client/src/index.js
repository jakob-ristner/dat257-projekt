import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, useParams} from "react-router-dom";
import './index.css';

//views 
import AddHembesok from "./views/hembesok/addHembesok/AddHembesok";
import EditHembesok from "./views/hembesok/editHembesok/EditHembesok";
import AddMottagningsbesok from "./views/mottagningsbesok/addMottagningsbesok/AddMottagningsbesok";
import TestView from "./views/testView/TestView.js"
import NavHembesok from "./views/hembesok/navhembesok/NavHembesok.js"
import Registrations from "./views/registrations/registrations.js";
import Discharge from "./views/registrations/Discharge.js";
import EditRegistration from "./views/registrations/editRegistration/EditRegistration.js"
import AddDigitaltVard from "./views/digitalt-vardmote/add-dig-vard/AddDigitaltVard.js";
import NavDigVard from "./views/digitalt-vardmote/navDigvard/navDigvard.js"
import EditDigvard from "./views/digitalt-vardmote/edit-digvard/editDigvard.js"
import EditMott from "./views/mottagningsbesok/EditMott.js";
import NavMott from "./views/mottagningsbesok/NavMott.js"
import NavAterlaggning from "./views/aterlaggning/navAterlaggning/NavAterlaggning.js";
import AddAterlaggnig from "./views/aterlaggning/addAterlaggning/AddAterlaggning.js";
import AddEndAterlaggnig from "./views/aterlaggning/addAterlaggning/AddEndAterlaggning.js";


const rootElement = document.getElementById("root");
ReactDOM.render(
     <BrowserRouter>
        <Switch>
            <Route exact path="/Hembesok/:id" component={NavHembesok} />

            <Route exact path ="/" component ={TestView} />
            <Route exact path ="/registration/edit/:id" component ={EditRegistration} />

            <Route exact path="/digitalt-vardmote/add/:protocolID" component={AddDigitaltVard} />
            <Route exact path="/mottagningsbesok/add/:protocolID" component={AddMottagningsbesok} />
            <Route exact path="/Hembesok/add/:protokollnr" component={AddHembesok} />
            <Route exact path="/Hembesok/edit/:hembesokid" component={EditHembesok} />
            <Route exact path="/Registration" component={Registrations} />
            <Route exact path="/Registration/:id" component={Discharge} />

            <Route exact path="/digitalt-vardmote/:protocolID" component={NavDigVard} />
            <Route exact path="/mottagningsbesok/edit/:id" component={EditMott}/>
            <Route exact path="/digitalt-vardmote/edit/:id" component={EditDigvard} />
            <Route exact path="/mottagningsbesok/:protocolID" component={NavMott} />

            <Route exact path="/aterlaggning/:protocolID" component={NavAterlaggning} />
            <Route exact path="/aterlaggning/add/:protocolID" component={AddAterlaggnig} />
            <Route exact path="/aterlaggning/end/:protocolID" component={AddEndAterlaggnig} />


        </Switch>
    </BrowserRouter>,
    rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
