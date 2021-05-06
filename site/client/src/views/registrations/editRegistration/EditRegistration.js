import React, { Fragment, useEffect, useState} from "react";
import Navigation from "../../components/navigationButtons";
import Home from "../../components/HomeButton";
import {getTriple, getInput, getYesNo, threeCheck, validateMulti} from "../../../utils/inputs.js"
import layouts from "./registrations.module.css";



const EditRegistration = (useParams) => {

    const { id } = useParams.match.params;
    
    //Header
    const [regDate, setRegDate] = useState();
    const [reason, setReason] = useState(); 

    // Födelse
    const [veckor, setVeckor] = useState();
    const [dagar, setDagar] = useState();
    const [vikt_fodelse, setViktFodelse] = useState();
    const [langd_fodelse, setLangdFodelse] = useState();
    const [huvudomfang_fodelse, setHuvudomfangFodelse] = useState();
    
    // inskrivning
    const [vikt_in, set_vikt_in] = useState();
    const [langd_in, set_langd_in] = useState();
    const [huvud_in, set_huvud_in] = useState();
    const [vill_amma_in, set_vill_amma_in] = useState();
    const [amning_in, set_amning_in] = useState();
    const [bmjolk_in, set_bmjolk_in] = useState();
    const [vsond_in, set_vsond_in] = useState();
    const [infart_in, set_infart_in] = useState();
    const [andning_in, set_andning_in] = useState();
    const [syrgas_in, set_syrgas_in] = useState();

    const [bvc_rap, set_bvc_rap] = useState();
    const [bvc_text, set_bvc_text] = useState();
    const [riskpatient, set_risk] = useState();
    //Utskrivning
    const [date_ut, set_date_ut] = useState();
    const [vikt_ut, set_vikt_ut] = useState();
    const [langd_ut, set_langd_ut] = useState();
    const [huvud_ut, set_huvud_ut] = useState();
    const [vill_amma_ut, set_vill_amma_ut] = useState();
    const [amning_ut, set_amning_ut] = useState();
    const [bmjolk_ut, set_bmjolk_ut] = useState();
    const [vsond_ut, set_vsond_ut] = useState();
    const [infart_ut, set_infart_ut] = useState();
    const [andning_ut, set_andning_ut] = useState();
    const [syrgas_ut, set_syrgas_ut] = useState();

    const [regExists, setReg] = useState();
    const [disExists, setDis] = useState();

   

    const checkNull = (obj) => { // Checks for a null value in a json object
        for (var key in obj) {
            if (obj[key] == null)
                return true;
        }
        return false;
    }



    const validateBvc = (checked) => {
        console.log(checked);
        if (checked && document.getElementById("orsak").value == "") {
            document.getElementById("orsak").setCustomValidity("Fyll i detta fält");
        } else {
            document.getElementById("orsak").setCustomValidity("");
        }
    }

    const submit = async (e) => {
        e.preventDefault();
      
        var regnull = false;
        var disnull = false;

        var bodyReg = {};
        var bodyDis = {};
        if (disExists) {
            bodyDis = { date_ut, vikt_ut, langd_ut, huvud_ut,
                vill_amma_ut, amning_ut, bmjolk_ut, vsond_ut, infart_ut, 
                andning_ut, syrgas_ut};
        }

        if (regExists) {
            bodyReg = {regDate, reason, veckor, dagar,
                vikt_fodelse, langd_fodelse, huvudomfang_fodelse,
                vikt_in, vsond_in, langd_in, huvud_in, vill_amma_in,
                amning_in, bmjolk_in, andning_in, syrgas_in, riskpatient,
                bvc_rap, bvc_text
            };
           
        } 

            try {
                if (disExists) {
                    const response = await fetch("http://localhost:5000/discharge/" + id, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(bodyDis)
                    }) 
                } 


                if (regExists) {
                    const response = await fetch("http://localhost:5000/registration/" + id, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(bodyReg)
                    })
                }
                
            } catch (err) {
                console.error(err.message);
            }
            window.location = "/registration/" + id;
        }
    



    const getReg = async () => {

        const response = await fetch("http://localhost:5000/registration/" + id);
        const jsonData = await response.json();
        const reg = jsonData[0];



        if (reg != undefined) {
            setReg(true);

            setRegDate(reg.regdate);
            setReason(reg.reason);
            setVeckor(reg.veckor);
            setDagar(reg.dagar);
            setViktFodelse(reg.vikt_fodelse);
            setLangdFodelse(reg.langd_fodelse);
            setHuvudomfangFodelse(reg.huvudomfang_fodelse);
    
            set_vikt_in(reg.vikt_inskrivning);
            set_langd_in(reg.langd_inskrivning);
            set_huvud_in(reg.huvudomfang_in);
            set_vill_amma_in(reg.mamma_vill_amma);
            set_amning_in(reg.amning_inskrivning);
            set_bmjolk_in(reg.erhaller_bmjolk_in);
            set_vsond_in(reg.v_sond_in);
            set_infart_in(reg.infart_in);
            set_andning_in(reg.andningsstod_in);
            set_syrgas_in(reg.extragas_in);

            set_risk(reg.riskpatient);
            set_bvc_rap(reg.bvcrapportering);
            set_bvc_text(reg.bvctext);
        } else {
            setReg(false);

        }

    } 

    const getDis = async () => {
        
        const response = await fetch("http://localhost:5000/discharge/" + id);
        const jsonData = await response.json();
        const dis = jsonData[0];


        if (dis != undefined) {
            setDis(true);
            set_date_ut(dis.outdate);
            set_vikt_ut(dis.vikt_utskrivning);
            set_langd_ut(dis.vikt_utskrivning);
            set_huvud_ut(dis.huvudomfang_ut);
            set_vill_amma_ut(dis.mamma_vill_amma_ut);
            set_amning_ut(dis.amning_utskrivning);
            set_bmjolk_ut(dis.erhaller_bmjolk_ut);
            set_vsond_ut(dis.v_sond_ut);
            set_infart_ut(dis.infart_ut)
            set_andning_ut(dis.andningsstod_ut);
            set_syrgas_ut(dis.extragas_ut);
        } else {
            setDis(false);
        }

    }

    useEffect(() => {
        getReg();
        getDis();
    }, [])

    const getDischarge = () => {
        if (!regExists) {
            return
        }
        if (!disExists) {
            return <h1>Detta protokollnr har inte skrivits ut</h1>
        }
        
        return (
        <Fragment>
            <h3>Vid utskrivning</h3>
            {getInput("Utskrivningsdatum", "date", true, date_ut, set_date_ut)}
            {getInput("Vikt (gram)", "number", true, vikt_ut, set_vikt_ut)}
            {getInput("Längd (cm)", "number", true, langd_ut, set_langd_ut)}
            {getInput("Huvudomfång", "number", true, huvud_ut, set_huvud_ut)}
            {getYesNo("Mamma avser att amma", vill_amma_ut, set_vill_amma_ut)}
            {getTriple("Amning", amning_ut, set_vill_amma_ut)}
            {getTriple("Erhåller bröstmjölk", bmjolk_ut, set_bmjolk_ut)}
            {getYesNo("Barnet har ventrikelsond", vsond_ut, set_vsond_ut)}
            {getInput("Infart", "text", false, infart_ut, set_infart_ut)}
            {getInput("Andningsstöd", "text", false, andning_ut, set_andning_ut)}
            {getYesNo("Extra syrgasbehov", syrgas_ut, set_syrgas_ut)}
        </Fragment>
        );
    }


    const getRegistration = () => {
        
        if (!regExists) {
            return <h1>Detta protokollnr existerar ej</h1>
        }
        return ( <Fragment>
             <div class = "navigation"><Navigation id={id}/></div>
             <div id = "homeButton"><Home/></div>
            <h1>Redigera Protokoll: {id}</h1>
            <div class={layouts.form}>
            <div class={layouts.protokollID} id={layouts.protokollID}>
            <h1>Protokoll ID</h1>
            Protokollnr: <input value={id} type="number"/><br/>
            {getInput("InskrivningsDatum", "date", true, regDate, setRegDate)}
            {getInput("Anledning för inskrivning", "text", true, reason, setReason)}
            </div>

            <div class={layouts.bakgrundsdata} id={layouts.bakgrundsdata}>
            <h3>Vid Födelse:</h3>
            {getInput("Barnets gestationsvecka", "number", true, veckor, setVeckor, 21, 42)}
            {getInput("dagar", "number", true, dagar, setDagar)} <br/>
            {getInput("Födelsevikt (gram)", "number", true, vikt_fodelse, setViktFodelse)}
            {getInput("Födelselängd (cm)", "number", true, langd_fodelse, setLangdFodelse)}
            {getInput("Födelsehuvudomfång", "number", true, huvudomfang_fodelse, setHuvudomfangFodelse)}
            </div>

            <div class={layouts.inskrivning}  id={layouts.inskrivning}>
            <h3>Vid inskrivning:</h3>
            {getInput("Vikt (gram)" , "number", true, vikt_in, set_vikt_in)}
            {getInput("Huvudomfång (cm)" , "number", true, huvud_in, set_huvud_in)}
            {getYesNo("Mamma avser att amma", vill_amma_in, set_vill_amma_in)}
            {getTriple("Erhåller bröstmjölk", bmjolk_in, set_bmjolk_in)}
            {getTriple("Amning", amning_in, set_amning_in)} 
            {getYesNo("Barnet har ventrikelsond", vsond_in, set_vsond_in)}
            {getInput("Infart", "text", false, infart_in, set_infart_in)}
            {getInput("Andningsstöd", "text", false, andning_in, set_andning_in)}
            {getYesNo("Extra syrgasnehov", syrgas_in, set_syrgas_in)}
            </div>

            <br/>
            <div class={layouts.bottom} id={layouts.bottom}>
            {getYesNo("Riskpatient", riskpatient, set_risk)}
                <div className="multi">
                Överraportering till bvc:
                    ja <input type="checkbox"  class="ja" checked={bvc_rap == true}
                        onChange={(e) => {
                            threeCheck(bvc_rap, set_bvc_rap, true)
                            if (e.target.checked == true) {
                                validateBvc(false);
                                set_bvc_text("");
                            } else {
                                validateBvc(false);
                                set_bvc_text(null);
                            }
                        }} /> 
                    nej <input id="bvcnej" type="checkbox"  class="nej" checked={bvc_rap == false}
                        onChange={(e) => {
                            threeCheck(bvc_rap, set_bvc_rap, false)
                            if (e.target.checked == false) {
                                validateBvc(false);
                                set_bvc_text("");
                            } else {
                                validateBvc(true);
                                set_bvc_text(null);
                            }
                        }} />
                </div>
               

                Om nej ange orsak: <input id="orsak" type="text" value={bvc_text} onChange={(e) => {
                    if (bvc_rap == false) {
                        validateBvc(true); // kinda ugly dont care bye bye
                        set_bvc_text(e.target.value)
                    } else {
                        validateBvc(false);
                    }

                }}/>
                </div>
                </div>
            </Fragment>
            
        );
    }
    return(
        <Fragment>
            <div className="container">
            <form onSubmit={submit}>
                {getRegistration()}
                {getDischarge()}
                <button type="submit" class={layouts.button1} onCick={validateMulti}> Spara </button>
                <button id="cancel" class={layouts.button1} onClick={() => {window.location = "/registration/" + id }}>Avbryt</button> <br/>
            </form>
            </div>
        </Fragment>

    );
}

export default EditRegistration;
