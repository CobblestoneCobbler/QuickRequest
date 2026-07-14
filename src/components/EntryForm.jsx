import { useState } from 'react'

const categories = ['Web Dev', 'AI / ML', 'Design', 'Games', 'Tooling']

const emptyForm = {
  projectId: '',
  category: '',
  title: '',
  description: '',
  date: '',
  image: null,
  imageName: '',
}

function formFromEntry(entry, projects) {
  if (entry) {
    return {
      projectId: entry.projectMeta?.id || '',
      category: entry.category || '',
      title: entry.title || '',
      description: entry.description || '',
      date: String(entry.date || ''),
      image: null,
      imageName: '',
    }
  }
  return { ...emptyForm, projectId: projects[0]?.id || '' }
}

function EntryForm({ projects, entry, onSave, onCancel }) {
  const isEdit = !!entry
  const [form, setForm] = useState(() => formFromEntry(entry, projects))

  const set = (field) => (e) => {
    const val = field === 'image' ? e.target.files?.[0] || null : e.target.value
    setForm((prev) => ({
      ...prev,
      [field]: val,
      ...(field === 'image' ? { imageName: val?.name || '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      projectId: form.projectId,
      category: form.category,
      title: form.title,
      description: form.description,
      date: form.date ? Number(form.date) : 0,
      imageName: form.imageName,
    })
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <div className="entry-form-header">
        {isEdit ? 'Edit Entry' : 'New Entry'}
      </div>

      <div className="entry-form-body">
        <label className="form-field">
          <span className="form-label">Project</span>
          <select value={form.projectId} onChange={set('projectId')}>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Category</span>
          <select value={form.category} onChange={set('category')}>
            <option value="">— select —</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span className="form-label">Title</span>
          <input type="text" value={form.title} onChange={set('title')} placeholder="entry title" />
        </label>

        <label className="form-field">
          <span className="form-label">Description</span>
          <textarea value={form.description} onChange={set('description')} placeholder="entry description" rows={3} />
        </label>

        <label className="form-field">
          <span className="form-label">Date (YYYYMMDD)</span>
          <input type="text" value={form.date} onChange={set('date')} placeholder="20260101" />
        </label>

        <label className="form-field">
          <span className="form-label">Image</span>
          <input type="file" onChange={set('image')} accept="image/*" />
          {form.imageName && <span className="form-file-name">{form.imageName}</span>}
        </label>
      </div>

      <div className="entry-form-actions">
        <button type="submit" className="form-btn form-btn-primary">
          {isEdit ? 'Update' : 'Add Entry'}
        </button>
        <button type="button" className="form-btn form-btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EntryForm
