import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setAuthInitialized(true); // Mark auth as initialized
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        toast.success('Login successful!');
        return true;
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const register = async (fullname, email, password) => {
    setLoading(true);
    try {
        const response = await api.post('/auth/register', { fullname, email, password });
        if (response.data.success) {
            toast.success('Registration successful! Please log in.');
            return true;
        }
    } catch (error) {
        const message = error.response?.data?.message || 'Registration failed.';
        const errors = error.response?.data?.errors;
        if (errors) {
            errors.forEach(err => toast.error(`${err.field}: ${err.message}`));
        } else {
            toast.error(message);
        }
        return false;
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    api.post('/auth/logout'); // Inform the backend
    toast.success('Logged out successfully.');
  };

  const value = {
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  // Render children only after auth state has been initialized
  return (
    <AuthContext.Provider value={value}>
      {authInitialized ? children : <div className="h-screen w-full flex items-center justify-center"><Loader size="h-12 w-12"/></div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};