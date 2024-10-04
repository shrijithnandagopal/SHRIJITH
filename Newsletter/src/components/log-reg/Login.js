import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Redirect to a different page or handle login success
      window.location.href = '/dashboard';  // Redirect to dashboard or another page
    } catch (error) {
      setError(error.message);  // Display error message
      console.error('Error logging in:', error.message);  // Log error
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="email" style={{ fontSize: '14px', textAlign: 'left', marginBottom: '5px' }}>Your email</label>
        <input
          type="email"
          id="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }}
        />
        <label htmlFor="password" style={{ fontSize: '14px', textAlign: 'left', marginBottom: '5px' }}>Your password</label>
        <input
          type="password"
          id="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Don't have an account? <a href="/register" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up</a>
      </p>
    </div>
  );
};

export default Login;
