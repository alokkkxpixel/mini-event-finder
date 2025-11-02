import axios from 'axios';
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import Loader from '../components/Loader';

// 1. Create the context with a default value of null
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // A general loading state you control

  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
       
      } catch (error) {
        setUser(null)
        localStorage.removeItem("token");
        console.error("Auth error:", error);
        
      }finally{

        setAuthLoading(false)
      }
    };

    fetchData();
  }, []); // only run on mount or token change

  // 3. Define the value to be passed down
   const value = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: !!user,
    loading,
    setLoading
  }), [user, loading]); // Dependency array for useMemo

    if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-dark-bg">
        <Loader size="h-12 w-12" />
      </div>
    );
  }

  // 4. Return the Provider with the value
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Create the custom hook for easy access to the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    // This error is helpful for debugging to ensure components are wrapped by the provider
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};