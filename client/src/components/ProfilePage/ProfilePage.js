import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import './ProfilePage.css';
import profile from '../../assets/images/user-default-96.png';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const port = process.env.REACT_APP_SERVER_PORT;
  const cookies = new Cookies();
  const userId = localStorage.user_id;
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch(`${serverUrl}:${port}/users/${userId}`, {
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
        if(imageUrl!== image){
          setImage(imageUrl);
        }
        else{
          setImage(data.image);
        }
      }).catch((err) => {
        toast("failed to retrieve user data")
      });
  }, []);


  const onEditButtonClick = async (event) => {
    navigate('/editprofile')

  };



  const handleMyPostBtn = () => {
    navigate('/myposts');
  };

  return (
    <div className="profile-page">
      <div className="glass-container-profile">
        <h1>Profile</h1>
        <div className="profile-options">
          <img src={image ? image : profile} alt='' className='preview-img' />
          <button className='my-posts-btn' onClick={handleMyPostBtn}>My Posts</button>
          <button className='edit-post-btn' onClick={() => {
            navigate('/upload')
          }}>Upload new post</button>
        </div>
        <form >
          <div >
            <div className="profile-details">{name}</div>
            <div className="profile-details">{email}</div>
            <div className="profile-details">{phone}</div>
            <div className="edit-profile">
              <span>edit your profile</span>
            </div>
            <IconButton variant="primary" onClick={onEditButtonClick}><EditIcon /></IconButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;