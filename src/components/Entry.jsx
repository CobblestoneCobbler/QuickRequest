function Entry({entry, i, isAdmin, onEdit}){

  const base = import.meta.env.BASE_URL ?? '/';
  const imageUrl = entry.image ? base + entry.image : '';

  const projectAccent = entry.projectMeta?.accent_rgb;
  const style = (projectAccent && projectAccent.length === 3) ? {
    '--accent-rgb': projectAccent.join(','),
    '--accent-color': `rgb(${projectAccent.join(',')})`
  } : {};

  return(
    <div className={`entry ${i%2 === 1 ? "left" : "right"}${isAdmin ? ' entry-admin' : ''}`} style={style}>
      <div className="entry-border"></div>
      <div className="img-wrapper">
        {imageUrl ? <img src={imageUrl} alt={entry.title} /> : <div className="placeholder"></div>}
      </div>
      <div className="fade"></div>
      <div className="entry-meat">
        <div className="entry-meat-top">
          <h2>{entry.title}</h2>
          {isAdmin && (
            <button className="entry-edit-btn" onClick={() => onEdit(entry)} title="Edit entry">
              Edit
            </button>
          )}
        </div>
        <p>{entry.description}</p>
        {entry.category && <span className="entry-category-tag">{entry.category}</span>}
      </div>
    </div>
  )
}

export default Entry
