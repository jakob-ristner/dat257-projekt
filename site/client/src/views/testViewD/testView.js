import React, { Fragment } from "react";

const testView = () => {
    return (
        <Fragment>
            <div className="container">
                <h1> Neonatal Hemsjukvård </h1>
                <button onClick = {() =>{window.location = "/home"}}>
                </button>

                

            </div>
        </Fragment>
    );
}

export default testView;