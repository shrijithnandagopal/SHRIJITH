import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import AuthProvider, { useAuth } from './components/log-reg/contexts/AuthContext'; 
import Login from './components/log-reg/Login';
import Register from './components/log-reg/Register';
import Dashboard from './components/log-reg/Dashboard';
import NewPostPage from './components/newpostpage/NewPostPage';
import FeaturedArticles from './components/homepage/FeaturedArticles';


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Routes>
            {/* Homepage Route */}
            <Route path="/" element={<Homepage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/newpost" 
              element={
                <PrivateRoute>
                  <NewPostPage />
                </PrivateRoute>
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
};


const Homepage = () => {
  return (
    <div className="App">
      <h1>DEV@Deakin Web Application</h1>
      <FeaturedArticles />
    </div>
  );
};

export default App;
