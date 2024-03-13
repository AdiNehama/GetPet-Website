// NavBar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/backroundImg.jpeg';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './navBar.css';

function NavigationBar() {
    const { pathname } = useLocation(); // Get the current location
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    // const [posts, setPosts] = useState([]); // State for posts
    // const [filteredResults, setFilteredResults] = useState([]); // State for filtered results
    const navigate = useNavigate(); // Get the navigate function from the useNavigate hook

    const shouldShowAboutBtn = pathname === '/';
    const shouldShowSignInBtn = pathname === '/';
    const shouldShowLogo = ['/home','/editprofile','/profile','/myposts', '/chat', '/upload','/signin', '/register'].includes(pathname) || ['/editpost'].includes(pathname.split('/').slice(0, -1).join('/'));
    const shouldShowBackBtn = ['/about', '/signin', '/register'].includes(pathname);
    const shouldShowNavigationLinks = ['/home','/editprofile', '/profile' ,'/myposts', '/chat', '/upload'].includes(pathname) || ['/editpost'].includes(pathname.split('/').slice(0, -1).join('/'));
    const shouldShowSearchForm = ['/home', '/editprofile' , '/profile', '/myposts', '/chat', '/upload'].includes(pathname) || ['/editpost'].includes(pathname.split('/').slice(0, -1).join('/'));
    const shouldShowSystemButtons = shouldShowAboutBtn || shouldShowSignInBtn;

    // useEffect(() => {
    //     // Fetch posts from MongoDB
    //     fetchPosts()
    //         .then(data => {
    //             setPosts(data); // Set posts in state
    //         })
    //         .catch(error => {
    //             console.error('Error fetching posts:', error);
    //         });
    // }, []);

    // useEffect(() => {
    //     // Filter posts based on search term
    //     const filtered = posts.filter(post =>
    //         post.kind.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setFilteredResults(filtered);
    // }, [searchTerm, posts]);

    // Function to handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle search form submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // TODO: Add search functionality here
        // Clear search term after submission if needed
        setSearchTerm('');
    };
    const handleLogOut = () => {
       window.localStorage.clear();
       const cookies = new Cookies();
       cookies.remove("access_token");
       window.location.reload(); 
       navigate('/');
       
    }

    return (
        <div className="nav-bar">
            {shouldShowLogo && (
                <div className="logo-container">
                    <img src={logoImg} alt="" className="logo" />
                    <h1 className="header-text">Get Pet</h1>
                </div>
            )}
            {shouldShowSearchForm && (
                <form className='search-form' onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by pet kind"
                    />
                    <IconButton className='search-icon' type="submit">
                    <SearchIcon />
                    </IconButton>
                </form>
            )}
            {shouldShowNavigationLinks &&
                (<div className="navigation-links-container">
                <IconButton component={Link} to="/home" className="nav-link white"><HomeIcon /></IconButton>
                <IconButton component={Link} to="/profile" className="nav-link white"><SentimentSatisfiedAltIcon /></IconButton>
                <IconButton component={Link} to="/chat" className="nav-link white"><ChatIcon /></IconButton>
                <IconButton component={Link} to="/upload" className="nav-link white"><AddCircleOutlineIcon /></IconButton>
                <IconButton component={Link} onClick={handleLogOut} className="nav-link white"><LogoutIcon  /></IconButton>
                    {shouldShowAboutBtn && (<Link to="/about" className="button">About</Link>)}
                </div>)}
            {shouldShowBackBtn && (
                <Link to="/" className="nav-link white back-btn">Go Back</Link>
            )}
            {shouldShowSystemButtons && (
                <ul className='system-buttons'>
                    <Link to="/about" className="button white">About</Link>
                    <Link to="/signin" className="button white">Sign In</Link>
                </ul>
            )}

            {/* {filteredResults.map(post => (
                            <div key={post._id}>
                                <p>{post.title}</p>
                                <p>{post.kind}</p>
                            </div>
                        ))} */}
        </div>
    );
}

export default NavigationBar;