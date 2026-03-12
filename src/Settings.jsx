import { useState, useEffect, useRef } from "react";

export function Settings({setPage}){
    const [activeElement, setActiveElement] = useState(0);
    const [mEmail, setMEmail] = useState(()=> localStorage.getItem("mEmail") || "");

    function saveEmail(newEmail){
        const trimmed = newEmail.trim();
        setMEmail(trimmed);
        localStorage.setItem("mEmail", trimmed);
        setActiveElement(0);
    }

    return(
        <div className="settings">
            <div className="display">
                <div className="email" onClick={()=>(setActiveElement(1))}>
                    <div>Maintenance Email :</div> 
                    {activeElement===1? <InputLine value={mEmail} onSave={saveEmail}/> : (mEmail || <span className="placeholder">Enter an Email</span>)}
                </div>
            </div>
        </div>
    )

}


function InputLine({value,onSave}){
    const [newValue, setNewValue] = useState(value);
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current?.focus();
    },[]);
    
    useEffect(()=>{
        setNewValue(value);
    },[value]);

    return(
        <>
            <input
                ref={inputRef}
                type="text"
                value={newValue}
                onChange={(e) => {setNewValue(e.target.value)}}
                onBlur={() => onSave(newValue)}
                onKeyDown={(e) => {
                    if(e.key === "Enter"){
                        onSave(newValue);
                    }
                }}
            />
        </>
    )
}