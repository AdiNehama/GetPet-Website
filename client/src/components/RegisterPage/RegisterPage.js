import React from 'react';
import './RegisterPage.css';
import googleIcon from '../../assets/images/googleIcon.png'; 
import IconButton from '@material-ui/core/IconButton';

const RegisterPage = () => {
  const handleRegisterWithEmail = () => {
    // Implement email/password registration logic here
    console.log("Registering with email and password...");
  };

  const handleRegisterWithGoogle = () => {
    // Implement Google registration logic here
    console.log("Registering with Google...");
  };

  return (
    <div className="register-page">
      <div className="glass-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegisterWithEmail}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="register">Submit</button>
        </form>
        <div className="or-text-register">
          <span>or</span>
        </div>
        <div className="google-sign-up">
          <span>Sign up with Google</span>
          <IconButton onClick={handleRegisterWithGoogle} aria-label="Google">
            <img src={googleIcon} alt="Google" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
