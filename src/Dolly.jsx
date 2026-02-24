import { useState } from 'react';
import { Button } from "./Button";


export function Dolly({setPage,sendRequest,area}){
    const [hx, setHx] = useState(area==="West"?9:7);

    function checkForValid() {
        if(area==="West" && (hx < 900 || hx > 999)){
            alert("invalid HX - Number. should be 9xx");
            return false;
        } else if(area==="East" && (hx < 700 || hx > 799)){
            alert("invalid HX - Number. should be 7xx");
            return false;
        }
        return true;
    }
    

    return(
        <>
            <div className="dolly">
                <div className="topBar">
                    <div className="hx-container">
                        <div>HX : </div>
                        <input id="hxIn" maxLength="3" type="number" value={hx} autoFocus onChange={(e)=>{
                            if(e.target.value.toString().length > 3) return;
                            setHx(e.target.value);
                        }} />
                    </div>
                    <Button inner="Return Home" cb = {()=>setPage(0)} color="grey"/>
                </div>
                <div className="button-container">
                    <div className="low-container">
                        <Button inner = {"Low on Nuts"} cb = {()=>sendRequest("low on dolly nuts")} color="grey"/>
                        <Button inner = {"Low on Washers"} cb = {()=>sendRequest("low on dolly washers")} color="grey"/>
                    </div>
                    <div className="uni-container">
                        <Button inner = {"Broken"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a broken unicorn bolt.`): ""}} color="yellow"/>
                        <Button inner = {"Bent"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a bent unicorn bolt.`): ""}} color="yellow"/>
                        <Button inner = {"X / No Thread"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a unicorn bolt with damaged threads.`): ""}} color="yellow"/>
                        <Button inner = {"Loose"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a loose unicorn bolt.`): ""}} color="yellow"/>
                    </div>
                    <div className="misc-container">
                        <Button inner = {"Stuck Front Pin"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a stuck frontal locking pin.`): ""}} color="blue"/>
                        <Button inner = {"Stuck Back Pin"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a stuck rear locking pin.`): ""}} color="blue"/>
                        <Button inner = {"Raising"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has issues raising`): ""}} color="blue"/>
                        <Button inner = {"Lowering"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has issues lowering`): ""}} color="blue"/>
                        <Button inner = {"Stuck Front Wheel"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} has a stuck front wheel.`): ""}} color="blue"/>
                        <Button inner = {"Missing Nut Holder"} cb = {()=>{checkForValid()? sendRequest(`HX-${hx} is missing the nut and washer holder`): ""}} color="blue"/>
                    </div>
                </div>
            </div>
        </>
    )
}

//Button should be separate element
