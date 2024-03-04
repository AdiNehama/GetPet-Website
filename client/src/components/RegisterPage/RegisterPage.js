import React, {useState} from 'react';
import { useGoogleOAuth } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import profile from '../../assets/images/user-default-96.png';
import './RegisterPage.css';


const RegisterPage = () => {

  const { signup } = useGoogleOAuth();

  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [phone, setPhone]= useState('');
  const [ConfirmPassword, setComfirmPassword] = useState('');
   
  const handelChangeName = (name) => {setName(name.target.value);};
  const handleChangeEmail = (email) => {setEmail(email.target.value);};
  const handleChangePassword = (password) => {setPassword(password.target.value);};
  const handleChangePhone = (phone) =>{setPhone(phone.target.value);};
  const handleChangeConfirmPassword = (ConfirmPassword) =>{setComfirmPassword(ConfirmPassword.target.value);};

  const handleRegisterWithEmail = () => {
    // Implement email/password registration logic here
    console.log("Registering with email and password...");
  };

  const handleRegisterWithGoogle = () => {
    // Implement Google registration logic here
    console.log("Registering with Google...");
  };

  const [imgSrc, setImageSrc] = useState(''); // State for the image source

  const imgSelected = (event) => {
    console.log(event.target.files[0]);
    setImageSrc(event.target.files[0]);
  }

  return (
    <div className="register-page">
      <div className="glass-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegisterWithEmail}>
          <img src={imgSrc? imgSrc : profile} alt='' className='profileImg' />
          <label htmlFor='file' className='selectImgBtn'>Select Image</label>
          <input id="file" type="file"  onChange={imgSelected} style={{opacity: 0}}></input>
          <input  className='name-input' type="text" onChange={handelChangeName} value={name} placeholder="Name" required />
          <input className='email-register' type="email" onChange={handleChangeEmail} value={email} placeholder="Email" required />
          <input className='tel-register' type="tel" onChange={handleChangePhone} value={phone} placeholder="Phone Number" required />
          <input className='password-register' type="password" onChange={handleChangePassword} value={password} placeholder="Password" required />
          <input className='confirm-register' type="password" onChange={handleChangeConfirmPassword} value={ConfirmPassword} placeholder="Confirm Password" required />
          <button className='register-btn' type="register">Submit</button>
        </form>
        <div className="or-text-register">
          <span>or</span>
        </div>
        <div className="google-sign-up">
          <span>Sign up with Google</span>
          <IconButton sx={{width: 'fit-content'}}><GoogleIcon/></IconButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
