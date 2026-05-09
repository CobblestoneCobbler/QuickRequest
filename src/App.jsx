import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //-1 is all, -2 is none? else index
  const [active, setActive] = useState(-1);
  //0 asc (oldest->newest), 1 desc (newest->oldest)
  const [sort, setSort] = useState(1);
  const [record, setRecord] = useState([]); //array of JSONs of projects, each with entries array
  const [masterRecord, setMasterRecord] = useState({projects:[]});
  
  const fetchMasterRecord = async ()=>{
    try {
      const base = import.meta.env.BASE_URL ?? '/';
      const res = await fetch(base + 'projects/masterRecord.JSON');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setMasterRecord(data);
    } catch (error) {
      console.error("Error fetching master record:", error);
      setMasterRecord({ projects: [] });
    }
  }


  const fetchRecords = async ()=>{

    try {
      if (!masterRecord?.projects?.length) {
        setRecord([]);
        return;
      }

      const base = import.meta.env.BASE_URL ?? '/';
      const responses = await Promise.all(
        masterRecord.projects.map(p => fetch(base + 'projects/' + p.path))
      );

      // check for any non-ok responses first
      const bad = responses.find(r => !r.ok);
      if (bad) {
        throw new Error(`HTTP error fetching ${bad.url} status: ${bad.status}`);
      }

      // parse each response safely, attach project metadata (including accent_rgb) so entries can carry per-project accent
      const parsed = [];
      for (let idx = 0; idx < responses.length; idx++) {
        const r = responses[idx];
        const url = r.url;
        const text = await r.text();
        if (!text) {
          console.warn(`Empty response body from ${url}`);
          // push an empty project object but include projectMeta so consumers know which project it was
          parsed.push({ entries: [], projectMeta: {
            index: idx,
            name: masterRecord.projects[idx]?.name,
            accent_rgb: masterRecord.projects[idx]?.accent_rgb
          }});
          continue;
        }
        try {
          const json = JSON.parse(text);
          // attach project metadata (index, name, accent_rgb) from masterRecord
          json.projectMeta = {
            index: idx,
            name: masterRecord.projects[idx]?.name,
            accent_rgb: masterRecord.projects[idx]?.accent_rgb
          };
          parsed.push(json);
        } catch (err) {
          throw new Error(`Invalid JSON from ${url}: ${err.message}`);
        }
      }

      setRecord(parsed);
    } catch (error) {
      console.error("Error fetching records:", error);
      setRecord([]);
    }
  }

  useEffect(()=>{
    fetchMasterRecord();
  },[]);

  useEffect(()=>{
    fetchRecords();
  },[masterRecord]);
  
  
  return (
    <>
      <div>
        <div className="navBar"></div>
        <div className="project-list">
          {masterRecord.projects.map((p, i)=>{
            return( <div key={i} className={"project "+(active===i?"active":"")} onClick={()=>active === i ? setActive(-1) : setActive(i)}>
              <img src={p.image} alt="" />
              <h2>{p.name}</h2>
            </div>
            )
          })}
        </div>
        <div className="record">
          {record.length > 0 && <Display sort={sort} record={record.filter((n, i)=>{
            return(active === -1 || active === i);
          })} />}
        </div>
      </div>
    </>
  )
}

function Display({record,sort}){
  // build a flat list of entries that carry their project's metadata so each entry can be styled per-project
  const entries = record.reduce((acc, curr) => {
    const meta = curr.projectMeta || {};
    if (Array.isArray(curr.entries)) {
      curr.entries.forEach(e => acc.push({...e, projectMeta: meta}));
    }
    return acc;
  }, []);

  return(
    <div className="display">
      {entries.sort((a,b)=>{
        switch(sort){
          case 0:{
            return a.date-b.date;
          }
          case 1:{
            return b.date-a.date;
          }
          default: return 0;
        }
      }).map((n, i)=>{
        return <Entry key={`E${i}`} i={i} entry={n}/>
      })}
    </div>
  )
}

function Entry({entry, i}){

  const base = import.meta.env.BASE_URL ?? '/';
  const imageUrl = entry.image ? base + entry.image : '';

  // if this entry has project-level accent, expose it as CSS variables on the entry element so children can use them
  const projectAccent = entry.projectMeta?.accent_rgb;
  const style = (projectAccent && projectAccent.length === 3) ? {
    '--accent-rgb': projectAccent.join(','),
    '--accent-color': `rgb(${projectAccent.join(',')})`
  } : {};

  return(
    <div className={`entry ${i%2 ===1? "left" : "right"}`} style={style}>
      <div className="side-bar"></div>
      <div className="img-wrapper">
        {imageUrl? <img src={imageUrl} alt={entry.title} /> : <div className="placeholder"></div>}
      </div>
      <div className="fade">{/* and buffer and fallback color */}</div>
      <div className="entry-meat">
        <h2>{entry.title}</h2>
        <p>{entry.description}</p>
      </div>
    </div>
  )
}


export default App


//TODO Allow De-selection
