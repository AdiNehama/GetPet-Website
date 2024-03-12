import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import PostCard from '../PostCard/PostCard';
import { Container, Row, Col } from 'react-bootstrap';
import './HomePage.css';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const cookies = new Cookies();
        fetch('http://localhost:8080/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `JWT ${cookies.get('access_token')}`
            }
        }).then((res) => res.json())
            .then(async (data) => {
                const enrichedPosts = data.map(async (post) => {
                    const response = await fetch('https://api.api-ninjas.com/v1/dogs?name=' + post.kind, {
                        method: 'GET',
                        headers: {
                            'X-Api-Key': 'ZOvMfCF31DB429FOGzAuow==ZgSSSu0YbsEDDNYy',
                            'Content-Type': 'application/json'
                        },
                    }).then((res) => res.json());
                    return {
                        ...post,
                        goodWithChildren: response[0]?.good_with_children || 1,
                    }

                })
                setPosts(await Promise.all(enrichedPosts));
            });
    }, []);

    return (
        <Container >
            <Row>
                {posts.map((post) => (
                    <Col className='post-card-container'>
                        <PostCard key={'post' + post._id} className='post-card'
                            image={post.image}
                            kind={post.kind}
                            birthDate={post.birthDate}
                            about={post.about}
                            phone={post.phone}
                            location={post.location}
                            ownerName={post.ownerName}
                            goodWithChildren={post.goodWithChildren}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default HomePage;