function NavBar({theme, onToggleTheme}){
  return(
    <div className="navBar">
      <div className="nav-left">
        <div className="brand">PR</div>
        <div className="home" onClick={() => window.location.href = "/"}>Home</div>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" onClick={onToggleTheme}>
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        <div className="contact-me" onClick={() =>{
          window.location.href = `mailto:johnathan.p.terry@outlook.com?subject=Contact%20about%20ProjectRecord&body=I'm reaching out to you about`;
        }}>Contact</div>
      </div>
    </div>
  )
}

export default NavBar
