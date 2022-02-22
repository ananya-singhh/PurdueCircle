import './HomePage.css';
import React from 'react'
import { Navigate } from 'react-router-dom';


function HomePage() {

    function logout() {
        sessionStorage.removeItem('user');
        window.location.reload(false);
    }

    console.log(sessionStorage.getItem('user'))
    if(!sessionStorage.getItem('user')) {
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
    } else return (
        <div id="background">
            <div id="homepage">
                <div id="title">PurdueCircle</div>
                successful sign in as {sessionStorage.getItem('user')}
                <div id ="logoutbutton">
                <button class="button" type="button" onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    )
    
}


export default HomePage;