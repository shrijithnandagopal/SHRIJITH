// src/components/Dashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Adjust path as needed

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.displayName || 'User'}!</h1>
      <p>Your email is {user.email}</p>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
