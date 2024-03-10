import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import PostCard from '../PostCard/PostCard';
import { Container, Row, Col } from 'react-bootstrap'



const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();
        console.log(cookies.get('access_token'));
        fetch('http://localhost:8080/posts', {
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

    console.log(posts);

    return (
            <Container >
                <Row>
                    {posts.map((post) => (
                        <Col>
                            <PostCard key={'post' + post._id} className= 'post-card'
                                kind={post.kind}
                                birthDate={post.birthDate}
                                about={post.about}
                                phone={post.phone}
                                location={post.location}
                                ownerName={post.ownerName}
                                />
                        </Col>
                    ))}
                </Row>
            </Container>
    );
}

export default HomePage;