import { useAuth } from '../context/AuthContext';
import '../styles/layout.scss';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="header">
        <h1>Todo App</h1>
        {user && (
          <nav>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </nav>
        )}
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;