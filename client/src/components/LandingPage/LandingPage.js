import React from 'react';
// import NavigationBar from '../NavBar/navBar'; // Import your NavigationBar component
import logoImage from '../../assets/images/getPetWebLogo.jpeg';
import './LandingPage.css';

function LandingPage() {
    console.log(logoImage);
    return (
        <div className="landing-page">
            <div className="content">
                <img src={logoImage} alt="landing page logo"/>
            </div>
        </div>
    );
}

export default LandingPage;
