import React from 'react';
import Cookies from 'universal-cookie';



const HomePage = ()=>{
    const cookies = new Cookies();
    console.log(cookies.get('access_token'));
    fetch('http://localhost:8080/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `JWT ${cookies.get('access_token')}`
    }}).then((res)=> res.json()).then((data)=>{console.log(data);});
    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
}

export default HomePage;