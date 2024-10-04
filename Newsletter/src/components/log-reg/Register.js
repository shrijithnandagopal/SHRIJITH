import React, { useState } from 'react';
import { auth } from './firebase';  
import { createUserWithEmailAndPassword } from 'firebase/auth';  
import { db } from './firebase';  
import { doc, setDoc } from 'firebase/firestore';  

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        firstName,
        lastName,
        email,
      });

      window.location.href = '/login';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{
      maxWidth: '450px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    }}>
      <h2 style={{ marginBottom: '20px', color: '#1a73e8' }}>Create a DEV@Deakin Account</h2>
      {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="text"
          placeholder="Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            margin: '10px 0',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px',
        }}>
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
