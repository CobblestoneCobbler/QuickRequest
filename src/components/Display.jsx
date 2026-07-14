import Entry from './Entry'

function Display({record, sort, isAdmin, onEditEntry}){
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
        return <Entry key={`${n.projectMeta?.id}-${n.title}-${n.date}`} i={i} entry={n} isAdmin={isAdmin} onEdit={onEditEntry} />
      })}
    </div>
  )
}

export default Display
