import React, { Fragment } from "react";
import Navigation from "../../components/navigationButtons";
import HomeButton from "../../components/HomeButton";

class NavDigVard extends React.Component {
    
    constructor(props) {
        super(props);
        this.protocolID = props.match.params.protocolID;
        
        this.state = {
            data: [],
            index: 0
        };
 
        fetch('http://localhost:5000/digital-vardmote/' + this.protocolID)
            .then(response => response.json())
            .then(data => this.setState({ data }));
           // .then(() => this.render());
    }

    incIndex() {
        var offset = Math.min(this.state.data.length, 3);
        this.setState({
            data: this.state.data,
            index: Math.min(this.state.index + 1, this.state.data.length - offset)
        })
    } 

    decIndex() {
        this.setState({
            data: this.state.data,
            index: Math.max(this.state.index - 1, 0)
        })
    }
    

    laterButton() {
        if (this.state.data.length === 0) {
            return;
        }
        if (this.state.index === 0) {
            return (<button onClick={() => this.decIndex()} disabled="true">Senare digitala vårdmöten </button>);
        }
        return (<button onClick={() => this.decIndex()}>Senare digitala vårdmöten</button>);
    }

    earlierButton() {
        var offset = Math.min(this.state.data.length, 3);
        var disabled = this.state.index === this.state.data.length - offset;
        if (this.state.data.length === 0) {
            return;
        }
        return (<button onClick={() => this.incIndex()} disabled={disabled}> Tidigare digitala vårdmöten </button>);
    }
    

    render() {
        var sliced = this.state.data.slice(this.state.index, this.state.index + 3).reverse();
        var offset = 1 - sliced.length;
        return ( <Fragment>
        <h1>Protkollnummer: {this.protocolID}</h1>
        {this.earlierButton()}
        <div class = "grid">
        <div class="list">
        {sliced.map((form, i) => { return(
            <div className="container" id={"item" + i}>
                <button  id="edit" onClick={() =>
                {window.location = "/digital-vardmote/edit/" + form.id}
                }> Redigera </button >
                
            <div className="info">
                Digitalt Vårdmöte nr: {i + this.state.data.length - this.state.index + offset} <br/>
                Datum: {form.date} <br/>
                Starttid: {form.start_time} <br/>
                Sluttid: {form.end_time} <br/>
                Utförd av: {form.performed_by} <br/>
            </div>

            <div className="atgard">
            Amning: <input type="checkbox" checked={form.amning_nutrition}/> <br/>
            Stödsamtal: <input type="checkbox" checked={form.stodsamtal}/> <br/>
            Viktkontroll: <input type="checkbox" checked={form.viktkontroll}/> <br/>
            Annat: <input value = {form.annat_mote}></input> <br/>
            </div>

            <div className="resurs">
            Läkare: <input type="checkbox" checked={form.lakare}/> <br/>
            Logoped: <input type="checkbox" checked={form.logoped}/> <br/>
            Dietist: <input type="checkbox" checked={form.dietist}/> <br/>
            Kurator: <input type="checkbox" checked={form.kurator}/> <br/>
            Annan resurs: <input value = {form.annan_resurs}></input> <br/>
            </div>
            <div className="avvik">
            Avvikelser: <input value = {form.avvikelse}></input> <br/>
            </div>
            </div>
        )})}
         </div>
         <div class = "navigation"><Navigation id={this.protocolID}/></div>
         <div id = "homeButton"><HomeButton/></div>
         </div>
    {this.laterButton()}
         <button onClick={() => 
        {window.location="/digital-vardmote/add/" + this.protocolID}}>Skapa nytt digitalt vårdmöte</button>

    </Fragment>);
    }
}

export default NavDigVard;
