import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import MyPostCard from '../MyPostCard/MyPostsCard';
import { Container, Row, Col } from 'react-bootstrap'

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const uid = localStorage.getItem('user_id');

    useEffect(() => {
        const cookies = new Cookies();
        fetch(`http://localhost:8080/posts/${uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `JWT ${cookies.get('access_token')}`
            }
        }).then((res) => res.json())
            .then((data) => {
                setPosts(data);
            });
    }, []);

    return (
        <Container >
            <Row>
                {posts.map((post) => (
                    <Col className='my-post-card-col'>
                        <MyPostCard key={post._id} className='post-card'
                            image={post.image}
                            kind={post.kind}
                            birthDate={post.birthDate}
                            about={post.about}
                            phone={post.phone}
                            location={post.location}
                            ownerName={post.ownerName}
                            id={post._id}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MyPosts;