import React from 'react';
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './MyPostsCard.css';

function PostCard(props) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const onEditButtonClick = () => {
    navigate('/editpost/' + props.id)
  }
  const onButtonDeleteChange = () => {

    fetch(`http://localhost:8080/posts/${props.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application',
        'authorization': `JWT ${cookies.get('access_token')}`
      }
    }).then((res) => res.json())
      .then(() => {
        console.log("Successfully deleted");
        window.location.reload();
      });
  }

  const age = new Date().getFullYear() - new Date(props.birthDate).getFullYear();

  return (
    <Card className="post-Card" style={{ width: '18rem', marginTop: '20px' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title></Card.Title>
        <Card.Text>
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
        </Card.Text>
        <IconButton variant="primary" onClick={onEditButtonClick}><EditIcon /></IconButton>
        <IconButton variant="primary" onClick={onButtonDeleteChange}><DeleteIcon /></IconButton>
      </Card.Body>
    </Card>
  );
}

export default PostCard;