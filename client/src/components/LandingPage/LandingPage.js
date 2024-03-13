import React, { useEffect } from 'react';
import logoImage from '../../assets/images/getPetWebLogo.jpeg';
import {  useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage(props) {
    const navigate = useNavigate();
    useEffect(() => {
        if (props.isUserLoggedIn) {
            navigate('/home');
        }
    }, [props.isUserLoggedIn, navigate]);

    return (
        <div className="landing-page">
            <div className="content">
                <img src={logoImage} alt="landing page logo" />
            </div>
        </div>
    );
}

export default LandingPage;
