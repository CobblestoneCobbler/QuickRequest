import {Button} from "./Button";

export function Facilities({setPage, sendRequest, area}){
    return(
        <>
            <div className="facilities">
                <div className="topBar">
                    <div className="asset-entry">
                        <input type="text" placeholder="Enter asset"  autoFocus/>
                    </div>
                    <div className="title">Facilities</div>
                    <Button inner="Return Home" cb = {()=>setPage(0)} color="grey"/>
                </div>
                <div className="button-container">
                    <Button inner = {"Water Cooler not working"} cb = {()=>sendRequest(" water cooler is not working near ")} color="grey"/>
                </div>
            </div>
        </>
    )
}