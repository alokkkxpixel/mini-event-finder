import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import { CheckCircle, XCircle } from 'lucide-react';

const PasswordRequirement = ({ meets, text }) => (
  <li className={`flex items-center ${meets ? 'text-green-400' : 'text-red-400'}`}>
    {meets ? <CheckCircle className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2" />}
    {text}
  </li>
);

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const passwordReqs = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const allReqsMet = Object.values(passwordReqs).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allReqsMet) {
      alert("Password does not meet requirements.");
      return;
    }
    const success = await register(fullname, email, password);
    if (success) {
      navigate('/login');
    }
  };
  
  useEffect(() => {
    if (password) {
      setPasswordVisible(true);
    }
  }, [password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <div className="w-full max-w-md bg-light-bg rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary">Full Name</label>
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-dark-bg border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="••••••••"
            />
          </div>
          {passwordVisible && (
            <ul className="text-xs text-gray-400 space-y-1">
              <PasswordRequirement meets={passwordReqs.length} text="At least 8 characters" />
              <PasswordRequirement meets={passwordReqs.uppercase} text="At least one uppercase letter" />
              <PasswordRequirement meets={passwordReqs.number} text="At least one number" />
            </ul>
          )}
          <div>
            <button
              type="submit"
              disabled={loading || !allReqsMet}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {loading ? <Loader /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-text-secondary">
          Already a member?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-purple-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;