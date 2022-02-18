import './HomePage.css';
import React from 'react'


function HomePage() {
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


    );
    
}


export default HomePage;