import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from '../components/auth/Login';

const LoginPage = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return <Login onLogin={handleLogin} error={error} />;
};

export default LoginPage;