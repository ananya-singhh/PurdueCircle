import './Profile.css';
import React from "react";

function Profile() {

     return (
      <div id="background">
        <div id="profilePage">
            <div id="userDisplay"></div>
            <div id="nameDisplay"></div>
            <div id="bioDisplay"></div>

            <div id ="editProfButton">
                <a href="/editProfile" class="button">Edit Profile</a>
            </div>
        </div>
      </div>
     );

 }

 export default Profile;
