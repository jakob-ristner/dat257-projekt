import React, { Fragment } from "react";

class NavDigVard extends React.Component {
    
    constructor(props) {
        super(props);
        this.index = 0;
        this.protocolID = props.match.params.protocolID;
        
        this.state = {
            data: []
        };
 
        fetch('http://localhost:5000/digital-vardmote/' + this.protocolID)
            .then(response => response.json())
            .then(data => this.setState({ data }));
           // .then(() => this.render());
    }

    render() {
    console.log(this.state.data);
    return ( <Fragment>
        <h1>Protkollnummer: {this.protocolID}</h1>
        {this.state.data.map((form, index) => { return(
            <div className="form">
                <button id="edit" onClick={() =>
                {window.location = "/digital-vardmote/edit/" + form.id}
                }> Redigera </button>
            Datum: {form.date} <br/>
            Starttid: {form.start_time} <br/>
            Sluttid: {form.end_time} <br/>
            Utförd av: {form.performed_by} <br/>
            Amning: <input type="checkbox" checked={form.amning_nutrition}/> <br/>
            Stödsamtal: <input type="checkbox" checked={form.stodsamtal}/> <br/>
            Viktkontroll: <input type="checkbox" checked={form.viktkontroll}/> <br/>
            Annat möte: {form.annat_mote} <br/>
            Läkare: <input type="checkbox" checked={form.lakare}/> <br/>
            Logoped: <input type="checkbox" checked={form.logoped}/> <br/>
            Dietist: <input type="checkbox" checked={form.dietist}/> <br/>
            Kurator: <input type="checkbox" checked={form.kurator}/> <br/>
            Annan resurs: {form.annan_resurs} <br/>
            Avvikelse: {form.avvikelse} <br/>
            </div>
        )})}
    </Fragment>);
    }
}

export default NavDigVard;