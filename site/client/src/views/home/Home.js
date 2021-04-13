import React, { Fragment } from "react";

const Home = () => {
    return (
        <Fragment>
            <div className="container">
                <h1> Neonatal Hemsjukvård </h1>
                <a href="/patients"> Protokoll </a>
                <a href="/testViewD"> testView </a>

            </div>
        </Fragment>
    );
}

export default Home;