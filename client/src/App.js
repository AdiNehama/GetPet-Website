import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import LandingPage from './components/LandingPage/LandingPage';
import AboutPage from './components/AboutPage/AboutPage';
import SignInPage from './components/SignInPage/SignInPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/navBar';
import MyPosts from './components/MyPosts/MyPosts';
import UploadPost from './components/UploadPostPage/UploadPostPage'
import EditPost from './components/EditPost/EditPost';
import ChatPage from './components/ChatPage/ChatPage';
import ProfilePage from './components/ProfilePage/ProfilePage'
import EditProfile from './components/EditProfile/EditProfile';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(!!(new Cookies().get('access_token')));

  return (
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage isUserLoggedIn={isUserLoggedIn} />} />
            <Route path="/about" element={<AboutPage />} />
            {!isUserLoggedIn && <Fragment>
              <Route path="/signin" element={<SignInPage setIsUserLoggedIn={setIsUserLoggedIn} />} />
              <Route path="/register" element={<RegisterPage />} />
            </Fragment>}
            {isUserLoggedIn && <Fragment>
              <Route path="/home" element={<HomePage />} />
              <Route path="/myposts" element={<MyPosts />} />
              <Route path="/upload" element={<UploadPost />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/editpost/:postId" element={<EditPost />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/editprofile" element={<EditProfile />} />
            </Fragment>}
            <Route path='*' element={<Navigate to="/" />} />
          </Routes>
          <ToastContainer/>
        </div>
      </Router>
  );
}

export default App;