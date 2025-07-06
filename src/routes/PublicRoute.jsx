import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const { user } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;