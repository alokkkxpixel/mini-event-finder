import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the hook
import api from '../utils/api'; // Your component imports and uses the api
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  // Get the state-setting functions from the context
  const { setUser, setLoading, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // You control the loading state now

    try {
      // 1. Make the API call yourself
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, { email, password });


      if(response && response.data?.User){

        console.log("user login success",response.data?.User)
        localStorage.setItem("token", response.data.token)
        setUser(response.data?.User)
      }
      
      // 2. Get user data (assuming your login returns user data or you make another call)
      // For this example, let's assume login doesn't return user, so we fetch it from '/me'
 
      // const userResponse = await api.get('/auth/me');

      // // 3. Update the global state using the function from the context
      // setUser(userResponse.data.data);

      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
      setUser(null); // Ensure user is null on failure
      localStorage.removeItem('token');
    } finally {
      setLoading(false); // You control the loading state
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#A0A0A0]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#A0A0A0]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4718cb] hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {loading ? <Loader /> : 'Sign In'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-[#A0A0A0]">
          Not a member?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-purple-400">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;