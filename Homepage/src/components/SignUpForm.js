import React from 'react';

function SignUpForm() {
  return (
    <div className="signup-box">
      <h2>SIGN UP FOR OUR DAILY INSIDER</h2>
      <input type="email" placeholder="Enter your email" />
      <button type="submit">Sign Up</button>
      
      {/* Explore Box */}
      <div className="explore-box">
        <h3>Explore More</h3>
        <p>Discover articles, tutorials, and resources to enhance your learning experience.</p>
        <button>Explore Now</button>
      </div>
    </div>
  );
}

export default SignUpForm;
