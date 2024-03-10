import React from 'react';
import logoImage from '../../assets/images/getPetWebLogo.jpeg';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-page">
            <div className="content">
                <img src={logoImage} alt="landing page logo"/>
            </div>
        </div>
    );
}

export default LandingPage;
