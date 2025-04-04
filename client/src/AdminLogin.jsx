import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering
      ? 'http://localhost:8000/api/register'
      : 'http://localhost:8000/api/login';

    try {
      const res = await axios.post(url, { email, password });
      toast.success(res.data.message, { position: 'top-right' });

      setEmail('');
      setPassword('');
      setError('');

      if (!isRegistering) {
        localStorage.setItem('adminEmail', res.data.admin.email);
        navigate('/getuser');
      } else {
        setIsRegistering(false); // Switch to login view after registration
      }
    } catch (err) {
      console.error('Login Error: ', err);
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
    }
  };

  return (
    <div className="auth">
      <h3>{isRegistering ? 'Admin Registration' : 'Admin Login'}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="authForm">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            {isRegistering ? 'Register' : 'Login'}
          </button>
        </div>
      </form>

      <p style={{ marginTop: '15px' }}>
        {isRegistering ? 'Already have an account?' : 'Need to register?'}
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
            setEmail('');
            setPassword('');
          }}
          style={{
            marginLeft: '5px',
            background: 'none',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
          }}
        >
          {isRegistering ? 'Login here' : 'Register here'}
        </button>
      </p>
    </div>
  );
};

export default AdminLogin;
