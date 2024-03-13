import React from 'react';
import Card from 'react-bootstrap/Card';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './MyPostsCard.css';

function MyPostCard(props) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const port = process.env.REACT_APP_SERVER_PORT;
  const navigate = useNavigate();
  const cookies = new Cookies();
  const imageUrl= `${serverUrl}:${port}/images/${props.image}`

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
        window.location.reload();
      });
  }
  const dateArr = props.birthDate.split('/');
  const date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]);
  const age = new Date().getFullYear() - date.getFullYear();

  return (
    <Card className="post-Card" style={{ width: '18rem', marginTop: '20px' }}>
      <Card.Img className='my-post-card-img' variant="top" src={imageUrl} />
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

export default MyPostCard;