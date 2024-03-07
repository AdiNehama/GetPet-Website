// NavBar.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/backroundImg.jpeg';
import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import './navBar.css';

function NavigationBar() {
    const { pathname } = useLocation(); // Get the current location
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    const shouldShowAboutBtn = pathname === '/';
    const shouldShowSignInBtn = pathname === '/';
    const shouldShowLogo = ['/home','/profile', '/chat', '/upload','/signin', '/register'].includes(pathname);
    const shouldShowBackBtn = ['/about', '/signin', '/register'].includes(pathname);
    const shouldShowNavigationLinks = ['/home', '/profile', '/chat', '/upload'].includes(pathname);
    const shouldShowSearchForm = ['/home', '/profile', '/chat', '/upload'].includes(pathname);
    const shouldShowSystemButtons = shouldShowAboutBtn || shouldShowSignInBtn;

    // Function to handle search term change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to handle search form submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Add search functionality here
        console.log('Search', searchTerm);
        // Clear search term after submission if needed
        setSearchTerm('');
    };

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
                        placeholder="Search"
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
                <IconButton component={Link} to="/messages" className="nav-link white"><MailIcon  /></IconButton>
                <IconButton component={Link} to="/add-post" className="nav-link white"><AddCircleOutlineIcon /></IconButton>
                <IconButton component={Link} to="/logout" className="nav-link white"><LogoutIcon  /></IconButton>
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
        </div>
    );
}

export default NavigationBar;
