import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import PostCard from '../PostCard/PostCard';
import { Container, Row, Col } from 'react-bootstrap';
import './HomePage.css';
import { Icon } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material'; // Importing the search icon

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]); // State to hold filtered posts
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

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

    useEffect(() => {
        // Filter posts based on searchTerm
        const filtered = posts.filter(post => post.kind.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredPosts(filtered);
    }, [searchTerm, posts]);

    // Function to handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Container >
            <Row>
                <Col>
                    <form className="search-container">
                        <div className=" search-wrapper">
                        <input
                            className="search-input"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search pet by kind"
                            />
                            <SearchIcon className="search-icon"/>
                        </div>
                    </form>
                </Col>
            </Row>
            <Row>
                {filteredPosts.map((post) => (
                    <Col key={'post' + post._id} className='post-card-container'>
                        <PostCard className='post-card'
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