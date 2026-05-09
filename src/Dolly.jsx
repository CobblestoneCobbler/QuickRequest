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

                <div className="display-container">
                    {area === "West" && <WestDolly/>}

                    <div className="button-container">
                        <div className="low-container">
                            <Button inner = {"Low on Nuts"} cb = {()=>sendRequest(`West Line Dolly Nuts`,"low on dolly nuts")} color="grey"/>
                            <Button inner = {"Low on Washers"} cb = {()=>sendRequest(`West Line Dolly Washers`,"low on dolly washers")} color="grey"/>
                        </div>
                        <div className="uni-container">
                            <div>Unicorn:</div>
                            <Button inner = {"Broken"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a broken unicorn bolt.`): ""}} color="yellow"/>
                            <Button inner = {"Bent"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a bent unicorn bolt.`): ""}} color="yellow"/>
                            <Button inner = {"X / No Thread"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a unicorn bolt with damaged threads.`): ""}} color="yellow"/>
                            <Button inner = {"Loose"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a loose unicorn bolt.`): ""}} color="yellow"/>
                        </div>
                        <div className="lifting-container">
                            <div>Lift:</div>
                            <Button inner = {"Broken Air Adapter"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a broken air adapter.`): ""}} color="blue"/>
                            <Button inner = {"Raising"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has issues raising.`): ""}} color="blue"/>
                            <Button inner = {"Lowering"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has issues lowering.`): ""}} color="blue"/>
                            <Button inner = {"Broken Pedal"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a broken lift pedal.`): ""}} color="blue"/>
                        </div>
                        <div className="wheel-container">
                            <Button inner = {"Stuck Front Wheel"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a stuck front wheel.`): ""}} color="blue"/>
                        </div>
                        <div className="front-pin-container">
                            <div>Front Pin:</div>
                            {area === "East" && <Button inner = {"Broken Wheel Lock"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a broken front wheel lock.`): ""}} color="blue"/>}
                            <Button inner = {"Broken Handle"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a broken front tow pin handle.`): ""}} color="blue"/>
                            <Button inner = {"Stuck Front Pin"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a stuck front tow pin.`): ""}} color="blue"/>
                        </div>
                        <div className="rear-pin-container">
                            <div>Rear Pin:</div>
                            {area === "East" && <Button inner = {"Broken Wheel Lock"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a broken rear wheel lock.`): ""}} color="blue"/>}
                            <Button inner = {"Broken Handle"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a rear tow pin with a broken handle.`): ""}} color="blue"/>
                            <Button inner = {"Stuck Back Pin"} cb = {()=>{checkForValid()? sendRequest(`HX-${constructHx()}`,`HX-${constructHx()} has a stuck rear tow pin.`): ""}} color="blue"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function WestDolly(){
    return(
        <div className="west-dolly">
            <div className="west-load-plate">
                <div className="west-pin-plate">
                    <div className="unicorn"></div>
                </div>
            </div>
            <div className="lift">
                <div className="lift-bar"></div>
                <div className="lift-bar inverse"></div>
            </div>
            <div className="west-base">
                <div className="wheel front"></div>
                <div className="wheel rear"></div>
            </div>
            <div className="front-pin">
                <div className="skirt"></div>
                <div className="handle"></div>
            </div>
            <div className="rear-pin">
                <div className="skirt"></div>
                <div className="handle"></div>
            </div>
        </div>
    )
}

//Button should be separate element
