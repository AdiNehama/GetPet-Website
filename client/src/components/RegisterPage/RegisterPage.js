import React, {useState} from 'react';
import { useGoogleOAuth } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import profile from '../../assets/images/user-default-96.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';


const RegisterPage = () => {
  const navigate = useNavigate();

  const { signup } = useGoogleOAuth();

  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [phone, setPhone]= useState('');
  const [ConfirmPassword, setComfirmPassword] = useState('');
  const [imgSrc, setImageSrc] = useState(''); // State for the image source

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
   
  const handelChangeName = (name) => {setName(name.target.value);};
  const handleChangeEmail = (email) => {setEmail(email.target.value);};
  const handleChangePassword = (password) => {setPassword(password.target.value);};
  const handleChangePhone = (phone) =>{setPhone(phone.target.value);};
  const handleChangeConfirmPassword = (ConfirmPassword) =>{setComfirmPassword(ConfirmPassword.target.value);};

  const handleRegisterWithEmail = async(event) => {
    // Register
    event.preventDefault();
     // Form validation
     if (!name || !email || !password || !phone || !ConfirmPassword || !imgSrc ) {
      console.log('All fields are required');
      return;
    }
    if (password !== ConfirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    if(phone.length !== 10) {
      console.log('Phone number is too short or too long');
      return;
    }
    if (password.length < 6) {
      console.log('Password is too short');
      return;
    }
    if(!isValidEmail(email)) {
      console.log('Invalid email format');
      return;
    }
    

     // Create form data to send to the server
     const formData = {
      "email": email,
      "password": password,
      'confirmPassword': ConfirmPassword,
      'name': name,
      'phone': phone,
      'image': imgSrc
     }

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle server response
      if(response.ok){
        console.log('User created successfully');
        navigate('/home');
        
      }
    } catch (error) {
      console.error(error);
    }
  };

 

  const handleRegisterWithGoogle = () => {
    // Implement Google registration logic here
    console.log("Registering with Google...");
  };
  const handelUploadProfileImage = () => {
    
  };

  

  const imgSelected = (event) => {
    console.log(event.target.files[0]);
    setImageSrc(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <div className="register-page">
      <div className="glass-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegisterWithEmail}>
          <img src={imgSrc? imgSrc : profile} alt='' className='profileImg' />
          <span>Select profile image</span>
          <IconButton
            component="label"
            htmlFor="file"
            className="selectImgBtn"
            onClick={handelUploadProfileImage}
        >
            <AddPhotoAlternateIcon />
        </IconButton>
          <input id="file" type="file"  onChange={imgSelected} style={{opacity: 0}}></input>
          <input  className='name-input' type="text" onChange={handelChangeName} value={name} placeholder="Name" required />
          <input className='email-register' type="email" onChange={handleChangeEmail} value={email} placeholder="Email" required />
          <input className='tel-register' type="tel" onChange={handleChangePhone} value={phone} placeholder="Phone Number" required />
          <input className='password-register' type="password" onChange={handleChangePassword} value={password} placeholder="Password" required />
          <input className='confirm-register' type="password" onChange={handleChangeConfirmPassword} value={ConfirmPassword} placeholder="Confirm Password" required />
          <button className='register-btn' type="submit">Submit</button>
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
