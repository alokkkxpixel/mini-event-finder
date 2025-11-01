import React, { createContext, useState, useContext } from 'react';

// 1. Create the context with a default value of null
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // A general loading state you control

  // 3. Define the value to be passed down
  const value = {
    user,          // The current user object or null
    setUser,       // Function to update the user state
    loading,       // The current loading state
    setLoading,    // Function to update the loading state
    isAuthenticated: !!user, // A boolean flag for convenience
  };

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