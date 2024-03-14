// SignInPage.js
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import './SignInPage.css';

const SignInPage = (props) => {
  const navigate = useNavigate();
  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_port = process.env.REACT_APP_SERVER_PORT;

  const login = useGoogleLogin({
    onSuccess: () => { console.log('Success') }
  })
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSignInWithEmail = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast("please enter your email and password")
      return;
    }

    try {
      const user = {
        'email': email,
        'password': password
      }
      const loginResponse = await fetch(`${server_url}:${server_port}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await loginResponse.json();
      if (loginResponse.ok) {
        const cookies = new Cookies();
        cookies.set('access_token', data.accessToken);
        localStorage.setItem('refresh_token', data.refreshToken);
        localStorage.setItem('user_id', data.userId);
        props.setIsUserLoggedIn(true);
        navigate('/home');
      }

    } catch (error) {
      console.error('login error:', error);
      toast("Failed to login, please try again later.")
    }
  };


  // const handleSignInWithGoogle = () => {
  //   // Implement Google sign-in logic here
  //   console.log("Signing in with Google...");
  // };

  return (
    <div className="sign-in-page">
      <div className="glass-container-sign-in">
        <h2>Sign In</h2>
        <form className="sign-in-form" onSubmit={handleSignInWithEmail}>
          <input name="email" className="email-input" onChange={handleChangeEmail} value={email} type="email" placeholder="Email" required />
          <input name="password" className="password-input" onChange={handleChangePassword} value={password} type="password" placeholder="Password" required />
          <button className="sign-in-btn" type="submit">Sign In</button>
        </form>
        <div className="or-text">
          <span>or</span>
        </div>
        <div className="google-sign-in">
          <div className="google-header"  >Sign In With Google</div>
          <IconButton sx={{ width: 'fit-content' }} onClick={login}><GoogleIcon /></IconButton>
        </div>
        <p className="account-question">Don't have an account? <a className="register-link" href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default SignInPage;
