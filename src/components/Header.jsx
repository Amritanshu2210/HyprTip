function Header() {
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="logo" href="/">
          HyprTip
        </a>
        
        
      </div>
    </header>
  );
}

export default Header;
