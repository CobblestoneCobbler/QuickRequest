import { useState } from 'react'

import './App.css'
import { Dolly } from './Dolly';
import { Facilities } from './Facilities';
import { Hoist } from './Hoist';
import { Launcher } from './launcher';
import { Settings } from './Settings';

export function App() {
  const [page, setPage] = useState(0);
  const [area, setArea] = useState(()=>{
    const stored = localStorage.getItem("area");
    return( stored ? JSON.parse(stored) : "West");
  });
  

  const maintenanceEmail = localStorage.getItem("mEmail") || "InputEmail";
  const subjectLine = "Maintenance Request";
  const urgentSubject = "Line Down Maintenance Request";

  const pages =
  [{name:"Dolly",color:"blue",slot:1},

    {name:"Facilities",color:"green",slot:5},
    {name:"Settings",color:"yellow",slot:6}
  ]

  function sendRequest(asset, output){
        output =`In the ${area === "West" || area === "East" ? "5000":"5008"} Womack Rd location, on the ${area} Line, ${output}`;
        const encodedSubject = encodeURIComponent(asset? asset : subjectLine);
        const encodedBody = encodeURIComponent(output);
        window.location.href = `mailto:${maintenanceEmail}?subject=${encodedSubject}&body=${encodedBody}`;
        /*
        handleClick() {
          const params = new URLSearchParams({ subject, body }).toString();
          const mailtoUri = `mailto:${email}?${params}`;
          
          window.location.href = mailtoUri;
        } 
        */
    }

  return (
    <>
      <div className="navBar">
        <div className="main-hub" onClick={()=> window.location.href = 'https://terryhq.org'}>Terry HQ</div>
        <div className="contact-me" onClick={() =>{
            window.location.href = `mailto:johnathan.p.terry@outlook.com?subject=Contact%20about%20Terry%20HQ&body=I'm reaching out to you about`;
          }}>Get in touch</div>
      </div>
      <div className="main">
        <div className="titleBar">
          <div className="title" onClick={()=>setPage(0)}>Quick Request</div>
          {/* TODO Enable more areas to utilize, ex CabSub*/}

          <div className="switcher">
            <div className={area==="West" ? "switcher-option active":"switcher-option"} onClick={()=>{
              localStorage.setItem("area", JSON.stringify("West"));
              setArea("West");
            }}>West</div>
            <div className={area==="East" ? "switcher-option active":"switcher-option"} onClick={()=>{
              localStorage.setItem("area", JSON.stringify("East"));
              setArea("East");
            }}>East</div>

          </div>
        </div>
        {page===0 && <Launcher pages={pages} setPage={setPage}/>}
        {page===6 && <Settings setPage={setPage}/>}
        {page===1 && <Dolly setPage={setPage} sendRequest={sendRequest} area={area}/>}
        {page===5 && <Facilities setPage={setPage} sendRequest={sendRequest} area={area}/>}

      </div>
    </>
  )
}

export default App
