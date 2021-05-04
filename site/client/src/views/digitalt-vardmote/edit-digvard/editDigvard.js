import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 


export const EditDigvard = (useParams) => {
    const {id} = useParams.match.params;
        
    return (<Fragment>
        <h1>Id: {id}</h1>

    </Fragment>);
}

export default EditDigvard;

 
