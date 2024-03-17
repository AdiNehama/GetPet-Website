import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetcher } from '../../services/fetcher';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Comments.css';

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const userId = localStorage.user_id;
    const myLocation = useLocation();
    const path = myLocation.pathname.split('/');
    const postId = path[path.length - 1];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}-${month}-${year}`;
    const serverPort = process.env.REACT_APP_SERVER_PORT;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const handleInputChange = (event) => {
        setNewComment(event.target.value);
    }

    const handlePostComment = () => {
        const cookies = new Cookies();
        fetcher(`${serverUrl}:${serverPort}/posts/addcomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `JWT ${cookies.get('access_token')}`
            },
            body: JSON.stringify({ userId, currentDate, content: newComment, postId })
        }).then((res) => res.json())
            .then((data) => {
                setComments(data.Comments || []);
                setNewComment('');
                window.location.reload();
                toast('success');
            }).catch((err) => {
                toast("failed to post comment");
            });

    }


    useEffect(() => {
        const cookies = new Cookies();
        fetcher(`${serverUrl}:${serverPort}/posts/postbyid/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `JWT ${cookies.get('access_token')}`
            }
        }).then((res) => res.json())
            .then((data) => {
                setComments(data.post.comments || []);
                toast('success');
            }).catch((err) => {
                toast("failed to retrieve comments");
            });
    }, []);

    return (
        <div className='comment-page'>
            <div className="add-comment-section">
                <input
                    type="text"
                    value={newComment}
                    onChange={handleInputChange}
                    placeholder="Write a comment..."
                />
                <button className='post-comment-btn' onClick={handlePostComment}>Post</button>
            </div>
            <div className="comment-container">
                {comments.map((comment) => (
                    <div className="comment-box">
                        <div className="comment-header">
                            <img src={`${serverUrl}:${serverPort}/images/${comment.userId.image}`} alt="" className="profile-picture" />
                            <span className="author">{comment.userId.name}</span>
                            <span className="date">{currentDate}</span>
                        </div>
                        <div className="comment-text">{comment.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
