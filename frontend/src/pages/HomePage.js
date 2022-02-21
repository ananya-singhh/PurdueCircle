import './HomePage.css';
import React from 'react'


function HomePage() {

    function get_user_from_cookie() {
        return document.cookie
        .split('; ')
        .find(row => row.startsWith('user='))
        .split('=')[1];
      }
    console.log(get_user_from_cookie())
    if(get_user_from_cookie() === "") {
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
                successful sign in
            </div>
        </div>
    )
    
}


export default HomePage;