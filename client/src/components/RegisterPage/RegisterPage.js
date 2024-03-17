import React, { useState } from 'react';
// import { useGoogleOAuth } from '@react-oauth/google';
import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import profile from '../../assets/images/user-default-96.png';
import PublishIcon from '@mui/icons-material/Publish';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './RegisterPage.css';

const RegisterPage = () => {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const port = process.env.REACT_APP_SERVER_PORT;

  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState('');
  // const { signup } = useGoogleOAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [ConfirmPassword, setComfirmPassword] = useState('');
  const [image, setImage] = useState(''); // State for the image source

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handelChangeName = (name) => { setName(name.target.value); };
  const handleChangeEmail = (email) => { setEmail(email.target.value); };
  const handleChangePassword = (password) => { setPassword(password.target.value); };
  const handleChangePhone = (phone) => { setPhone(phone.target.value); };
  const handleChangeConfirmPassword = (ConfirmPassword) => { setComfirmPassword(ConfirmPassword.target.value); };

  const handleRegisterWithEmail = async (event) => {
    // Register
    event.preventDefault();
    // Form validation
    if (!name || !email || !password || !phone || !ConfirmPassword || !image) {
      toast("please fill all the fields")
      return;
    }
    if (password !== ConfirmPassword) {
      toast("passwords don't match")
      return;
    }
    if (phone.length !== 10) {
      toast("please enter a valid phone number")
      return;
    }
    if (password.length < 6) {
      toast("password must be at least 6 characters")
      return;
    }
    if (!isValidEmail(email)) {
      toast("please enter a valid email")
      return;
    }

    // Create form data to send to the server
    const formData = {
      "email": email,
      "password": password,
      'confirmPassword': ConfirmPassword,
      'name': name,
      'phone': phone,
      'image': image
    }

    try {
      const response = await fetch(`${serverUrl}:${port}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/signin');

      }
    } catch (error) {
      console.error(error);
      toast("Failed to register, please try again later.")
    }
  };


  // const handleRegisterWithGoogle = () => {
  //   // Implement Google registration logic here
  //   console.log("Registering with Google...");
  // };

  const handelUploadProfileImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    fetch(`${serverUrl}:${port}/files`, {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
      .then((data) => {
        setImage(data.imageName);
        toast("image uploaded successfully")
      })
      .catch(err => {
        console.log(err);
        toast("failed to upload image")
      });
  };

  const imgSelected = (event) => {
    setImage(event.target.files[0]);
    setImgPreview(URL.createObjectURL(event.target.files[0]));
  }

  return (
    <div className="register-page">
      <div className="glass-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleRegisterWithEmail}>
          <img src={imgPreview ? imgPreview : profile} alt='' className='profileImg' />
          <span>Select profile image</span>
          <span>first select file then click on the icon</span>
          <IconButton
            component="label"
            htmlFor="file"
            className="selectImgBtn"
            onClick={handelUploadProfileImage}
          >
            <PublishIcon />
          </IconButton>
          <input id="file" className='edit-image' type="file" accept='image/*' onChange={imgSelected} ></input>
          <input className='name-input' type="text" onChange={handelChangeName} value={name} placeholder="Name" required />
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
          <IconButton sx={{ width: 'fit-content' }}><GoogleIcon /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;