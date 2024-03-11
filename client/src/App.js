import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import AboutPage from './components/AboutPage/AboutPage';
import SignInPage from './components/SignInPage/SignInPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/navBar';
import MyPosts from './components/MyPosts/MyPosts';
import EditPost from './components/EditPost/EditPost';
import ChatPage from './components/ChatPage/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GoogleAuth from './components/GoogleAuth/GoogleAuth';


function App() {

  return (
    <GoogleAuth>
      <Router>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/editpost/:postId" element={<EditPost />} />
          </Routes>
        </div>
      </Router>
    </GoogleAuth>
  );
}

export default App;
