import React, { useState } from 'react';
import API from '../api';
import './Login.css';

function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  const register = async () => {
    try {
      await API.post('/auth/register', { email, password });
      alert("Registered! Now login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">Welcome Back</h2>

        <input
          className="login-input"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={login}>
          Login
        </button>

        <button className="register-btn" onClick={register}>
          Register
        </button>

      </div>
    </div>
  );
}

export default Login;