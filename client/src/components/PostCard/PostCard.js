import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import './PostCard.css';

function PostCard(props) {
  const [image, setImage] = useState('');
  const [allImages, setAllImages] = useState('');
  const navigate = useNavigate();
  const dateArr = props.birthDate.split('/');
  const date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  const age = new Date().getFullYear() - date.getFullYear();

  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <Card className="post-Card" style={{ width: '18rem', marginTop: '20px' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text as="div">
          <div className="post_info">
            <span>
              Kind:
            </span>
            {props.kind}
          </div>
          <div className="post_info">
            <span>
              Age:
            </span>
            {age}
          </div>
          <div className="post_info">
            <span>
              About:
            </span>
            {props.about}
          </div>
          <div className="post_info">
            <span>
              Phone:
            </span>
            {props.phone}
          </div>
          <div className="post_info">
            <span>
              Location:
            </span>
            {props.location}
          </div>
          <div className="post_info">
            <span>
              Owner Name:
            </span>
            {props.ownerName}
          </div>
          <div className="post_info">
            <span>
              Good with children:
            </span>
            {props.goodWithChildren} / 5
          </div>
        </Card.Text>
        <IconButton variant="primary" onClick={handleClick}><ChatIcon /></IconButton>
      </Card.Body>
    </Card>
  );
}

export default PostCard;