import React, { Fragment } from "react";

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
        this.setState({
            data: this.state.data,
            index: Math.min(this.state.index + 1, this.state.data.length - 3)
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
        if (this.state.data.length === 0) {
            return;
        }
        if (this.state.index === this.state.data.length - 3) {
            return (<button onClick={() => this.incIndex()} disabled="true"> Tidigare digitala vårdmöten </button>);
        } 
        return (<button onClick={() => this.incIndex()}> Tidigare digitala vårdmöten</button>);
    }
    

    render() {
        return ( <Fragment>
        {this.earlierButton()}
        <h1>Protkollnummer: {this.protocolID}</h1>
        {this.state.data.slice(this.state.index, this.state.index + 3).reverse().map((form, i) => { return(
            <div className="container">
                <button id="edit" onClick={() =>
                {window.location = "/digital-vardmote/edit/" + form.id}
                }> Redigera </button>
                
            <div className="info">
                Digitalt Vårdmöte nr: {i + this.state.data.length - this.state.index - 2} <br/>
                Datum: {form.date} <br/>
                Starttid: {form.start_time} <br/>
                Sluttid: {form.end_time} <br/>
                Utförd av: {form.performed_by} <br/>
            </div>

            <div className="atgard">
            Amning: <input type="checkbox" checked={form.amning_nutrition}/> <br/>
            Stödsamtal: <input type="checkbox" checked={form.stodsamtal}/> <br/>
            Viktkontroll: <input type="checkbox" checked={form.viktkontroll}/> <br/>
            Annat: {form.annat_mote} <br/>
            </div>

            <div className="resurs">
            Läkare: <input type="checkbox" checked={form.lakare}/> <br/>
            Logoped: <input type="checkbox" checked={form.logoped}/> <br/>
            Dietist: <input type="checkbox" checked={form.dietist}/> <br/>
            Kurator: <input type="checkbox" checked={form.kurator}/> <br/>
            Annan resurs: {form.annan_resurs} <br/>
            </div>
            <div className="avvik">
            Avvikelser: {form.avvikelse} <br/>
            </div>
            </div>
        )})}
    {this.laterButton()}
    </Fragment>);
    }
}

export default NavDigVard;
