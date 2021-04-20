import React, { Fragment, useEffect, useState} from "react";
import {useParams} from "react-router-dom"; 

const EditRegistration = (useParams) => {

    const { id } = useParams.match.params;
    
    return(
        <Fragment>
            <form class="registration">
                <div className="header">
                Protokollnr: <input type="number"/><br />
                Inskrivningsdatum: <input type="date" /> <br />
                Anledning for inskrivning: <input type="text" />
                </div>
                <div className="bakgrundsdata">
                Barnets gestationsvecka: <input type="number" /> <br />
                Födelsevikt (gram): <input type="number" /><br />
                Födelselängd (cm): <input type="number" /> <br />
                Födelsehuvudomfång (cm): <input type="number" />
                </div>
                <div className="inskrivning">
                Vikt (gram): <input type="number" /> <br />
                Längd (cm): <input type="number" /> <br />
                Huvudomfång (cm): <input type="number" /> <br />
                Mamma vill amma: H<input type="checkbox" class="helt" /> 
                                D<input type="checkbox" class="delvis"/>
                                IA<input type="checkbox" class="inte"/> <br />
                Erhåller Bröstmjölk: H<input type="checkbox" class="helt" /> 
                                    D<input type="checkbox" class="delvis"/>
                                    IA<input type="checkbox" class="inte"/> <br />
                Barnet har v-sond: <input type="checkbox" class="nej" /> nej<input type="checkbox" class="ja"/><br />
                Infart: <input type="text" /><br />
                Andningsstöd: <input type="text" /> <br />
                Extra Syrgasbehov: ja<input type="checkbox" class="nej" /> nej<input type="checkbox" class="ja"/><br />
                </div>


            </form>

            <form class="discharge" action=""></form>
        </Fragment>

    );
}

export default EditRegistration;
