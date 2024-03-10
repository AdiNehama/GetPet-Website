import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import postImage from '../../assets/images/default-post.jpeg'
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './EditPost.css';




const EditPost = (props) => {
  const myLocation = useLocation();
  const navigate = useNavigate();
  const path = myLocation.pathname.split('/');
  const postId = path[path.length - 1];
  const cookies = new Cookies();

  //const use state to each filed
  const [kind, setKind] = useState();
  const [birthDate, setBirthDate] = useState();
  const [about, setAbout] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [ownerName, setOwnerName] = useState();
  const [imgSrc, setImgSrc] = useState();


  useEffect(() => {
    console.log(cookies.get('access_token'));
    fetch(`http://localhost:8080/posts/postbyid/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `JWT ${cookies.get('access_token')}`
      }
    }).then((res) => res.json())
      .then((data) => {
        const { ownerName, image, kind, birthDate, about, phone, location } = data.post;
        setKind(kind);
        setBirthDate(birthDate);
        setAbout(about);
        setPhone(phone);
        setLocation(location);
        setOwnerName(ownerName);
        setImgSrc(image);
      });
  }, []);

  const imgSelected = (event) => {
    console.log(event.target.files[0]);
    setImgSrc(URL.createObjectURL(event.target.files[0]));
  }
  const handleEditInfo = (event) => {
    event.preventDefault(); // Prevent default form submission
    fetch(`http://localhost:8080/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `JWT ${cookies.get('access_token')}`
      },
      body: JSON.stringify({
        kind,
        birthDate,
        about,
        phone,
        location,
        ownerName,
        image: imgSrc
      })
    }).then((res) => res.json())
      .then(() => {
        console.log("updated post");
        navigate('/myposts')
      });

  };

  const handelUploadPostImage = () => {
   
  };
  const handleKindChange = (event) => {
    setKind(event.target.value);
  };
  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value);
  };
  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
  };
  

  return (
    <div className="edit-page">
      <div className="glass-container">
        <h2>Edit Your Post</h2>
        <form className="edit-form" onSubmit={handleEditInfo}>
          <img src={imgSrc ? imgSrc : postImage} alt='' className='postImg' />
          <span>edit post image</span>
          <IconButton
            component="label"
            htmlFor="file"
            className="selectImgBtn"
            onClick={handelUploadPostImage}
          >
            <AddPhotoAlternateIcon />
          </IconButton>
          <input id="file" type="file" onChange={imgSelected} style={{ opacity: 0 }}></input>
          <input className='edit-input' type="text" onChange={handleKindChange} value={kind} placeholder="kind" required />
          <input className='edit-input' type="text" onChange={handleBirthDateChange} value={birthDate} placeholder="birth date" required />
          <input className='edit-input' type="text" onChange={handleAboutChange} value={about} placeholder="about" required />
          <input className='edit-input' type="tel" onChange={handlePhoneChange} value={phone} placeholder="phone" required />
          <input className='edit-input' type="text" onChange={handleLocationChange} value={location} placeholder="location" required />
          <input className='edit-input' type="text" onChange={handleOwnerNameChange} value={ownerName} placeholder="ownerName" required />
          <button className='submit-btn' type="submit">Submit Change</button>
        </form>

      </div>
    </div>
  );

}


export default EditPost;