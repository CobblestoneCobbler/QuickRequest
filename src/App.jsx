import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import Display from './components/Display'
import CategorySidebar from './components/CategorySidebar'
import EntryForm from './components/EntryForm'

function App() {
  const [active, setActive] = useState(null);
  const [sort, setSort] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [record, setRecord] = useState([]);
  const [masterRecord, setMasterRecord] = useState({projects:[]});
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

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

  useEffect(()=>{
    fetchMasterRecord();
  },[]);

  useEffect(()=>{
    const loadRecords = async ()=>{
      try {
        if (!masterRecord?.projects?.length) {
          setRecord([]);
          return;
        }

        const base = import.meta.env.BASE_URL ?? '/';
        const responses = await Promise.all(
          masterRecord.projects.map(p => fetch(base + 'projects/' + p.path))
        );

        const bad = responses.find(r => !r.ok);
        if (bad) {
          throw new Error(`HTTP error fetching ${bad.url} status: ${bad.status}`);
        }

        const parsed = [];
        for (let idx = 0; idx < responses.length; idx++) {
          const r = responses[idx];
          const url = r.url;
          const text = await r.text();
          if (!text) {
            console.warn(`Empty response body from ${url}`);
            parsed.push({ entries: [], projectMeta: {
              id: masterRecord.projects[idx]?.id,
              name: masterRecord.projects[idx]?.name,
              accent_rgb: masterRecord.projects[idx]?.accent_rgb
            }});
            continue;
          }
          try {
            const json = JSON.parse(text);
            json.projectMeta = {
              id: masterRecord.projects[idx]?.id,
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
    };
    loadRecords();
  },[masterRecord]);

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme);
  },[theme]);

  const handleSaveEntry = (data) => {
    console.log('Entry saved (API not yet implemented):', data);
    setEditingEntry(null);
  };

  const filteredRecord = record.filter((n) => {
    return (active === null || active === n.projectMeta?.id);
  });

  return (
    <div className="app-container">
      <CategorySidebar isAdmin={isAdmin} onToggleAdmin={(v) => setIsAdmin(v)} />
      <div className="main-content">
        <NavBar theme={theme} onToggleTheme={()=>setTheme(t => t === 'dark' ? 'light' : 'dark')} />
        <div className="content-area">
          {isAdmin && (
            <EntryForm
              key={editingEntry ? editingEntry.title + editingEntry.date : 'new'}
              projects={masterRecord.projects}
              entry={editingEntry}
              onSave={handleSaveEntry}
              onCancel={() => setEditingEntry(null)}
            />
          )}
          <div className="project-list">
            {masterRecord.projects.map((p)=>{
              const accentStyle = p.accent_rgb ? { '--project-accent-rgb': p.accent_rgb.join(',') } : {};
              return( <div key={p.id} className={"project "+(active===p.id?"active":"")} style={accentStyle} onClick={()=>active === p.id ? setActive(null) : setActive(p.id)}>
                <h2>{p.name}</h2>
              </div>
              )
            })}
          </div>
          <div className="controls">
            <button className="sort-btn" onClick={()=>setSort(s => s === 1 ? 0 : 1)}>
              {sort === 1 ? 'Newest First' : 'Oldest First'}
            </button>
          </div>
          <div className="display">
            {record.length > 0 && (
              <Display
                sort={sort}
                record={filteredRecord}
                isAdmin={isAdmin}
                onEditEntry={setEditingEntry}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
