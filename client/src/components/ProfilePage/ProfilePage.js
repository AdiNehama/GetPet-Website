import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import profile from '../../assets/images/user-default-96.png';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [imgSrc, setImageSrc] = useState('');
  const [user, setUser] = useState({
    _id: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      console.error('Password and Confirm Password do not match');
      // Optionally, provide feedback to the user
      return;
    }

    try {
      const formData = new FormData();
      formData.append('_id', user._id);
      formData.append('name', user.name);
      formData.append('phone', user.phone);
      formData.append('password', user.password);
      
      if (user.image) {
        formData.append('image', user.image);
      }

      const response = await axios.post('/api/user/update-profile', formData, { withCredentials: true });

      console.log('Changes saved successfully!', response.data);
      // Optionally, provide feedback to the user
    } catch (error) {
      console.error('Error saving changes:', error.message);
      // Optionally, provide feedback to the user
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSrc(URL.createObjectURL(file));
    setUser(prevUser => ({ ...prevUser, image: file }));
  };

  const handleClick = () => {
    navigate('/myposts');
  };

  return (
    <div className="profile-page">
      <div className="glass-container-profile">
        <h1>Profile</h1>
        <div className="profile-options">
          <img src={imgSrc || profile} alt='' className='preview-img' />
          <span>Select profile image</span>
          <IconButton
            component="label"
            htmlFor="file"
            className="select-img-btn"
          >
            <AddPhotoAlternateIcon />
          </IconButton>
          <input id="file" type="file" onChange={handleImageChange} style={{ opacity: 0 }} />
          {user.image && <img src={URL.createObjectURL(user.image)} alt="Profile Preview" className="preview-img" />}
          <button onClick={handleClick}>My Posts</button>
          <button onClick={() => { /* Navigate to "Upload a Pet" page */ }}>Upload a Pet</button>
        </div>
        <form onSubmit={handleSaveChanges}>
          <div className="profile-details">
            <input
              className='username-input'
              type="text"
              name='username'
              placeholder="Username"
              value={user.name}
              onChange={(e) => setUser(prevUser => ({ ...prevUser, name: e.target.value }))}
            />
            <input
              className='phone-input'
              type="tel"
              name='phone'
              placeholder="Phone Number"
              value={user.phone}
              onChange={(e) => setUser(prevUser => ({ ...prevUser, phone: e.target.value }))}
            />
            <input
              className='password-input'
              type="password"
              name='password'
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser(prevUser => ({ ...prevUser, password: e.target.value }))}
            />
            <input
              className='confirm-password-input'
              type="password"
              name='confirmPassword'
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e) => setUser(prevUser => ({ ...prevUser, confirmPassword: e.target.value }))}
            />
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;