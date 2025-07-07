import { useAuth } from "../context/AuthContext";
import "../styles/layout.scss";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="header">
        <div className="header__content container">
          <h1 className="header__logo">Todo App</h1>

          {user && (
            <nav className="header__nav">
              <button
                onClick={logout}
                className="logout-button"
                aria-label="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="logout-button__icon"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </button>
            </nav>
          )}
        </div>
      </header>

      <main className="main-content container">{children}</main>
    </div>
  );
};

export default Layout;
