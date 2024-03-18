import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { fetcher } from '../../services/fetcher';
import { toast } from 'react-toastify';
import './EditProfile.css'

const EditProfile = () => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const port = process.env.REACT_APP_SERVER_PORT;
  const cookies = new Cookies();
  const userId = localStorage.user_id;
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  useEffect(() => {
    const cookies = new Cookies();
    fetcher(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `JWT ${cookies.get('access_token')}`
      }
    }).then((res) => res.json())
      .then((data) => {
        const { name, email, phone } = data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        const imageUrl = `${serverUrl}:${port}/images/${data.image}`;
        if(imageUrl === previewImg){
          setImage(imageUrl);
          setPreviewImg(imageUrl);
        }
        else{
          setImage(data.image);
          setPreviewImg(data.image);
        }
      }).catch((err) => {
        toast("failed to retrieve user data")
      });
  }, []);

  const handelUploadProfileImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    fetch(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/files`, {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
      .then((data) => {
        setImage(data.imageName);
        const imageUrl = `${serverUrl}:${port}/images/${data.imageName}`;
        setPreviewImg(imageUrl);
        toast("image uploaded successfully")
      })
      .catch(err => {
        console.log(err);
        toast('failed to upload image')
      });
  };

  const imgSelected = (event) => {
    setPreviewImg(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  const handleConfirmedPasswordChange = (event) => {
    setConfirmedPassword(event.target.value);
  }


  const handleEditInfo = (event) => {
    event.preventDefault(); // Prevent default form submission
    fetcher(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_SERVER_PORT}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `JWT ${cookies.get('access_token')}`
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        confirmedPassword,
        image: image
      })
    }).then((res) => res.json())
      .then(() => {
        navigate('/profile')
      }).catch((err) => {
        toast("failed to update user data")
      });
  }

  return (
    <div className="edit-profile-page">
      <div className="glass-container-editprofile">
        <h2>Edit Your Profile</h2>
        <form className="edit-form" onSubmit={handleEditInfo}>
          <img src={previewImg} alt='' className='profileImg' />
          <span>edit post image</span>
          <span>first select new image then click on the icon</span>
          <IconButton
            component="label"
            htmlFor="file"
            className="selectImgBtn"
            onClick={handelUploadProfileImage}
          >
            <AddPhotoAlternateIcon />
          </IconButton>
          <input id="file" type="file" accept='image/*' onChange={imgSelected} ></input>
          <input className='edit-input-profile' type="text" onChange={handleNameChange} value={name} placeholder="name" required />
          <input className='edit-input-profile' type="text" onChange={handleEmailChange} value={email} placeholder="email" required />
          <input className='edit-input-profile' type="text" onChange={handlePhoneChange} value={phone} placeholder="phone" required />
          <input className='edit-input-profile' type="password" onChange={handlePasswordChange} value={password} placeholder="password"  />
          <input className='edit-input-profile' type="password" onChange={handleConfirmedPasswordChange} value={confirmedPassword} placeholder="Confirmed Password" />
          <button className='submit-btn-profile' type="submit">submit changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;