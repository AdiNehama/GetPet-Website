// SignInPage.js
import React, {useState} from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import './SignInPage.css';



const SignInPage = () => {

  const login = useGoogleLogin({
    onSuccess: () => {console.log('Success')}
  })
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const handleSignInWithEmail = () => {
    // Implement email/password sign-in logic here
    console.log("Signing in with email and password...");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value); 
  }

  const handleChangePassword = (event) =>{
    setPassword(event.target.value);
  }

  const handleSignInWithGoogle = () => {
    // Implement Google sign-in logic here
    console.log("Signing in with Google...");
  };

  return (
    <div className="sign-in-page">
      <div className="glass-container-sign-in">
        <h2>Sign In</h2>
        <form className="sign-in-form" onSubmit={handleSignInWithEmail}>
          <input  className="email-input" onChange={handleChangeEmail} value={email} type="email" placeholder="Email" required />
          <input className="password-input" onChange={handleChangePassword} value={password} type="password" placeholder="Password" required />
          <button className="sign-in-btn" type="submit">Sign In</button>
        </form>
        <div className="or-text">
          <span>or</span>
        </div>
        <div className="google-sign-in">
          <div className="google-header"  >Sign In With Google</div>
          <IconButton sx={{width: 'fit-content'}}  onClick={login}><GoogleIcon/></IconButton>
        </div>
        <p className="account-question">Don't have an account? <a className="register-link" href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default SignInPage;
