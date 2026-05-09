import {Button} from "./Button";

export function Hoist({setPage, sendRequest, area}){
    return(
        <>
            <div className="hoist">
                <div className="topBar">
                    <div className="asset-entry">
                        <input type="text" placeholder="Enter asset" autoFocus />
                    </div>
                    <div className="title">Hoist</div>
                    <Button inner="Return Home" cb = {()=>setPage(0)} color="grey"/>
                </div>
                <div className="button-container">
                    <Button inner = {"Broken Chain"} cb = {()=>sendRequest(" has a broken chain")} color="grey"/>
                    <Button inner = {"Hoist is not lifting"} cb = {()=>sendRequest(" is not lifting")} color="grey"/>
                    <Button inner = {"Missing Starter Key"} cb = {()=>sendRequest(" starter key is missing")} color="grey"/>
                    <Button inner = {"Controller is unresponsive"} cb = {()=>sendRequest(" hoist controller is unresponsive")} color="grey"/>
                    <Button inner = {"Hoist is making noise"} cb = {()=>sendRequest(" is making noise")} color="grey"/>
                </div>
            </div>
        </>
    )
}