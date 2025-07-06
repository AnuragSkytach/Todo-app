import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Signup from '../components/auth/Signup';

const SignupPage = () => {
  const { signup } = useAuth();
  const [error, setError] = useState('');

  const handleSignup = async (userData) => {
    try {
      await signup(userData);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return <Signup onSignup={handleSignup} error={error} />;
};

export default SignupPage;