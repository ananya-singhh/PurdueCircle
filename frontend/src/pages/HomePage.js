import './HomePage.css';
import React from 'react'
import { Navigate } from 'react-router-dom';


function HomePage() {

    function logout() {
        localStorage.removeItem('user');
        window.location.reload(false);
    }

    console.log(localStorage.getItem('user'))
    if(!localStorage.getItem('user')) {
        return (
        <div id="background">
            <div id="homepage">
                <div id="title">PurdueCircle</div>
                <div id ="loginbutton">
                    <a href="/Login" class="button">Login</a>
                </div>
                <div id ="signupbutton">
                    <a href="/SignUp" class="button">Sign Up</a>
                </div>
            </div>
        </div>
        )
    } else 
        var user = JSON.parse(localStorage.getItem('user'));
        return (
        <div id="background">
            <div id="homepage">
                <div id="title">PurdueCircle</div>
                successful sign in as {user['username']}
                <div id ="logoutbutton">
                <button class="button" type="button" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
    
}


export default HomePage;