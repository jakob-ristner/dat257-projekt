
import React, { Fragment} from "react";

    export function threeCheck(state, setState, value)  { 
        if (state == value) {
            setState(null);
        } else {
            setState(value);
        }
        
    }

    export function validateMulti() {
        var multi = document.getElementsByClassName("multi");
        for (var i = 0; i < multi.length; i++) {
            var inputs = multi.item(i).getElementsByTagName("input");
            var valid = false;
            for (var k = 0; k < inputs.length; k++) {
                if (inputs.item(k).checked) {
                    valid = true;
                }
            }
            if (!valid) {
                inputs.item(0).setCustomValidity("En av dessa måste klickas i! :-)");
            } else {
                inputs.item(0).setCustomValidity("");
            }
        }
    }

    export function getInput(name, type, req, state, setState, min=null, max=null){
        return (<Fragment>{name}:<input type={type} required={req} value={state} min={min} max={max} onChange={(e) => setState(e.target.value)}/> <br/></Fragment>);
    }

    export function getYesNo(name, state, setState){
        return (<Fragment>
            <div className="multi">
                {name}: ja <input type="checkbox"  class="ja" checked={state == true} 
                onChange={() => threeCheck(state, setState, true)} /> 

                nej <input type="checkbox"  class="nej" checked={state == false}
                onChange={() => threeCheck(state, setState, false)} /> <br />
            </div>
        </Fragment>);
    }

    export function getTriple(name, state, setState){
        return (<Fragment>
            <div className="multi">
                {name}: Helt<input checked={state == "H"}  
                type="checkbox"  class="helt" onChange={() => {threeCheck(state, setState, "H")}}/> 
                Delvis<input checked={state == "D"}  
                type="checkbox"  class="delvis" onChange={() => {threeCheck(state, setState, "D")}}/>
                Inte alls<input checked={state == "IA"}
                type="checkbox"  class="inte" onChange={() => {threeCheck(state, setState, "IA")}}/> <br />
            </div>
        

        </Fragment>);
    }

    export function validateAtgard() {
        var atgard = document.getElementsByClassName("atgard").item(0);
        var inputs = atgard.getElementsByTagName("input");
       
        var valid = false;
        for(var i = 0; i < inputs.length; i++){
            if(inputs.item(i).checked){
                valid = true;
            }
            if(inputs.item(i).value != "" && inputs.item(i).type === "text"){
                valid = true;
            }
        }
        console.log(valid);
        if (!valid) {
            inputs.item(0).setCustomValidity("En åtgärd måste väljas");
        } else {
            inputs.item(0).setCustomValidity("");
        }
    
        
    }