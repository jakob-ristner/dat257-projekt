import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 

const EditRegistration = (useParams) => {

    const { id } = useParams.match.params;
    
    return(
        <Fragment>
            <div>
                <h1>Redigera för {id}</h1>             
            </div>
        </Fragment>

    );
}

export default EditRegistration;