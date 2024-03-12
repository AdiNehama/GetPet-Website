// src/components/UploadPetPage.js
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Cookies from 'universal-cookie';
import defaultPostImage from '../../assets/images/dog-shadow.jpg'
import './UploadPostPage.css';

function UploadPostPage() {
  const cookies = new Cookies();
  const userId = localStorage.user_id;
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [kind, setKind] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [about, setAbout] = useState('');
  const [phone, setPhone] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [location, setLocation] = useState('');

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  const imgSelected = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  const handleChangeKind = (event) => {
    setKind(event.target.value);
  }

  const handleChangeBirthDate = (event) => {
    setBirthDate(event.target.value);
  }

  const handleChangeAbout = (event) => {
    setAbout(event.target.value);
  }

  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  }

  const handleChangeOwnerName = (event) => {
    setOwnerName(event.target.value);
  }

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  }

  const handleUploadPostImage = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);
    fetch('http://localhost:8080/files', {
      method: 'POST',
      body: formData
    }).then((res) => res.json())
      .then((data) => {
        setImage(data.path);
      })
      .catch(err => {
        console.log(err)
      });
  }

  const handleUpload = async (event) => {
    event.preventDefault();
    if (phone.length !== 10) {
      return;
    }
    if (!image || !kind || !birthDate || !about || !phone || !ownerName || !location) {
      return;
    }
    if (!dateRegex.test(birthDate)) {
      return;
    }
    const postData = {
      "image": image,
      "userId": userId,
      "kind": kind,
      "birthDate": birthDate,
      "about": about,
      "phone": phone,
      "ownerName": ownerName,
      "location": location
    }
    console.log(postData);
    try {
      const response = await fetch('http://localhost:8080/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `JWT ${cookies.get('access_token')}`
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        navigate("/myposts")
      }
    } catch (error) {

    }
  }

  return (
    <div className="upload-post-container">
      <form className="upload-form" onSubmit={handleUpload}>
        <h1 className='uploadTitle'> Upload A Pet</h1>
        <img src={image ? image : defaultPostImage} alt='' className='postImage' />
        <span>Select your dog image</span>
        <IconButton
          component="label"
          htmlFor="file"
          className="selectImgBtn"
          onClick={handleUploadPostImage}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
        <input id="file" type="file" onChange={imgSelected} ></input>
        <input className='kind-input' type="text" onChange={handleChangeKind} value={kind} placeholder="Kind" required />
        <input className='birthDate-input' type="text" onChange={handleChangeBirthDate} value={birthDate} placeholder="Birth Date DD/MM/YYYY" required />
        <input className='about-input' type="text" onChange={handleChangeAbout} value={about} placeholder="About" required />
        <input className='phone-input' type="text" onChange={handleChangePhone} value={phone} placeholder="Phone Number" required />
        <input className='ownerName-input' type="text" onChange={handleChangeOwnerName} value={ownerName} placeholder="Owner Name" required />
        <input className='location-input' type="text" onChange={handleChangeLocation} value={location} placeholder="Location" required />
        <button className='uploadAPost-btn' type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadPostPage;