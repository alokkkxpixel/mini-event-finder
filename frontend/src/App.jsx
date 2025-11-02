import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvent';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import EventDetails from './components/EventDetails';
import axios from 'axios';

// A wrapper for routes that require authentication
const ProtectedRoute =  ({ children }) => {
 const { user, setUser,isAuthenticated } = useAuth();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    const fetchData = async () => {
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
        isAuthenticated === true
      } catch (error) {
        console.error("Auth error:", error);
        localStorage.removeItem("token");
        isAuthenticated === false
        window.location.href = "/login";
      }
    };

    if (!user) fetchData();
  }, [token]); // only run on mount or token change


  return children;
};

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/event/:eventId" element={<EventDetails />} />

          {/* Protected Routes */}
          <Route 
            path="/create-event" 
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-events" 
            element={
              <ProtectedRoute>
                <MyEvents />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;