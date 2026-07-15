import { useState } from 'react'

const categories = [
  'All',
  'Web Dev',
  'AI / ML',
  'Design',
  'Games',
  'Tooling',
]

const PASSCODE = 'admin'

function CategorySidebar({ isAdmin, onToggleAdmin }) {
  const [active, setActive] = useState('All')
  const [showPasscode, setShowPasscode] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')

  const handleLoginClick = () => {
    setShowPasscode(true)
    setError('')
    setPasscode('')
  }

  const handlePasscodeSubmit = (e) => {
    e.preventDefault()
    if (passcode === PASSCODE) {
      setShowPasscode(false)
      setPasscode('')
      setError('')
      onToggleAdmin(crypto.randomUUID())
    } else {
      setError('invalid')
      setPasscode('')
    }
  }

  const handleLogout = () => {
    setShowPasscode(false)
    setPasscode('')
    setError('')
    onToggleAdmin(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowPasscode(false)
      setPasscode('')
      setError('')
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        Categories
      </div>
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat}
            className={`category-item${active === cat ? ' active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
      <div className="sidebar-spacer" />
      <div className="sidebar-divider" />
      {!isAdmin && !showPasscode && (
        <div className="category-item" onClick={handleLoginClick}>
          Login
        </div>
      )}
      {!isAdmin && showPasscode && (
        <form className="passcode-form" onSubmit={handlePasscodeSubmit} onKeyDown={handleKeyDown}>
          <input
            type="password"
            className="passcode-input"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="passcode"
            autoFocus
          />
          <div className="passcode-actions">
            <button type="submit" className="passcode-btn">Enter</button>
            <button type="button" className="passcode-btn passcode-btn-cancel" onClick={() => setShowPasscode(false)}>Cancel</button>
          </div>
          {error && <span className="passcode-error">{error}</span>}
        </form>
      )}
      {isAdmin && (
        <div className="category-item admin-on" onClick={handleLogout}>
          Logout
        </div>
      )}
    </div>
  )
}

export default CategorySidebar
