import React, { Fragment, useEffect, useState} from "react";

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


    const threeCheck = (state, setState, value) => {
        if (state == value) {
            setState(null);
        } else {
            setState(value);
        }
    }

    const submit = async () => {
        if (disExists) {
            try {
                const body = {
                    date_ut,
                    vikt_ut,
                    langd_ut,
                    huvud_ut,
                    vill_amma_ut,
                    amning_ut,
                    bmjolk_ut,
                    vsond_ut,
                    infart_ut,
                    andning_ut,
                    syrgas_ut

                }
                
                const response = await fetch("http://localhost:5000/discharge/" + id, 
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
                
            } catch(err) {
                console.error(err.message);
            }
        }

        if (regExists) {
            try {
                const body = {
                    regDate,
                    reason,
                    veckor,
                    dagar,
                    vikt_fodelse,
                    langd_fodelse,
                    huvudomfang_fodelse,
                    vikt_in,
                    vsond_in,
                    langd_in,
                    huvud_in,
                    vill_amma_in,
                    amning_in,
                    bmjolk_in,
                    andning_in,
                    syrgas_in,
                    riskpatient,
                    bvc_rap,
                    bvc_text
                } 

                const response = await fetch("http://localhost:5000/registration/" + id, 
                {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })


                    /*
            const {regDate, reason, veckor,dagar,vikt_fodelse
            ,langd_fodelse,huvudomfang_fodelse,vikt_in,langd_in,huvud_in, vill_amma_in
            ,amning_in, bmjolk_in, vsond_in, andning_in, syrgas_in
            ,riskpatient,bvc_rap,bvcText } = req.body;
            */


            } catch(err) {
                console.error(err.message);
            }
        }

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
            set_bvc_rap(reg.bvc_rap);
            set_bvc_text(reg.bvc_text);
        } else {
            setReg(false);

        }

    } 

    const getDis = async () => {
        
        const response = await fetch("http://localhost:5000/discharge/" + id);
        const jsonData = await response.json();
        const dis = jsonData[0];

        console.log(dis);

        if (dis != undefined) {
            setDis(true);
            set_date_ut(dis.outdate);
            set_vikt_ut(dis.vikt_utskrivning);
            set_langd_ut(dis.vikt_utskrivning);
            set_huvud_ut(dis.huvudomfang_ut);
            set_vill_amma_ut(dis.mamma_vill_amma_ut);
            set_amning_ut(dis.amning_utskrivning);
            set_bmjolk_ut(dis.erhaller_bmjolk_ut);
            set_vsond_ut(dis.vsond_ut);
            set_infart_ut(dis.infart_ut)
            set_andning_ut(dis.andningsstod_ut);
            set_syrgas_ut(dis.extragas_ut);
            
            /*
                "protocolid": 111,
                    "vikt_utskrivning": 1200,
                    "langd_utskrivning": 120,
                    "huvudomfang_ut": 120,
                    "mamma_vill_amma_ut": true,
                    "amning_utskrivning": "H ",
                    "erhaller_bmjolk_ut": "H ",
                    "v_sond_ut": true,
                    "infart_ut": "yy",
                    "andningsstod_ut": "yy",
                    "extragas_ut": true
                    */

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
            <form class="discharge">
            <h3>Vid utskrivning</h3>
            <div className="header">
                Utskrivningsdatum: <input type="date" value={date_ut} onChange={(e) => set_date_ut(e.target.value)} />  
            </div>
            </form>
            <div className="utskrivning">
                Vikt (gram): <input value={vikt_ut} onChange={(e) => set_vikt_ut(e.target.value)} type="number" /> <br />
                Längd (cm): <input type="number" value={langd_ut} onChange={(e) => set_langd_ut(e.target.value)}/> <br />
                Huvudomfång (cm): <input type="number" value={huvud_ut} onChange={(e) => set_huvud_ut(e.target.value)}/> <br />
                Mamma vill amma: 
                    ja <input type="checkbox" class="ja" checked={vill_amma_ut == true} 
                        onChange={() => threeCheck(vill_amma_ut, set_vill_amma_ut, true)} /> 
                    nej <input type="checkbox" class="nej" checked={vill_amma_ut == false}
                        onChange={() => threeCheck(vill_amma_ut, set_vill_amma_ut, false)} /> <br />

                Amning: 
                    H<input checked={amning_ut == "H"}  
                        type="checkbox" class="helt" onChange={() => {threeCheck(amning_ut, set_amning_ut, "H")}}/> 

                    D<input checked={amning_ut == "D"}  
                        type="checkbox" class="delvis" onChange={() => {threeCheck(amning_ut, set_amning_ut, "D")}}/>

                    IA<input checked={amning_ut == "IA"}
                        type="checkbox" class="inte" onChange={() => {threeCheck(amning_ut, set_amning_ut, "IA")}}/> <br />

                Erhåller Bröstmjölk: 
                    H<input checked={bmjolk_ut == "H"}  
                        type="checkbox" class="helt" onChange={() => {threeCheck(bmjolk_ut, set_bmjolk_ut, "H")}}/> 

                    D<input checked={bmjolk_ut == "D"}  
                        type="checkbox" class="delvis" onChange={() => {threeCheck(bmjolk_ut, set_bmjolk_ut, "D")}}/>

                    IA<input checked={bmjolk_ut == "IA"}
                        type="checkbox" class="inte" onChange={() => {threeCheck(bmjolk_ut, set_bmjolk_ut, "IA")}}/> <br />

                Barnet har v-sond: 
                    ja <input type="checkbox" class="ja" checked={vsond_ut == true} 
                        onChange={() => threeCheck(vsond_ut, set_vsond_ut, true)} /> 
                    nej <input type="checkbox" class="nej" checked={vsond_ut == false}
                        onChange={() => threeCheck(vsond_ut, set_vsond_ut, false)} /> <br />

                Infart: <input type="text" value={infart_ut} onChange={(e) => set_infart_ut(e.target.value)}/><br />
                Andningsstöd: <input type="text" value={andning_ut} onChange={(e) => set_andning_ut(e.target.value)}/> <br />
                Extra syrgasbehov: 
                    ja <input type="checkbox" class="ja" checked={syrgas_ut == true} 
                        onChange={() => threeCheck(syrgas_ut, set_syrgas_ut, true)} /> 
                    nej <input type="checkbox" class="nej" checked={syrgas_ut == false}
                        onChange={() => threeCheck(syrgas_ut, set_syrgas_ut, false)} /> <br />
            </div>
            <br />
            
        </Fragment>
        );
    }

    const getRegistration = () => {
        if (!regExists) {
            return <h1>Detta protokollnr existerar ej</h1>
        }
        return (
            <Fragment>
                <button id="cancel" onClick={() => {window.location = "/registration/" + id }}>Avbryt</button>
            <form class="registration">
                <div className="header">
                Protokollnr: <input value={id} type="number"/><br />
                Inskrivningsdatum: <input type="date" value={regDate} onChange={(e) => setRegDate(e.target.value)}/> <br />
                Anledning for inskrivning: <input type="text" value={reason} onChange={(e) => setReason(e.target.value)}/>
                </div>
                <div className="bakgrundsdata">
                <h3>Vid Födelse:</h3>
                Barnets gestationsvecka: <input type="number" value={veckor} onChange={(e) => setVeckor(e.target.value)}/> 
                dagar: <input type="number" value={dagar} onChange={(e) => setDagar(e.target.value)}/> <br />
                Födelsevikt (gram): <input type="number" value={vikt_fodelse} onChange={(e) => setViktFodelse(e.target.value)}/><br />
                Födelselängd (cm): <input type="number" value={langd_fodelse} onChange={(e) => setLangdFodelse(e.target.value)}/> <br />
                Födelsehuvudomfång (cm): <input type="number" 
                    value={huvudomfang_fodelse} onChange={(e) => setHuvudomfangFodelse(e.target.value)}/>

                </div>
                <div className="inskrivning">
                <h3>Vid inskrivning:</h3>
                    Vikt (gram): <input value={vikt_in} type="number" onChange={(e) => set_vikt_in(e.target.value)}/> <br />
                    Längd (cm): <input value={langd_in} type="number" onChange={(e) => set_langd_in(e.target.value)}/> <br />
                    Huvudomfång (cm): <input value={huvud_in} type="number" onChange={(e) => set_huvud_in(e.target.value)}/> <br />
                    Mamma vill amma: 
                        ja <input type="checkbox" class="ja" checked={vill_amma_in == true} 
                            onChange={() => threeCheck(vill_amma_in, set_vill_amma_in, true)} /> 
                        nej <input type="checkbox" class="nej" checked={vill_amma_in == false}
                            onChange={() => threeCheck(vill_amma_in, set_vill_amma_in, false)} /> <br />

                    Erhåller Bröstmjölk: 
                        H<input checked={bmjolk_in == "H"}  
                            type="checkbox" class="helt" onChange={() => {threeCheck(bmjolk_in, set_bmjolk_in, "H")}}/> 

                        D<input checked={bmjolk_in == "D"}  
                            type="checkbox" class="delvis" onChange={() => {threeCheck(bmjolk_in, set_bmjolk_in, "D")}}/>

                        IA<input checked={bmjolk_in == "IA"}
                            type="checkbox" class="inte" onChange={() => {threeCheck(bmjolk_in, set_bmjolk_in, "IA")}}/> <br />
                    Amning: 
                        H<input checked={amning_in == "H"}  
                            type="checkbox" class="helt" onChange={() => {threeCheck(amning_in, set_amning_in, "H")}}/> 

                        D<input checked={amning_in == "D"}  
                            type="checkbox" class="delvis" onChange={() => {threeCheck(amning_in, set_amning_in, "D")}}/>

                        IA<input checked={amning_in == "IA"}
                            type="checkbox" class="inte" onChange={() => {threeCheck(amning_in, set_amning_in, "IA")}}/> <br />

                    Barnet har v-sond: 
                        ja <input type="checkbox" class="ja" checked={vsond_in == true} 
                            onChange={() => threeCheck(vsond_in, set_vsond_in, true)} /> 
                        nej <input type="checkbox" class="nej" checked={vsond_in == false}
                            onChange={() => threeCheck(vsond_in, set_vsond_in, false)} /> <br />


                    Infart: <input value={infart_in} type="text" onChange={(e) => set_infart_in(e.target.value)}/><br />
                    Andningsstöd: <input value={andning_in} type="text" onChange={(e) => set_andning_in(e.target.value)}/> <br />
                    Extra syrgasbehov: 
                        ja <input type="checkbox" class="ja" checked={syrgas_in == true} 
                            onChange={() => threeCheck(syrgas_in, set_syrgas_in, true)} /> 
                        nej <input type="checkbox" class="nej" checked={syrgas_in == false}
                            onChange={() => threeCheck(syrgas_in, set_syrgas_in, false)} /> <br />
                </div> 
                <br />
                

            <div className="risk">
                Riskpatient:
                    ja <input type="checkbox" class="ja" checked={riskpatient == true} 
                        onChange={() => threeCheck(riskpatient, set_risk, true)} /> 
                    nej <input type="checkbox" class="nej" checked={riskpatient == false}
                        onChange={() => threeCheck(riskpatient, set_risk, false)} /> <br />

                Överraportering till bvc:
                    ja <input type="checkbox" class="ja" checked={bvc_rap == true}
                        onChange={(e) => {
                            threeCheck(bvc_rap, set_bvc_rap, true)
                            if (e.target.checked == true) {
                                set_bvc_text("");
                            }
                        }} /> 
                    nej <input type="checkbox" class="nej" checked={bvc_rap == false}
                        onChange={(e) => {
                            threeCheck(bvc_rap, set_bvc_rap, false)
                            if (e.target.checked == false) {
                                set_bvc_text("");
                            }
                        }} />
                Om nej ange orsak: <input type="text" value={bvc_text} onChange={(e) => {
                    if (bvc_rap == false) {
                        set_bvc_text(e.target.value)
                    }
                }}/>

            </div>
            </form>
            </Fragment>
        );
    }
    
    return(
        <Fragment>
            {getRegistration()}
            {getDischarge()}
            <button id="save" onClick={() => submit()}> Spara Redigering</button>
        </Fragment>

    );
}

export default EditRegistration;
