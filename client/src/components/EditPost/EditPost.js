import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom'




const EditPost = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname.split('/');
    const postId = path[path.length - 1];

   
}

export default EditPost;