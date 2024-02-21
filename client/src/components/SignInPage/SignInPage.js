// SignInPage.js
import React from 'react';
import './SignInPage.css';
import googleIcon from '../../assets/images/googleIcon.png'; 
import IconButton from '@material-ui/core/IconButton';

const SignInPage = () => {
  const handleSignInWithEmail = () => {
    // Implement email/password sign-in logic here
    console.log("Signing in with email and password...");
  };

  const handleSignInWithGoogle = () => {
    // Implement Google sign-in logic here
    console.log("Signing in with Google...");
  };

  return (
    <div className="sign-in-page">
      <div className="glass-container-sign-in">
        <h2>Sign In</h2>
        <form className="sign-in-form" onSubmit={handleSignInWithEmail}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
        <div className="or-text">
          <span>or</span>
        </div>
        <div className="google-sign-in">
          <span>Sign in with Google</span>
          <IconButton onClick={handleSignInWithGoogle} aria-label="Google">
            <img src={googleIcon} alt="Google" />
          </IconButton>
        </div>
        <p className="account-question">Don't have an account? <a  className="register-link" href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default SignInPage;
