import React from 'react';
import FeaturedArticles from './components/FeaturedArticles';
import FeaturedTutorials from './components/FeaturedTutorials';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="App">
      <h1>DEV@Deakin Web Application</h1>
      <FeaturedArticles />
      <FeaturedTutorials />
      <SignUpForm />    
    </div>
  );
}

export default App;