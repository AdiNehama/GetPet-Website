import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = "422894887443-746rnu7vd6ldo6kkpjmorm0tebh1rt23.apps.googleusercontent.com";

const GoogleAuth = (props) => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
        {props.children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
