import { useState, useEffect } from 'react';
import { Button } from "./Button";


export function Dolly({setPage,sendRequest,area}){
    const prefix = area === "West" ? '9' : '7';
    const [suffix, setSuffix] = useState('');

    useEffect(()=>{
        setSuffix('');
    },[area]);

    function constructHx(){
        const padded = suffix.toString().padStart(2,'0');
        return `${prefix}${padded}`;
    }

    function checkForValid() {
        const fullHx = Number(constructHx());
        if(area==="West" && (fullHx < 900 || fullHx > 999)){
            alert("Invalid HX number — should be 9xx");
            return false;
        } else if(area==="East" && (fullHx < 700 || fullHx > 799)){
            alert("Invalid HX number — should be 7xx");
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
                        <div className="hx-input">
                            <span className="hx-prefix">{prefix}</span>
                            <input id="hxIn" maxLength={2} type="text" value={suffix} autoFocus onChange={(e)=>{
                                const cleaned = e.target.value.replace(/\D/g, '').slice(0,2);
                                setSuffix(cleaned);
                            }} placeholder="00" />
                        </div>
                    </div>
                    <Button inner="Return Home" cb = {()=>setPage(0)} color="grey"/>
                </div>
                <div className="button-container">
                    <div className="low-container">
                        <Button inner = {"Low on Nuts"} cb = {()=>sendRequest("low on dolly nuts")} color="grey"/>
                        <Button inner = {"Low on Washers"} cb = {()=>sendRequest("low on dolly washers")} color="grey"/>
                    </div>
                    <div className="uni-container">
                        <Button inner = {"Broken"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a broken unicorn bolt.`): ""}} color="yellow"/>
                        <Button inner = {"Bent"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a bent unicorn bolt.`): ""}} color="yellow"/>
                        <Button inner = {"X / No Thread"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a unicorn bolt with damaged threads.`): ""}} color="yellow"/>
                        <Button inner = {"Loose"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a loose unicorn bolt.`): ""}} color="yellow"/>
                    </div>
                    <div className="misc-container">
                        <Button inner = {"Stuck Front Pin"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a stuck frontal locking pin.`): ""}} color="blue"/>
                        <Button inner = {"Stuck Back Pin"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a stuck rear locking pin.`): ""}} color="blue"/>
                        <Button inner = {"Raising"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has issues raising`): ""}} color="blue"/>
                        <Button inner = {"Lowering"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has issues lowering`): ""}} color="blue"/>
                        <Button inner = {"Stuck Front Wheel"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} has a stuck front wheel.`): ""}} color="blue"/>
                        <Button inner = {"Missing Nut Holder"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()} is missing the nut and washer holder`): ""}} color="blue"/>
                    </div>
                </div>
            </div>
        </>
    )
}

//Button should be separate element
