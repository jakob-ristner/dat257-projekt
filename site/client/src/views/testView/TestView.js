import React, { Fragment } from "react";
import Navigation from "../components/navigationButtons"

const testView = () => {
    return (
        <Fragment>
            <div className="container">
                <Navigation id={"111"}/>
                <h1> Neonatal Hemsjukvård </h1>
            </div>
        </Fragment>
    );
}

export default testView;