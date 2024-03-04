// AboutPage.js
import React, { useState } from 'react';
import './AboutPage.css';
import backgroundImage from '../../assets/images/aboutImg.jpeg';
// import PawIcon from '@material-ui/icons/Pets';

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="image-container">
                <img src={backgroundImage} alt="Background" className="background-image-about" />
            </div>
            <div className="content">
                <div className="glass-container-about">
                    <h2>Welcome to Get Pet!</h2>
                    <p>The global platform where hearts and homes unite with paws, dedicated to fostering a worldwide community of pet lovers committed to making a difference.</p>
                    <h2>Our Faith</h2>
                    <p>We believe that every pet deserves a loving family, regardless of their origin, and we are passionate about creating a world where all animals find their forever homes.</p>
                    <h2>Our Mission</h2>
                    <p>To connect pets in need with caring individuals everywhere.</p>
                    <h2>What Sets Us Apart?</h2>
                    <p>In addition to showcasing pets from around the world, we empower you to be a part of the solution by allowing every user to upload pets for adoption.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
