import React, { Fragment} from "react";

// Components
import ListPatients from "./components/ListPatients"

const Protocols = () => {
    return (
        <Fragment>
            <h1> All recorded patients </h1>
            <ListPatients/>
        </Fragment>
    );
}

export default Protocols;
