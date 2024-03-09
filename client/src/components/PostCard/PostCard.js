import React from 'react';
import Card from 'react-bootstrap/Card';
import ChatIcon from '@mui/icons-material/Chat';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import './PostCard.css';

function PostCard(props) {
  const navigate = useNavigate();
  const age = new Date().getFullYear() - new Date(props.birthDate).getFullYear();
  const handleClick = () => {
    navigate('/chat');
  };

  return (
    <Card className="post-Card" style={{ width: '18rem', marginTop: '20px' }}>
      <Card.Img variant="top" src={props.image}/>
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
        </Card.Text>
        <IconButton variant="primary" onClick={handleClick}><ChatIcon/></IconButton>
      </Card.Body>
    </Card>
  );
}

export default PostCard;