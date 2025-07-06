import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading] = useState(true);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signup = async (userData) => {
    try {
      const newUser = await registerUser(userData);
      setUser(newUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      navigate("/login");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
