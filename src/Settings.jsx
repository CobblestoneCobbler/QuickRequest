import { useState } from "react";

export function Settings({setPage}){
    const [activeElement, setActiveElement] = useState(0);
    var mEmail = localStorage.getItem("mEmail");

    return(
        <div className="settings">
            <div className="display">
                <div className="email" onClick={()=>(setActiveElement(1))}>
                    <div>Maintenance Email :</div> 
                    {activeElement===1? <InputLine value={mEmail? mEmail :""} setValue={(e)=>{localStorage.setItem("mEmail", e);setActiveElement(0)}}/>: mEmail}
                </div>
            </div>
        </div>
    )

}


function InputLine({value,setValue}){
    const [newValue, setNewValue] = useState(value);

    return(
        <>
            <input type="text" value={newValue} autoFocus onChange={(e) => {setNewValue(e.target.value)}} onKeyDown={(e)=>{
                e.key === "Enter" && setValue(newValue);
            }}/>
        </>
    )
}