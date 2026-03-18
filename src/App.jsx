import { useEffect, useState } from 'react'
import './App.css'

function App() {
  //-1 is all, -2 is none? else index
  const [active, setActive] = useState(-1);
  //0 asc, 1 desc,   sorts by O.date which should be properly ordered
  const [sort, setSort] = useState(0);
  const [record, setRecord] = useState([]); //array of JSONs of projects, each with entries array
  const [masterRecord, setMasterRecord] = useState({projects:[]});
  
  const fetchMasterRecord = async ()=>{
    try {
      const res = await fetch("/records/masterRecord.json");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setMasterRecord(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }


  const fetchRecords = async ()=>{

    try {
      //TODO add a mid step to check responses as a find() then step forward
      const res = await Promise.all(masterRecord.projects.map(p=>fetch("/records/"+p.path)));
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await Promise.all(res.map(r=>r.json()));
      setRecord(data);
    } catch (error) {
      console.error("Error fetching records:", error);
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
            return( <div key={i} className={"project "+(active===i?"active":"")} onClick={()=>setActive(i)}>
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
  const entries = record.reduce((acc, curr) => {
    acc.push(...curr.entries);
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
        return <Entry key={`E${i}`} entry={n}/>
      })}
    </div>
  )
}

function Entry({entry}){

  return(
    <div className="entry">
      <div className="img-wrapper">
        {entry.image? <img src={entry.image} alt={entry.title} /> : <div className="placeholder"></div>}
        <div className="fade">{/*TODO Add alteration to the fade, and buffer and fallback color */}</div>
        <div className="entry-meat">
          <h2>{entry.title}</h2>
          <p>{entry.description}</p>
        </div>
      </div>
    </div>
  )
}


export default App
