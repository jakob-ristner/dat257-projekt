import React, { Fragment } from "react";

import HomeButton from "../../components/HomeButton"
import layout from "../../cssModules/NavLayout.module.css";
import IconButton from '@material-ui/core/IconButton';
//import {ArrowDropUpIcon, ArrowDropDownIcon} from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

class NavAterlaggning extends React.Component {

    constructor(props) {
        super(props);
        this.protocolID = props.match.params.protocolID;

        this.state = {
            data: [],
            index: 0
        };

        fetch('http://localhost:5000/aterlaggning/' + this.protocolID, {credentials: "include"})
            .then(response => response.json())
            .then(data => this.setState({ data }))
            .then(console.log(this.state.data));

            /*const jsonData = response.json();
            const show = jsonData[0];
            console.log(show)*/
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

    getHeader() {
        if (this.state.data.length > 0) {
            return (
                <h2>Visar återläggning {this.state.data.length - 
                    Math.min(this.state.data.length, this.state.index)}
                    - 
                    {this.state.data.length -
                Math.min(this.state.data.length, this.state.index + 2 )} utav 
                    totalt {this.state.data.length} st återläggning</h2>
            );
        }
        return (
            <h2>Det finns ej några återläggning för detta protokollnr</h2> 
        );
    }

    render() {
        var sliced = this.state.data.slice(this.state.index, this.state.index + 3);
        var offset = 1 - sliced.length;
        return ( <Fragment>
        <h1>Återläggning</h1>
        {this.getHeader()}
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
                    <button id={layout.editAterlaggning} onClick={() =>
                    {window.location = "/aterlaggning/edit/" + form.id}
                    }> Redigera </button >
        
                    <button id={layout.editAterlaggning} onClick={() =>
                    {window.location = "/aterlaggning/end/" + form.id}
                    }> Avsluta återläggning </button >

                <div className={layout.info}>
                    Undersökning nr: {this.state.data.length - (this.state.index + i)} <br/> 
                    Datum: {form.startdate} <br/>
                </div>

                <div className={layout.atgard}>
                    Orsak: <input value = {form.orsak}></input> <br/>
                </div>

                <div className={layout.resurs}>
                    Avslutningsdatum: {form.enddate} <br/>
                    Utskriven till hemmet:   
                    <input type="checkbox" checked={form.utskrivning_hemmet} /> <br />
                </div>  

            </div>
            )})}
            </div>

        
            <div id = "homeButton"><HomeButton/></div>

            <div className={layout.downButton}>
                {this.earlierButton()}
            </div>
        </div>

        <button onClick={() => 
        {window.location="/aterlaggning/add/" + this.protocolID}}>Lägg till ny återläggning</button>

     </Fragment>);
    }
}

export default NavAterlaggning; 