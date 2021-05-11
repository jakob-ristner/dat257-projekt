import React, { Fragment } from "react";
import Navigation from "../../components/navigationButtons";
import HomeButton from "../../components/HomeButton";
import layout from "../../cssModules/NavLayout.module.css";
import IconButton from '@material-ui/core/IconButton';
//import {ArrowDropUpIcon, ArrowDropDownIcon} from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

class NavDigVard extends React.Component {
    
    constructor(props) {
        super(props);
        this.protocolID = props.match.params.protocolID;
        
        this.state = {
            data: [],
            index: 0
        };
 
        fetch('http://localhost:5000/digitalt-vardmote/' + this.protocolID)
            .then(response => response.json())
            .then(console.log("Fetched resource"))
            .then(data => this.setState({ data }));
           // .then(() => this.render());
    }

    incIndex() {
        var offset = Math.min(this.state.data.length, 3);
        this.setState({
            data: this.state.data,
            index: Math.min(this.state.index + 3, this.state.data.length - offset)
        })
    } 

    decIndex() {
        this.setState({
            data: this.state.data,
            index: Math.max(this.state.index - 3, 0)
        })
    }
    

    laterButton() {
        if (this.state.data.length === 0) {
            return;
        }
        if (this.state.index === 0) {
            return (<IconButton disabled="true"><ArrowDropUpIcon id={layout.arrowButton} onClick={() => this.decIndex()}/> </IconButton>);
        }
        return (<IconButton><ArrowDropUpIcon id={layout.arrowButton} onClick={() => this.decIndex()}/> </IconButton>);
    }

    earlierButton() {
        var offset = Math.min(this.state.data.length, 3);
        var disabled = this.state.index === this.state.data.length - offset;
        if (this.state.data.length === 0) {
            return;
        }
        return (<IconButton disabled={disabled}><ArrowDropDownIcon id={layout.arrowButton} onClick={() => this.incIndex()}/> </IconButton>);
    }
    
    getItemID(index) {
        switch (index) {
            case 0: 
                return layout.item0;
            case 1:
                return layout.item1;
            case 2: 
                return layout.item2;
        }
    }
    render() {
        var sliced = this.state.data.slice(this.state.index, this.state.index + 3);
        var offset = 1 - sliced.length;
        return ( <Fragment>
        <h1>Digitala vårdmöten</h1>
        <div className={layout.protID}>
            <h2>Protokollnummer: {this.protocolID}</h2>
        </div>

     
        <div class = {layout.grid}>
        <div className={layout.upButton}>
            {this.laterButton()}
        </div>
    
            <div className={layout.list}>


            {sliced.map((form, i) => { return(
            <div className={layout.container} id={this.getItemID(i)}>
                    <button id={layout.edit} onClick={() =>
                    {window.location = "/digitalt-vardmote/edit/" + form.id}
                    }> Redigera </button >
                
                <div className={layout.info}>
                    Digitalt Vårdmöte nr: {this.state.data.length - (this.state.index + i)} <br/> 
                    Datum: {form.date} <br/>
                    Starttid: {form.start_time} <br/>
                    Sluttid: {form.end_time} <br/>
                    Utförd av: {form.performed_by} <br/>
                </div>

                <div className={layout.atgard}>
                    <input type="checkbox" checked={form.amning_nutrition}/> Amning <br/>
                    <input type="checkbox" checked={form.stodsamtal}/> Stödsamtal <br/>
                    <input type="checkbox" checked={form.viktkontroll}/> Viktkontroll <br/>
                    Annat: <input value = {form.annat_mote}></input> <br/>
                </div>

                <div className={layout.resurs}>
                    <input type="checkbox" checked={form.lakare}/> Läkare <br/>
                    <input type="checkbox" checked={form.logoped}/> Logoped <br/>
                    <input type="checkbox" checked={form.dietist}/> Dietist <br/>
                    <input type="checkbox" checked={form.kurator}/> Kurator <br/>
                   <input value = {form.annan_resurs}></input>  Annan resurs <br/>
                </div>
                <div className={layout.avvikning}>
                    <input type="checkbox" checked={form.av_logistik}></input> Avvikelse logistik <br></br>
                    <input type="checkbox" checked={form.av_barn_familj}></input> Avvikelse barn/familj<br></br>
                    <input type="checkbox" checked={form.av_personal}></input> Avvikelse personal <br></br>
                    Förklaring: <input value = {form.av_beskrivning}></input> <br/>
                </div>
            </div>
            )})}
            </div>
            <div class = "navigation"><Navigation id={this.protocolID}/></div>
            <div id = "homeButton"><HomeButton/></div>

            <div className={layout.downButton}>
                {this.earlierButton()}
            </div>
        </div>
      
        <button onClick={() => 
        {window.location="/digitalt-vardmote/add/" + this.protocolID}}>Skapa nytt digitalt vårdmöte</button>
    
     </Fragment>);
    }
}

export default NavDigVard;
